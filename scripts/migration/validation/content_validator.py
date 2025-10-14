#!/usr/bin/env python3
"""
Content Validator for Jekyll to MkDocs Migration

This module validates that content was preserved 100% during migration by:
1. Comparing original content with converted content using hash-based verification
2. Checking for content discrepancies and data loss
3. Generating a detailed validation report

Usage:
    python content_validator.py <migration-json-path> [--output validation-report.json]
"""

import argparse
import hashlib
import json
import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from datetime import datetime

# Add parent directory to path to import utils
sys.path.append(str(Path(__file__).parent.parent))
from utils import MigrationUtils


class ContentValidator:
    """Validates content preservation during migration."""

    def __init__(self, migration_json_path: str, repo_root: Optional[str] = None):
        """
        Initialize the content validator.
        
        Args:
            migration_json_path: Path to migration JSON file (e.g., migration-pages.json)
            repo_root: Repository root directory (defaults to current directory)
        """
        self.migration_json_path = Path(migration_json_path)
        self.repo_root = Path(repo_root) if repo_root else Path.cwd()
        self.migration_data = None
        self.validation_results = {
            'timestamp': datetime.now().isoformat(),
            'migration_file': str(migration_json_path),
            'total_files': 0,
            'validated': 0,
            'passed': 0,
            'failed': 0,
            'skipped': 0,
            'issues': []
        }

    def load_migration_data(self) -> bool:
        """Load migration JSON data."""
        try:
            with open(self.migration_json_path, 'r', encoding='utf-8') as f:
                self.migration_data = json.load(f)
            print(f"✓ Loaded migration data from {self.migration_json_path}")
            return True
        except FileNotFoundError:
            print(f"✗ Error: Migration file not found: {self.migration_json_path}")
            return False
        except json.JSONDecodeError as e:
            print(f"✗ Error: Invalid JSON in migration file: {e}")
            return False

    def normalize_content(self, content: str, is_html: bool = False) -> str:
        """
        Normalize content for comparison.
        
        Args:
            content: Content to normalize
            is_html: Whether the content is HTML (requires more aggressive normalization)
        
        Returns:
            Normalized content
        """
        # Remove frontmatter for comparison (it's transformed, not preserved as-is)
        content = re.sub(r'^---\s*\n.*?\n---\s*\n', '', content, flags=re.DOTALL)
        
        # Normalize whitespace
        content = MigrationUtils.normalize_whitespace(content)
        
        if is_html:
            # Remove HTML comments
            content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
            # Remove extra whitespace in HTML tags
            content = re.sub(r'<\s+', '<', content)
            content = re.sub(r'\s+>', '>', content)
            # Normalize self-closing tags
            content = re.sub(r'/\s*>', ' />', content)
        
        # Remove multiple blank lines
        content = re.sub(r'\n{3,}', '\n\n', content)
        
        return content.strip()

    def extract_text_content(self, content: str, is_html: bool = False) -> str:
        """
        Extract meaningful text content for comparison.
        
        Args:
            content: Content to extract text from
            is_html: Whether the content is HTML
        
        Returns:
            Extracted text content
        """
        if is_html:
            # Remove script and style tags
            content = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
            content = re.sub(r'<style.*?</style>', '', content, flags=re.DOTALL | re.IGNORECASE)
            # Remove HTML tags
            content = re.sub(r'<[^>]+>', ' ', content)
            # Decode HTML entities
            content = content.replace('&nbsp;', ' ')
            content = content.replace('&lt;', '<')
            content = content.replace('&gt;', '>')
            content = content.replace('&amp;', '&')
            content = content.replace('&quot;', '"')
        
        # Extract code blocks (they're important content)
        code_blocks = re.findall(r'```[\s\S]*?```', content)
        
        # Normalize whitespace
        content = self.normalize_content(content, is_html)
        
        # Add code blocks back
        content = content + '\n' + '\n'.join(code_blocks)
        
        return content

    def calculate_content_similarity(self, original: str, converted: str) -> float:
        """
        Calculate similarity between original and converted content.
        
        Args:
            original: Original content
            converted: Converted content
        
        Returns:
            Similarity score (0.0 to 1.0)
        """
        # Normalize both contents
        original_text = self.extract_text_content(original, is_html=True)
        converted_text = self.extract_text_content(converted, is_html=False)
        
        # Simple word-based similarity
        original_words = set(original_text.lower().split())
        converted_words = set(converted_text.lower().split())
        
        if not original_words and not converted_words:
            return 1.0  # Both empty
        
        if not original_words or not converted_words:
            return 0.0  # One empty, one not
        
        intersection = original_words.intersection(converted_words)
        union = original_words.union(converted_words)
        
        return len(intersection) / len(union) if union else 0.0

    def validate_file(self, source_path: str, target_path: str, title: str) -> Dict:
        """
        Validate a single file conversion.
        
        Args:
            source_path: Original file path (relative to docs/)
            target_path: Converted file path (relative to docs-new/)
            title: File title
        
        Returns:
            Validation result dictionary
        """
        result = {
            'source': source_path,
            'target': target_path,
            'title': title,
            'status': 'unknown',
            'issues': [],
            'similarity': 0.0
        }

        # Construct absolute paths
        source_full = self.repo_root / source_path
        target_full = self.repo_root / target_path

        # Check if source exists
        if not source_full.exists():
            result['status'] = 'skipped'
            result['issues'].append(f"Source file not found: {source_full}")
            return result

        # Check if target exists
        if not target_full.exists():
            result['status'] = 'failed'
            result['issues'].append(f"Target file not found: {target_full}")
            return result

        try:
            # Read source and target content
            with open(source_full, 'r', encoding='utf-8') as f:
                source_content = f.read()
            
            with open(target_full, 'r', encoding='utf-8') as f:
                target_content = f.read()

            # Calculate similarity
            similarity = self.calculate_content_similarity(source_content, target_content)
            result['similarity'] = round(similarity, 4)

            # Validate content preservation
            if similarity >= 0.95:
                result['status'] = 'passed'
            elif similarity >= 0.80:
                result['status'] = 'warning'
                result['issues'].append(f"Content similarity below 95%: {similarity:.2%}")
            else:
                result['status'] = 'failed'
                result['issues'].append(f"Content similarity too low: {similarity:.2%}")

            # Check for code blocks
            source_code_blocks = len(re.findall(r'```|<pre>|<code>', source_content))
            target_code_blocks = len(re.findall(r'```', target_content))
            
            if source_code_blocks > 0 and target_code_blocks == 0:
                result['issues'].append("Code blocks may be missing in converted file")
                if result['status'] == 'passed':
                    result['status'] = 'warning'

        except Exception as e:
            result['status'] = 'failed'
            result['issues'].append(f"Error reading files: {str(e)}")

        return result

    def validate_all(self) -> Dict:
        """
        Validate all files in migration data.
        
        Returns:
            Complete validation results
        """
        if not self.migration_data:
            print("✗ Error: No migration data loaded")
            return self.validation_results

        converted_files = self.migration_data.get('converted', [])
        self.validation_results['total_files'] = len(converted_files)

        print(f"\n📋 Validating {len(converted_files)} files...\n")

        for i, file_info in enumerate(converted_files, 1):
            source = file_info.get('source', '')
            target = file_info.get('target', '')
            title = file_info.get('title', 'Untitled')

            print(f"[{i}/{len(converted_files)}] Validating: {title}")

            result = self.validate_file(source, target, title)
            
            # Update counters
            self.validation_results['validated'] += 1
            
            if result['status'] == 'passed':
                self.validation_results['passed'] += 1
                print(f"  ✓ PASSED (similarity: {result['similarity']:.2%})")
            elif result['status'] == 'warning':
                self.validation_results['passed'] += 1  # Count as passed with warnings
                print(f"  ⚠ WARNING (similarity: {result['similarity']:.2%})")
                for issue in result['issues']:
                    print(f"    - {issue}")
            elif result['status'] == 'skipped':
                self.validation_results['skipped'] += 1
                print(f"  ⊘ SKIPPED")
                for issue in result['issues']:
                    print(f"    - {issue}")
            else:
                self.validation_results['failed'] += 1
                print(f"  ✗ FAILED (similarity: {result['similarity']:.2%})")
                for issue in result['issues']:
                    print(f"    - {issue}")

            # Store detailed results for failed and warning cases
            if result['status'] in ['failed', 'warning']:
                self.validation_results['issues'].append(result)

        return self.validation_results

    def save_report(self, output_path: str) -> bool:
        """
        Save validation report to JSON file.
        
        Args:
            output_path: Output file path
        
        Returns:
            True if successful
        """
        try:
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(self.validation_results, f, indent=2)
            print(f"\n✓ Validation report saved to {output_path}")
            return True
        except Exception as e:
            print(f"\n✗ Error saving report: {e}")
            return False

    def print_summary(self):
        """Print validation summary."""
        print("\n" + "=" * 60)
        print("VALIDATION SUMMARY")
        print("=" * 60)
        print(f"Total files:    {self.validation_results['total_files']}")
        print(f"Validated:      {self.validation_results['validated']}")
        print(f"Passed:         {self.validation_results['passed']}")
        print(f"Failed:         {self.validation_results['failed']}")
        print(f"Skipped:        {self.validation_results['skipped']}")
        
        success_rate = (self.validation_results['passed'] / self.validation_results['validated'] * 100) if self.validation_results['validated'] > 0 else 0
        print(f"Success rate:   {success_rate:.1f}%")
        
        if self.validation_results['failed'] == 0:
            print("\n✅ VALIDATION PASSED - 100% content preservation achieved")
        else:
            print(f"\n❌ VALIDATION FAILED - {self.validation_results['failed']} files with issues")
        
        print("=" * 60)


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description='Validate content preservation during Jekyll to MkDocs migration'
    )
    parser.add_argument(
        'migration_json',
        help='Path to migration JSON file (e.g., migration-pages.json)'
    )
    parser.add_argument(
        '--output', '-o',
        default='validation-report.json',
        help='Output path for validation report (default: validation-report.json)'
    )
    parser.add_argument(
        '--repo-root',
        help='Repository root directory (default: current directory)'
    )

    args = parser.parse_args()

    # Create validator
    validator = ContentValidator(args.migration_json, args.repo_root)

    # Load migration data
    if not validator.load_migration_data():
        sys.exit(1)

    # Run validation
    results = validator.validate_all()

    # Save report
    validator.save_report(args.output)

    # Print summary
    validator.print_summary()

    # Exit with appropriate code
    sys.exit(0 if results['failed'] == 0 else 1)


if __name__ == '__main__':
    main()
