#!/usr/bin/env python3
"""
Example Validator - Extract and execute code examples from markdown

Validates that all code examples in documentation execute without errors.

Usage:
    python example_validator.py <docs_directory> [--output <report_file>]
"""

import os
import re
import json
import subprocess
import tempfile
from pathlib import Path
from typing import Dict, List
from datetime import datetime


class ExampleValidator:
    def __init__(self, docs_dir: str):
        self.docs_dir = Path(docs_dir)
        self.passed = 0
        self.failed = 0
    
    def extract_code_blocks(self, content: str) -> List[str]:
        """Extract JavaScript code blocks"""
        pattern = r'```(?:javascript|js)\n(.*?)```'
        return re.findall(pattern, content, re.DOTALL)
    
    def validate_code(self, code: str) -> Dict:
        """Execute code in Node.js"""
        try:
            # Create temp file in project directory to access node_modules
            temp_dir = Path.cwd() / '.temp_validation'
            temp_dir.mkdir(exist_ok=True)
            
            temp_file = temp_dir / f'test_{os.getpid()}.mjs'
            temp_file.write_text(code)
            
            result = subprocess.run(
                ['node', str(temp_file)],
                capture_output=True,
                text=True,
                timeout=5,
                cwd=Path.cwd()
            )
            
            temp_file.unlink()
            
            if result.returncode == 0:
                self.passed += 1
                return {'status': 'pass', 'output': result.stdout}
            else:
                self.failed += 1
                return {'status': 'fail', 'error': result.stderr}
        
        except subprocess.TimeoutExpired:
            self.failed += 1
            return {'status': 'fail', 'error': 'Execution timeout'}
        except Exception as e:
            self.failed += 1
            return {'status': 'fail', 'error': str(e)}
    
    def process_file(self, file_path: Path) -> Dict:
        """Process markdown file"""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        blocks = self.extract_code_blocks(content)
        results = []
        
        for i, code in enumerate(blocks):
            result = self.validate_code(code)
            results.append({
                'block_number': i + 1,
                'code_preview': code[:100] + '...' if len(code) > 100 else code,
                **result
            })
        
        return {
            'file': str(file_path.relative_to(self.docs_dir)),
            'total_blocks': len(blocks),
            'results': results
        }
    
    def validate_all(self) -> Dict:
        """Validate all files"""
        md_files = list(self.docs_dir.rglob('*.md'))
        results = {
            'timestamp': datetime.now().isoformat(),
            'total_files': len(md_files),
            'passed': 0,
            'failed': 0,
            'files': []
        }
        
        try:
            for file_path in md_files:
                file_result = self.process_file(file_path)
                results['files'].append(file_result)
                print(f"✓ {file_result['file']}: {file_result['total_blocks']} blocks")
            
            results['passed'] = self.passed
            results['failed'] = self.failed
        finally:
            # Clean up temp directory
            temp_dir = Path.cwd() / '.temp_validation'
            if temp_dir.exists():
                import shutil
                shutil.rmtree(temp_dir)
        
        return results


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('docs_dir', help='Documentation directory')
    parser.add_argument('--output', default='validation-examples.json')
    args = parser.parse_args()
    
    validator = ExampleValidator(args.docs_dir)
    results = validator.validate_all()
    
    with open(args.output, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\nValidation complete: {results['passed']} passed, {results['failed']} failed")
    print(f"Report: {args.output}")


if __name__ == '__main__':
    main()
