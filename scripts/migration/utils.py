#!/usr/bin/env python3
"""
Migration Utilities for Jekyll to MkDocs Migration

This module provides utility functions for content processing, file operations,
and data normalization during the migration process.
"""

import hashlib
import json
import os
import re
import shutil
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple, Union
from urllib.parse import urlparse


class MigrationUtils:
    """Utility functions for migration operations."""

    @staticmethod
    def calculate_hash(content: Union[str, bytes], algorithm: str = "sha256") -> str:
        """Calculate hash of content for integrity checking."""
        if isinstance(content, str):
            content = content.encode('utf-8')

        hash_obj = hashlib.new(algorithm)
        hash_obj.update(content)
        return hash_obj.hexdigest()

    @staticmethod
    def calculate_file_hash(file_path: Union[str, Path]) -> str:
        """Calculate hash of a file's contents."""
        file_path = Path(file_path)

        if not file_path.exists():
            raise FileNotFoundError(f"File not found: {file_path}")

        with open(file_path, 'rb') as f:
            content = f.read()
            return MigrationUtils.calculate_hash(content)

    @staticmethod
    def normalize_path(path: Union[str, Path]) -> str:
        """Normalize file paths for consistent comparison."""
        path = Path(path)
        return str(path.resolve())

    @staticmethod
    def normalize_whitespace(text: str) -> str:
        """Normalize whitespace in text content."""
        # Replace multiple spaces with single space
        text = re.sub(r' +', ' ', text)
        # Replace multiple newlines with double newline (paragraph break)
        text = re.sub(r'\n\s*\n\s*\n+', '\n\n', text)
        # Trim whitespace from beginning and end
        return text.strip()

    @staticmethod
    def extract_frontmatter(content: str) -> Tuple[Dict, str]:
        """Extract Jekyll frontmatter and content from markdown file."""
        frontmatter_pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)$'
        match = re.match(frontmatter_pattern, content, re.DOTALL)

        if match:
            frontmatter_text = match.group(1)
            content_text = match.group(2)
            try:
                # Try to parse as YAML-like structure
                frontmatter = MigrationUtils.parse_simple_yaml(frontmatter_text)
                return frontmatter, content_text
            except Exception:
                # If parsing fails, return empty frontmatter
                return {}, content
        else:
            return {}, content

    @staticmethod
    def parse_simple_yaml(text: str) -> Dict:
        """Parse simple YAML-like frontmatter."""
        result = {}
        lines = text.strip().split('\n')

        for line in lines:
            line = line.strip()
            if ':' in line:
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip().strip('"').strip("'")
                result[key] = value

        return result

    @staticmethod
    def ensure_directory(path: Union[str, Path]) -> Path:
        """Ensure directory exists, creating it if necessary."""
        path = Path(path)
        path.mkdir(parents=True, exist_ok=True)
        return path

    @staticmethod
    def safe_copy_file(src: Union[str, Path], dst: Union[str, Path]) -> bool:
        """Safely copy a file, creating directories as needed."""
        src_path = Path(src)
        dst_path = Path(dst)

        if not src_path.exists():
            return False

        try:
            MigrationUtils.ensure_directory(dst_path.parent)
            shutil.copy2(src_path, dst_path)
            return True
        except Exception:
            return False

    @staticmethod
    def read_file_content(file_path: Union[str, Path], encoding: str = 'utf-8') -> str:
        """Read file content with error handling."""
        file_path = Path(file_path)

        if not file_path.exists():
            raise FileNotFoundError(f"File not found: {file_path}")

        try:
            with open(file_path, 'r', encoding=encoding) as f:
                return f.read()
        except UnicodeDecodeError:
            # Try different encodings
            for enc in ['utf-8', 'latin-1', 'cp1252']:
                try:
                    with open(file_path, 'r', encoding=enc) as f:
                        return f.read()
                except UnicodeDecodeError:
                    continue
            raise UnicodeDecodeError(f"Could not decode file: {file_path}")

    @staticmethod
    def write_file_content(file_path: Union[str, Path], content: str,
                          encoding: str = 'utf-8') -> bool:
        """Write content to file with error handling."""
        file_path = Path(file_path)

        try:
            MigrationUtils.ensure_directory(file_path.parent)
            with open(file_path, 'w', encoding=encoding) as f:
                f.write(content)
            return True
        except Exception:
            return False

    @staticmethod
    def find_files_by_extension(directory: Union[str, Path],
                               extensions: List[str]) -> List[Path]:
        """Find all files with specified extensions in directory."""
        directory = Path(directory)
        found_files = []

        if not directory.exists():
            return found_files

        for ext in extensions:
            pattern = f"**/*{ext}" if not ext.startswith('.') else f"**/*{ext}"
            found_files.extend(directory.glob(pattern))

        return sorted(found_files)

    @staticmethod
    def find_files_by_pattern(directory: Union[str, Path],
                             pattern: str) -> List[Path]:
        """Find files matching a glob pattern."""
        directory = Path(directory)
        return list(directory.glob(pattern))

    @staticmethod
    def get_file_size(file_path: Union[str, Path]) -> int:
        """Get file size in bytes."""
        file_path = Path(file_path)
        return file_path.stat().st_size if file_path.exists() else 0

    @staticmethod
    def is_binary_file(file_path: Union[str, Path]) -> bool:
        """Check if a file is binary."""
        file_path = Path(file_path)

        if not file_path.exists():
            return False

        try:
            with open(file_path, 'rb') as f:
                chunk = f.read(1024)
                return b'\0' in chunk  # Simple check for null bytes
        except Exception:
            return True  # Assume binary if can't read as text

    @staticmethod
    def sanitize_filename(filename: str) -> str:
        """Sanitize filename for safe file operations."""
        # Remove or replace problematic characters
        sanitized = re.sub(r'[<>:"/\\|?*]', '_', filename)
        # Remove multiple underscores
        sanitized = re.sub(r'_+', '_', sanitized)
        # Remove leading/trailing underscores and whitespace
        return sanitized.strip('_ \t\n\r')

    @staticmethod
    def extract_code_blocks(content: str) -> List[Dict]:
        """Extract code blocks from markdown content."""
        code_blocks = []

        # Match fenced code blocks
        fenced_pattern = r'```(\w+)?\n?(.*?)\n?```'
        fenced_matches = re.findall(fenced_pattern, content, re.DOTALL)

        for i, (language, code) in enumerate(fenced_matches):
            code_blocks.append({
                'type': 'fenced',
                'language': language or 'text',
                'content': code.strip(),
                'index': i
            })

        # Match indented code blocks
        indented_pattern = r'(?:^|\n\n)( {4,}|\t+)(.*?)(?=\n\n|\n*$)'
        indented_matches = re.findall(indented_pattern, content, re.DOTALL)

        for i, (indent, code) in enumerate(indented_matches):
            code_blocks.append({
                'type': 'indented',
                'language': 'text',
                'content': code.strip(),
                'index': len(fenced_matches) + i
            })

        return code_blocks

    @staticmethod
    def normalize_links(content: str, base_url: str = '') -> str:
        """Normalize relative links in content."""
        # Pattern for markdown links [text](url)
        link_pattern = r'\[([^\]]*)\]\(([^)]+)\)'

        def normalize_url(match):
            text = match.group(1)
            url = match.group(2)

            # Skip absolute URLs and anchors
            if url.startswith(('http://', 'https://', 'mailto:', '#')):
                return match.group(0)

            # Handle relative URLs
            if not url.startswith('/'):
                url = f"{base_url.rstrip('/')}/{url}"

            return f"[{text}]({url})"

        return re.sub(link_pattern, normalize_url, content)

    @staticmethod
    def validate_url(url: str) -> bool:
        """Basic URL validation."""
        try:
            parsed = urlparse(url)
            return bool(parsed.scheme and parsed.netloc)
        except Exception:
            return False

    @staticmethod
    def create_backup(file_path: Union[str, Path]) -> Optional[Path]:
        """Create a backup of a file before modification."""
        file_path = Path(file_path)

        if not file_path.exists():
            return None

        backup_path = file_path.with_suffix(f"{file_path.suffix}.backup")
        counter = 1

        # Avoid overwriting existing backups
        while backup_path.exists():
            backup_path = file_path.with_suffix(f"{file_path.suffix}.backup.{counter}")
            counter += 1

        try:
            shutil.copy2(file_path, backup_path)
            return backup_path
        except Exception:
            return None


def main():
    """Test utility functions."""
    # Test hash calculation
    test_content = "Hello, World!"
    hash_result = MigrationUtils.calculate_hash(test_content)
    print(f"Hash of '{test_content}': {hash_result}")

    # Test path normalization
    test_path = "./some/../path/./file.txt"
    normalized = MigrationUtils.normalize_path(test_path)
    print(f"Normalized path: {normalized}")

    # Test frontmatter extraction
    test_markdown = """---
title: Test Page
author: John Doe
---

# Hello World

This is a test page."""
    frontmatter, content = MigrationUtils.extract_frontmatter(test_markdown)
    print(f"Frontmatter: {frontmatter}")
    print(f"Content: {repr(content[:50])}...")


if __name__ == "__main__":
    main()
