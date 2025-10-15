#!/usr/bin/env python3
"""
Migration Database Schema for Jekyll to MkDocs Migration

This module defines the SQLite database schema for tracking migration progress,
results, and validation status.
"""

import sqlite3
import os
from pathlib import Path


class MigrationDatabase:
    """SQLite database for migration tracking and validation."""

    def __init__(self, db_path: str = "scripts/migration/migration.db"):
        """Initialize database connection and create tables if they don't exist."""
        self.db_path = Path(db_path)
        self.db_path.parent.mkdir(parents=True, exist_ok=True)

        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row  # Enable column access by name
        self.create_tables()

    def create_tables(self):
        """Create all required tables for migration tracking."""
        cursor = self.conn.cursor()

        # DocumentationPage table - tracks Jekyll pages and their migration status
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS DocumentationPage (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                source_path TEXT NOT NULL UNIQUE,
                target_path TEXT,
                title TEXT,
                frontmatter TEXT, -- JSON string of Jekyll frontmatter
                content_hash TEXT,
                migration_status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
                migration_errors TEXT, -- JSON array of error messages
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Snippet table - tracks Jekyll snippet files and their migration
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS Snippet (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                source_path TEXT NOT NULL UNIQUE,
                target_path TEXT,
                title TEXT,
                category TEXT,
                language TEXT,
                code_blocks TEXT, -- JSON array of code blocks
                frontmatter TEXT, -- JSON string of Jekyll frontmatter
                content_hash TEXT,
                migration_status TEXT DEFAULT 'pending',
                migration_errors TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Asset table - tracks static assets and their migration
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS Asset (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                source_path TEXT NOT NULL UNIQUE,
                target_path TEXT,
                asset_type TEXT, -- image, css, js, font, etc.
                file_size INTEGER,
                content_hash TEXT,
                migration_status TEXT DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # MigrationResult table - tracks overall migration results per file
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS MigrationResult (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                source_type TEXT NOT NULL, -- page, snippet, asset
                source_id INTEGER NOT NULL, -- ID from respective table
                migration_started_at TIMESTAMP,
                migration_completed_at TIMESTAMP,
                success BOOLEAN,
                error_message TEXT,
                output_path TEXT,
                processing_time_seconds REAL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # ValidationResult table - tracks validation results
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS ValidationResult (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                validation_type TEXT NOT NULL, -- content, links, accessibility, performance
                target_path TEXT NOT NULL,
                validation_status TEXT DEFAULT 'pending', -- pending, passed, failed
                errors TEXT, -- JSON array of validation errors
                warnings TEXT, -- JSON array of validation warnings
                score REAL, -- Numeric score (0-100) for quantitative validations
                validated_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Create indexes for better performance
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_page_status ON DocumentationPage(migration_status)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_snippet_status ON Snippet(migration_status)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_asset_status ON Asset(migration_status)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_validation_path ON ValidationResult(target_path)")

        self.conn.commit()

    def insert_documentation_page(self, source_path: str, title: str = None,
                                 frontmatter: dict = None, content_hash: str = None) -> int:
        """Insert a new documentation page record."""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO DocumentationPage (source_path, title, frontmatter, content_hash)
            VALUES (?, ?, ?, ?)
        """, (source_path, title, str(frontmatter) if frontmatter else None, content_hash))
        self.conn.commit()
        return cursor.lastrowid

    def insert_snippet(self, source_path: str, title: str = None, category: str = None,
                      language: str = None, frontmatter: dict = None, content_hash: str = None) -> int:
        """Insert a new snippet record."""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO Snippet (source_path, title, category, language, frontmatter, content_hash)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (source_path, title, category, language, str(frontmatter) if frontmatter else None, content_hash))
        self.conn.commit()
        return cursor.lastrowid

    def insert_asset(self, source_path: str, asset_type: str, file_size: int = None,
                    content_hash: str = None) -> int:
        """Insert a new asset record."""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO Asset (source_path, asset_type, file_size, content_hash)
            VALUES (?, ?, ?, ?)
        """, (source_path, asset_type, file_size, content_hash))
        self.conn.commit()
        return cursor.lastrowid

    def update_migration_status(self, table: str, record_id: int, status: str, errors: str = None):
        """Update migration status for a record."""
        cursor = self.conn.cursor()
        cursor.execute(f"""
            UPDATE {table}
            SET migration_status = ?, migration_errors = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """, (status, errors, record_id))
        self.conn.commit()

    def get_pending_migrations(self, table: str, limit: int = 100):
        """Get pending migration records."""
        cursor = self.conn.cursor()
        cursor.execute(f"""
            SELECT * FROM {table}
            WHERE migration_status = 'pending'
            LIMIT ?
        """, (limit,))
        return cursor.fetchall()

    def close(self):
        """Close database connection."""
        if self.conn:
            self.conn.close()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()


if __name__ == "__main__":
    # Create the database and tables when run directly
    with MigrationDatabase() as db:
        print(f"Migration database created at: {db.db_path}")
        print("Tables created: DocumentationPage, Snippet, Asset, MigrationResult, ValidationResult")
