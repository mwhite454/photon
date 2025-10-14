#!/usr/bin/env python3
"""
ES6+ Syntax Modernizer

Identifies pre-ES6 patterns in JavaScript code blocks and converts them to modern ES6+ syntax.
Supports: var → const/let, function → arrow functions, string concatenation → template literals.

Usage:
    python es6_modernizer.py <docs_directory> [--dry-run] [--output <report_file>]
"""

import os
import re
import json
import argparse
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from datetime import datetime


class ES6Modernizer:
    """Modernize JavaScript code to ES6+ syntax"""
    
    def __init__(self, docs_dir: str, dry_run: bool = False):
        self.docs_dir = Path(docs_dir)
        self.dry_run = dry_run
        self.file_count = 0
        self.total_modernizations = 0
    
    def extract_code_blocks(self, content: str) -> List[Dict]:
        """Extract JavaScript code blocks from markdown"""
        # Pattern to match fenced code blocks with language
        pattern = r'```(javascript|js)\n(.*?)```'
        matches = re.finditer(pattern, content, re.DOTALL)
        
        blocks = []
        for match in matches:
            blocks.append({
                'language': match.group(1),
                'code': match.group(2),
                'start': match.start(),
                'end': match.end(),
                'full_match': match.group(0)
            })
        
        return blocks
    
    def modernize_var_declarations(self, code: str) -> Tuple[str, List[Dict]]:
        """Convert var declarations to const/let"""
        changes = []
        
        # Pattern: var identifier = value (use const if not reassigned)
        # For simplicity, we'll convert all var to const
        # A more sophisticated version would analyze reassignment
        pattern = r'\bvar\s+(\w+)\s*='
        
        def replace_var(match):
            var_name = match.group(1)
            changes.append({
                'type': 'var_to_const',
                'original': match.group(0),
                'replacement': f'const {var_name} =',
                'variable': var_name
            })
            return f'const {var_name} ='
        
        modernized = re.sub(pattern, replace_var, code)
        return modernized, changes
    
    def modernize_functions(self, code: str) -> Tuple[str, List[Dict]]:
        """Convert function expressions to arrow functions"""
        changes = []
        
        # Pattern: function(params) { body }
        # Convert to: (params) => { body }
        # Simple pattern - doesn't handle all edge cases
        pattern = r'function\s*\(([^)]*)\)\s*\{([^}]*)\}'
        
        def replace_function(match):
            params = match.group(1)
            body = match.group(2).strip()
            
            # Check if it's a single return statement
            single_return = re.match(r'^\s*return\s+(.+?);\s*$', body)
            if single_return:
                # Convert to concise arrow function
                replacement = f'({params}) => {single_return.group(1)}'
            else:
                # Convert to block arrow function
                replacement = f'({params}) => {{{match.group(2)}}}'
            
            changes.append({
                'type': 'function_to_arrow',
                'original': match.group(0),
                'replacement': replacement
            })
            return replacement
        
        modernized = re.sub(pattern, replace_function, code)
        return modernized, changes
    
    def modernize_string_concatenation(self, code: str) -> Tuple[str, List[Dict]]:
        """Convert string concatenation to template literals"""
        changes = []
        
        # Pattern: "string" + variable + "string"
        # This is complex - we'll handle simple cases
        # Pattern: string literal + expression + string literal
        pattern = r'(["\'])([^"\']*)\1\s*\+\s*(\w+)(?:\s*\+\s*(["\'])([^"\']*)\4)?'
        
        def replace_concat(match):
            str1 = match.group(2)
            var1 = match.group(3)
            str2 = match.group(5) if match.group(5) else ''
            
            if str2:
                replacement = f'`{str1}${{{var1}}}{str2}`'
            else:
                replacement = f'`{str1}${{{var1}}}`'
            
            changes.append({
                'type': 'concat_to_template',
                'original': match.group(0),
                'replacement': replacement
            })
            return replacement
        
        modernized = re.sub(pattern, replace_concat, code)
        return modernized, changes
    
    def modernize_code_block(self, code: str) -> Tuple[str, List[Dict]]:
        """Apply all modernizations to a code block"""
        all_changes = []
        
        # Apply var → const
        code, var_changes = self.modernize_var_declarations(code)
        all_changes.extend(var_changes)
        
        # Apply function → arrow
        code, func_changes = self.modernize_functions(code)
        all_changes.extend(func_changes)
        
        # Apply concatenation → template literals
        code, concat_changes = self.modernize_string_concatenation(code)
        all_changes.extend(concat_changes)
        
        return code, all_changes
    
    def process_file(self, file_path: Path) -> Dict:
        """Process a single markdown file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            code_blocks = self.extract_code_blocks(content)
            
            if not code_blocks:
                return {
                    'file': str(file_path.relative_to(self.docs_dir)),
                    'status': 'no_js_code',
                    'modernizations': 0,
                    'changes': []
                }
            
            file_changes = []
            
            # Process code blocks in reverse order to preserve positions
            for block in reversed(code_blocks):
                modernized_code, changes = self.modernize_code_block(block['code'])
                
                if changes:
                    # Replace code block in content
                    new_block = f"```{block['language']}\n{modernized_code}```"
                    content = content[:block['start']] + new_block + content[block['end']:]
                    
                    file_changes.extend(changes)
            
            # Write changes if not dry-run
            if content != original_content:
                if not self.dry_run:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                
                self.file_count += 1
                self.total_modernizations += len(file_changes)
                
                return {
                    'file': str(file_path.relative_to(self.docs_dir)),
                    'status': 'dry-run' if self.dry_run else 'modernized',
                    'code_blocks': len(code_blocks),
                    'modernizations': len(file_changes),
                    'changes': file_changes
                }
            
            return {
                'file': str(file_path.relative_to(self.docs_dir)),
                'status': 'no_changes',
                'code_blocks': len(code_blocks),
                'modernizations': 0,
                'changes': []
            }
        
        except Exception as e:
            return {
                'file': str(file_path.relative_to(self.docs_dir)),
                'status': 'error',
                'error': str(e),
                'modernizations': 0,
                'changes': []
            }
    
    def scan_directory(self) -> List[Path]:
        """Recursively find all markdown files"""
        md_files = []
        for root, dirs, files in os.walk(self.docs_dir):
            for file in files:
                if file.endswith('.md'):
                    md_files.append(Path(root) / file)
        return md_files
    
    def modernize(self) -> Dict:
        """Run modernization on all files"""
        print(f"{'[DRY RUN] ' if self.dry_run else ''}Scanning {self.docs_dir} for JavaScript code...")
        
        md_files = self.scan_directory()
        print(f"Found {len(md_files)} markdown files")
        
        results = {
            'timestamp': datetime.now().isoformat(),
            'docs_directory': str(self.docs_dir),
            'dry_run': self.dry_run,
            'total_files_scanned': len(md_files),
            'files_modernized': 0,
            'total_modernizations': 0,
            'files': []
        }
        
        for file_path in md_files:
            result = self.process_file(file_path)
            results['files'].append(result)
            
            if result['status'] in ['modernized', 'dry-run']:
                print(f"  {'[DRY RUN] ' if self.dry_run else ''}✓ {result['file']}: {result['modernizations']} modernizations")
        
        results['files_modernized'] = self.file_count
        results['total_modernizations'] = self.total_modernizations
        
        return results
    
    def generate_report(self, output_file: str = 'es6-modernization-report.json'):
        """Generate modernization report"""
        results = self.modernize()
        
        # Write report
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2)
        
        print(f"\n{'='*60}")
        print(f"ES6+ Modernization {'Dry Run ' if self.dry_run else ''}Complete")
        print(f"{'='*60}")
        print(f"Files scanned: {results['total_files_scanned']}")
        print(f"Files modernized: {results['files_modernized']}")
        print(f"Total modernizations: {results['total_modernizations']}")
        print(f"Report saved to: {output_file}")
        
        # Print summary by change type
        change_types = {}
        for file_result in results['files']:
            for change in file_result.get('changes', []):
                change_type = change['type']
                change_types[change_type] = change_types.get(change_type, 0) + 1
        
        if change_types:
            print(f"\nModernizations by type:")
            for change_type, count in sorted(change_types.items()):
                print(f"  {change_type}: {count}")
        
        return results


def main():
    parser = argparse.ArgumentParser(
        description='Modernize JavaScript code to ES6+ syntax in markdown files'
    )
    parser.add_argument(
        'docs_dir',
        help='Directory containing markdown files to modernize'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview changes without modifying files'
    )
    parser.add_argument(
        '--output',
        default='es6-modernization-report.json',
        help='Output file for modernization report'
    )
    
    args = parser.parse_args()
    
    if not os.path.exists(args.docs_dir):
        print(f"Error: Directory not found: {args.docs_dir}")
        return 1
    
    modernizer = ES6Modernizer(args.docs_dir, dry_run=args.dry_run)
    modernizer.generate_report(args.output)
    
    return 0


if __name__ == '__main__':
    exit(main())
