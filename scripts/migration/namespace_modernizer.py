#!/usr/bin/env python3
"""
Namespace Modernization Script: Convert makerjs namespace to named imports

Converts:
  import * as makerjs from 'photon/core';
  const rect = new makerjs.models.Rectangle(100, 50);
  
To:
  import { models } from 'photon/core';
  const rect = new models.Rectangle(100, 50);

Also fixes var declarations to const/let.

Usage:
    python namespace_modernizer.py <docs_directory> [--dry-run] [--output <report_file>]
"""

import os
import re
import json
import argparse
from pathlib import Path
from typing import Dict, List, Set, Tuple
from datetime import datetime
from collections import defaultdict


class NamespaceModernizer:
    """Convert makerjs namespace imports to ES6 named imports"""
    
    # Common photon/core namespaces
    KNOWN_NAMESPACES = {
        'models', 'paths', 'model', 'path', 'exporter', 'importer',
        'layout', 'chain', 'angle', 'point', 'measure', 'units',
        'kit', 'simplify', 'combine', 'break', 'solvers'
    }
    
    # Root-level methods that can be imported directly
    ROOT_METHODS = {
        'cloneObject', 'travel', 'createRouteKey', 'extendObject',
        'isModel', 'isPath', 'isPathArc', 'isPathCircle', 'isPathLine'
    }
    
    def __init__(self, docs_dir: str, dry_run: bool = False):
        self.docs_dir = Path(docs_dir)
        self.dry_run = dry_run
        self.changes = []
        self.file_count = 0
        self.total_replacements = 0
    
    def scan_directory(self) -> List[Path]:
        """Recursively find all markdown files"""
        md_files = []
        for root, dirs, files in os.walk(self.docs_dir):
            # Skip node_modules and other non-documentation directories
            if 'node_modules' in root or 'demos' in root:
                continue
            for file in files:
                if file.endswith('.md'):
                    md_files.append(Path(root) / file)
        return md_files
    
    def detect_used_namespaces(self, content: str) -> Tuple[Set[str], Set[str]]:
        """Detect which photon/core namespaces and root methods are used in the file
        
        Returns:
            Tuple of (used_namespaces, used_root_methods)
        """
        used_namespaces = set()
        used_root_methods = set()
        
        # Look for makerjs.namespace.method patterns
        namespace_pattern = r'makerjs\.(\w+)\.'
        namespace_matches = re.findall(namespace_pattern, content)
        
        for match in namespace_matches:
            if match in self.KNOWN_NAMESPACES:
                used_namespaces.add(match)
        
        # Check for root method usage like makerjs.cloneObject()
        for method in self.ROOT_METHODS:
            method_pattern = rf'\bmakerjs\.{method}\b'
            if re.search(method_pattern, content):
                used_root_methods.add(method)
        
        return used_namespaces, used_root_methods
    
    def convert_var_to_const(self, content: str) -> Tuple[str, List[Dict]]:
        """Convert var declarations to const (or let if reassigned)"""
        changes = []
        
        # Pattern: var followed by identifier at start of line (in code blocks)
        pattern = r'^(\s*)(var)(\s+\w+\s*=)'
        
        def replace_var(match):
            indent = match.group(1)
            keyword = match.group(2)
            rest = match.group(3)
            
            # Record the change
            changes.append({
                'type': 'var_to_const',
                'original': f'{indent}{keyword}{rest}',
                'replacement': f'{indent}const{rest}'
            })
            
            return f'{indent}const{rest}'
        
        new_content = re.sub(pattern, replace_var, content, flags=re.MULTILINE)
        return new_content, changes
    
    def modernize_file(self, file_path: Path) -> Dict:
        """Modernize a single markdown file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            content = original_content
            file_changes = []
            
            # Step 1: Detect used namespaces and root methods
            used_namespaces, used_root_methods = self.detect_used_namespaces(content)
            
            if not used_namespaces and not used_root_methods:
                return {
                    'file': str(file_path.relative_to(self.docs_dir)),
                    'status': 'no_changes',
                    'changes_count': 0,
                    'changes': []
                }
            
            # Step 2: Convert import statement
            import_pattern = r"import \* as makerjs from ['\"]photon/core['\"];"
            
            if re.search(import_pattern, content):
                # Generate named import statement - combine namespaces and root methods
                all_imports = sorted(list(used_namespaces) + list(used_root_methods))
                new_import = f"import {{ {', '.join(all_imports)} }} from 'photon/core';"
                
                old_import = re.search(import_pattern, content).group(0)
                file_changes.append({
                    'type': 'namespace_to_named_import',
                    'original': old_import,
                    'replacement': new_import,
                    'namespaces': list(used_namespaces),
                    'root_methods': list(used_root_methods)
                })
                content = re.sub(import_pattern, new_import, content)
                
                # Step 3: Replace makerjs.namespace. with namespace.
                for namespace in used_namespaces:
                    old_pattern = f'makerjs.{namespace}.'
                    new_pattern = f'{namespace}.'
                    
                    # Count occurrences
                    occurrences = content.count(old_pattern)
                    if occurrences > 0:
                        file_changes.append({
                            'type': 'namespace_reference',
                            'namespace': namespace,
                            'occurrences': occurrences,
                            'original': old_pattern,
                            'replacement': new_pattern
                        })
                        content = content.replace(old_pattern, new_pattern)
                
                # Step 4: Replace makerjs.rootMethod with rootMethod
                for method in used_root_methods:
                    old_pattern = f'makerjs.{method}'
                    new_pattern = method
                    
                    # Count occurrences (use word boundary to avoid partial matches)
                    occurrences = len(re.findall(rf'\bmakerjs\.{method}\b', content))
                    if occurrences > 0:
                        file_changes.append({
                            'type': 'root_method_reference',
                            'method': method,
                            'occurrences': occurrences,
                            'original': old_pattern,
                            'replacement': new_pattern
                        })
                        content = re.sub(rf'\bmakerjs\.{method}\b', method, content)
            
            # Step 4: Convert var to const
            content, var_changes = self.convert_var_to_const(content)
            file_changes.extend(var_changes)
            
            # Only write if changes were made and not in dry-run mode
            if content != original_content:
                if not self.dry_run:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                
                self.file_count += 1
                self.total_replacements += len(file_changes)
                
                return {
                    'file': str(file_path.relative_to(self.docs_dir)),
                    'status': 'modified',
                    'changes_count': len(file_changes),
                    'changes': file_changes
                }
            else:
                return {
                    'file': str(file_path.relative_to(self.docs_dir)),
                    'status': 'no_changes',
                    'changes_count': 0,
                    'changes': []
                }
        
        except Exception as e:
            return {
                'file': str(file_path.relative_to(self.docs_dir)),
                'status': 'error',
                'error': str(e),
                'changes_count': 0,
                'changes': []
            }
    
    def run(self) -> Dict:
        """Run the modernization process"""
        print(f"Scanning {self.docs_dir} for markdown files...")
        md_files = self.scan_directory()
        print(f"Found {len(md_files)} markdown files")
        
        if self.dry_run:
            print("DRY RUN MODE - No files will be modified")
        
        print("\nProcessing files...")
        for file_path in md_files:
            result = self.modernize_file(file_path)
            self.changes.append(result)
            
            if result['status'] == 'modified':
                print(f"  ✓ {result['file']} ({result['changes_count']} changes)")
            elif result['status'] == 'error':
                print(f"  ✗ {result['file']} - ERROR: {result['error']}")
        
        # Generate report
        report = {
            'timestamp': datetime.now().isoformat(),
            'docs_directory': str(self.docs_dir),
            'dry_run': self.dry_run,
            'total_files_scanned': len(md_files),
            'files_modified': self.file_count,
            'total_replacements': self.total_replacements,
            'files': self.changes
        }
        
        print(f"\n{'='*60}")
        print(f"Modernization {'simulation' if self.dry_run else 'complete'}!")
        print(f"Files scanned: {len(md_files)}")
        print(f"Files modified: {self.file_count}")
        print(f"Total changes: {self.total_replacements}")
        print(f"{'='*60}\n")
        
        return report


def main():
    parser = argparse.ArgumentParser(
        description='Modernize photon/core namespace imports to ES6 named imports'
    )
    parser.add_argument(
        'docs_dir',
        help='Documentation directory to process (e.g., docs-new/docs)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview changes without modifying files'
    )
    parser.add_argument(
        '--output',
        default='namespace-modernization-report.json',
        help='Output report file (default: namespace-modernization-report.json)'
    )
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.docs_dir):
        print(f"Error: Directory not found: {args.docs_dir}")
        return 1
    
    modernizer = NamespaceModernizer(args.docs_dir, args.dry_run)
    report = modernizer.run()
    
    # Save report
    with open(args.output, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)
    
    print(f"Report saved to: {args.output}")
    
    return 0


if __name__ == '__main__':
    exit(main())
