#!/usr/bin/env python3
"""
Code Refactoring Script: maker.js → photon/core

Scans markdown files for maker.js references and replaces them with photon/core equivalents.
Outputs refactoring-report.json with details of all changes made.

Usage:
    python code_refactor.py <docs_directory> [--dry-run] [--output <report_file>]
"""

import os
import re
import json
import argparse
from pathlib import Path
from typing import Dict, List, Tuple
from datetime import datetime


class CodeRefactor:
    """Refactor maker.js references to photon/core"""
    
    def __init__(self, docs_dir: str, dry_run: bool = False):
        self.docs_dir = Path(docs_dir)
        self.dry_run = dry_run
        self.changes = []
        self.file_count = 0
        self.total_replacements = 0
        
        # Define replacement patterns
        self.patterns = [
            # CommonJS require → ES6 import (full namespace)
            (r'var\s+makerjs\s*=\s*require\([\'"]makerjs[\'"]\);?', 
             "import * as makerjs from 'photon/core';",
             "require_to_import_full"),
            
            # CommonJS require → ES6 import (for consistency)
            (r'const\s+makerjs\s*=\s*require\([\'"]makerjs[\'"]\);?',
             "import * as makerjs from 'photon/core';",
             "require_to_import_const"),
            
            # Global makerjs references in comments (documentation)
            (r'//\s*maker\.js', 
             '// photon/core',
             "comment_makerjs"),
            
            # URL references
            (r'http://maker\.js\.org', 
             'https://unpkg.com/photon/core',
             "url_cdn"),
            
            # Script src references
            (r'src="http://maker\.js\.org/target/js/browser\.maker\.js"',
             'type="module" src="https://unpkg.com/photon/core"',
             "script_src"),
            
            # Package name in documentation
            (r'\bmaker\.js\b(?![/"])',  # Not followed by / or "
             'photon/core',
             "package_name"),
        ]
    
    def scan_directory(self) -> List[Path]:
        """Recursively find all markdown files"""
        md_files = []
        for root, dirs, files in os.walk(self.docs_dir):
            for file in files:
                if file.endswith('.md'):
                    md_files.append(Path(root) / file)
        return md_files
    
    def process_file(self, file_path: Path) -> Dict:
        """Process a single markdown file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            file_changes = []
            
            # Apply all replacement patterns
            for pattern, replacement, change_type in self.patterns:
                matches = list(re.finditer(pattern, content))
                if matches:
                    for match in matches:
                        file_changes.append({
                            'type': change_type,
                            'line': content[:match.start()].count('\n') + 1,
                            'original': match.group(0),
                            'replacement': replacement,
                            'pattern': pattern
                        })
                    content = re.sub(pattern, replacement, content)
            
            # Only write if changes were made and not in dry-run mode
            if content != original_content:
                if not self.dry_run:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                
                self.file_count += 1
                self.total_replacements += len(file_changes)
                
                return {
                    'file': str(file_path.relative_to(self.docs_dir)),
                    'status': 'dry-run' if self.dry_run else 'modified',
                    'changes_count': len(file_changes),
                    'changes': file_changes
                }
            
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
    
    def refactor(self) -> Dict:
        """Run refactoring on all files"""
        print(f"{'[DRY RUN] ' if self.dry_run else ''}Scanning {self.docs_dir}...")
        
        md_files = self.scan_directory()
        print(f"Found {len(md_files)} markdown files")
        
        results = {
            'timestamp': datetime.now().isoformat(),
            'docs_directory': str(self.docs_dir),
            'dry_run': self.dry_run,
            'total_files_scanned': len(md_files),
            'files_modified': 0,
            'total_replacements': 0,
            'files': []
        }
        
        for file_path in md_files:
            result = self.process_file(file_path)
            results['files'].append(result)
            
            if result['status'] in ['modified', 'dry-run']:
                print(f"  {'[DRY RUN] ' if self.dry_run else ''}✓ {result['file']}: {result['changes_count']} changes")
        
        results['files_modified'] = self.file_count
        results['total_replacements'] = self.total_replacements
        
        return results
    
    def generate_report(self, output_file: str = 'refactoring-report.json'):
        """Generate refactoring report"""
        results = self.refactor()
        
        # Write report
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2)
        
        print(f"\n{'='*60}")
        print(f"Refactoring {'Dry Run ' if self.dry_run else ''}Complete")
        print(f"{'='*60}")
        print(f"Files scanned: {results['total_files_scanned']}")
        print(f"Files modified: {results['files_modified']}")
        print(f"Total replacements: {results['total_replacements']}")
        print(f"Report saved to: {output_file}")
        
        # Print summary by change type
        change_types = {}
        for file_result in results['files']:
            for change in file_result['changes']:
                change_type = change['type']
                change_types[change_type] = change_types.get(change_type, 0) + 1
        
        if change_types:
            print(f"\nChanges by type:")
            for change_type, count in sorted(change_types.items()):
                print(f"  {change_type}: {count}")
        
        return results


def main():
    parser = argparse.ArgumentParser(
        description='Refactor maker.js references to photon/core in markdown files'
    )
    parser.add_argument(
        'docs_dir',
        help='Directory containing markdown files to refactor'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview changes without modifying files'
    )
    parser.add_argument(
        '--output',
        default='refactoring-report.json',
        help='Output file for refactoring report (default: refactoring-report.json)'
    )
    
    args = parser.parse_args()
    
    if not os.path.exists(args.docs_dir):
        print(f"Error: Directory not found: {args.docs_dir}")
        return 1
    
    refactor = CodeRefactor(args.docs_dir, dry_run=args.dry_run)
    refactor.generate_report(args.output)
    
    return 0


if __name__ == '__main__':
    exit(main())
