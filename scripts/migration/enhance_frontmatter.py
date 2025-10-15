#!/usr/bin/env python3
"""
Frontmatter Enhancement Script for AI-Friendly Documentation

This script enriches markdown file frontmatter with AI-friendly metadata:
- ai_summary: Brief summary optimized for AI extraction
- primary_topic: Main topic of the page
- category: Documentation category
- difficulty: Content difficulty level
- prerequisites: Required prior knowledge
- related: Related documentation pages
- tags: Topic tags
- keywords: Enhanced search keywords

Usage:
    python3 enhance_frontmatter.py <docs_dir> [--output report.json] [--dry-run]
"""

import argparse
import json
import os
import re
from pathlib import Path
from typing import Dict, List, Optional, Any
import yaml


class FrontmatterEnhancer:
    """Enhances markdown frontmatter with AI-friendly metadata."""
    
    # Category mapping based on file paths
    CATEGORY_MAP = {
        'getting-started': 'Getting Started',
        'basic-drawing': 'Basic Drawing',
        'intermediate-drawing': 'Intermediate Drawing',
        'advanced-drawing': 'Advanced Drawing',
        'model-trees': 'Model Trees',
        'layout': 'Layout',
        'exporting': 'Exporting',
        'importing': 'Importing',
        'api': 'API Reference',
        'migration': 'Migration Guide',
        'chains': 'Working with Chains',
        'advanced-topics': 'Advanced Topics'
    }
    
    # Difficulty levels based on category and content
    DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert']
    
    # Common prerequisites by category
    PREREQUISITES_MAP = {
        'Getting Started': [],
        'Basic Drawing': ['Getting Started'],
        'Intermediate Drawing': ['Getting Started', 'Basic Drawing'],
        'Advanced Drawing': ['Getting Started', 'Basic Drawing', 'Intermediate Drawing'],
        'Working with Chains': ['Basic Drawing', 'Intermediate Drawing'],
        'Model Trees': ['Basic Drawing'],
        'Layout': ['Intermediate Drawing'],
        'Exporting': ['Basic Drawing'],
        'Importing': ['Basic Drawing'],
        'API Reference': [],
        'Migration Guide': [],
        'Advanced Topics': ['Basic Drawing', 'Intermediate Drawing']
    }
    
    def __init__(self, docs_dir: str, dry_run: bool = False):
        self.docs_dir = Path(docs_dir)
        self.dry_run = dry_run
        self.processed_files = []
        self.errors = []
        
    def extract_frontmatter(self, content: str) -> tuple[Optional[Dict], str, str]:
        """Extract YAML frontmatter from markdown content."""
        pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)'
        match = re.match(pattern, content, re.DOTALL)
        
        if match:
            try:
                frontmatter = yaml.safe_load(match.group(1)) or {}
                body = match.group(2)
                raw_fm = match.group(1)
                return frontmatter, body, raw_fm
            except yaml.YAMLError as e:
                return None, content, ""
        
        return {}, content, ""
    
    def determine_category(self, file_path: Path) -> str:
        """Determine category based on file path."""
        path_parts = file_path.relative_to(self.docs_dir).parts
        
        # Check parent directory
        if len(path_parts) > 1:
            parent = path_parts[-2]
            if parent in self.CATEGORY_MAP:
                return self.CATEGORY_MAP[parent]
        
        # Check file path for category keywords
        path_str = str(file_path).lower()
        for key, category in self.CATEGORY_MAP.items():
            if key in path_str:
                return category
        
        return 'General'
    
    def determine_difficulty(self, category: str, content: str) -> str:
        """Determine difficulty level based on category and content."""
        content_lower = content.lower()
        
        # Getting Started is always beginner
        if category == 'Getting Started':
            return 'beginner'
        
        # API Reference is intermediate
        if category == 'API Reference':
            return 'intermediate'
        
        # Advanced categories
        if category in ['Advanced Drawing', 'Advanced Topics']:
            return 'advanced'
        
        # Working with Chains is intermediate to advanced
        if category == 'Working with Chains':
            return 'advanced' if any(term in content_lower for term in ['theory', 'complex', 'multiple']) else 'intermediate'
        
        # Basic Drawing is beginner
        if category == 'Basic Drawing':
            return 'beginner'
        
        # Intermediate Drawing is intermediate
        if category == 'Intermediate Drawing':
            return 'intermediate'
        
        # Default based on content complexity
        complex_terms = ['algorithm', 'optimization', 'complex', 'advanced', 'theory']
        if any(term in content_lower for term in complex_terms):
            return 'advanced'
        
        return 'intermediate'
    
    def generate_ai_summary(self, title: str, content: str, category: str) -> str:
        """Generate AI-friendly summary from content."""
        # Extract first paragraph or first 150 chars
        lines = content.strip().split('\n')
        
        # Skip markdown headers and find first meaningful paragraph
        for line in lines:
            line = line.strip()
            if line and not line.startswith('#') and not line.startswith('---'):
                # Remove markdown formatting
                clean_line = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', line)  # Remove links
                clean_line = re.sub(r'[*_`]', '', clean_line)  # Remove emphasis
                clean_line = clean_line.strip()
                
                if len(clean_line) > 20:
                    # Truncate to 150 chars
                    if len(clean_line) > 150:
                        clean_line = clean_line[:147] + '...'
                    return clean_line
        
        # Fallback: generate from title and category
        return f"Learn about {title.lower()} in Photon - {category.lower()} guide"
    
    def determine_primary_topic(self, title: str, content: str) -> str:
        """Determine primary topic from title and content."""
        title_lower = title.lower()
        
        # Direct topic extraction from title
        topics = {
            'path': 'paths',
            'model': 'models',
            'chain': 'chains',
            'export': 'exporting',
            'import': 'importing',
            'fillet': 'fillets',
            'dogbone': 'dogbones',
            'layout': 'layouts',
            'svg': 'svg',
            'dxf': 'dxf',
            'font': 'fonts',
            'text': 'text',
            'line': 'lines',
            'circle': 'circles',
            'arc': 'arcs',
            'bezier': 'bezier-curves',
            'clone': 'cloning',
            'move': 'moving',
            'rotate': 'rotating',
            'scale': 'scaling',
            'mirror': 'mirroring',
            'measure': 'measuring',
            'combine': 'combining',
            'expand': 'expanding',
            'outline': 'outlining',
            'layer': 'layers',
            'break': 'breaking',
            'route': 'routes',
            'tree': 'model-trees',
            'walk': 'traversal',
            'simplif': 'simplification',
            'converg': 'converging',
            'distort': 'distorting',
            'wireframe': 'wireframe',
            'intersect': 'intersection'
        }
        
        for keyword, topic in topics.items():
            if keyword in title_lower:
                return topic
        
        # Fallback to category-based topic
        return title_lower.replace(' ', '-')
    
    def extract_keywords(self, title: str, content: str, category: str) -> List[str]:
        """Extract relevant keywords from content."""
        keywords = set()
        
        # Add title words
        title_words = [w.lower() for w in re.findall(r'\w+', title) if len(w) > 3]
        keywords.update(title_words)
        
        # Add category
        keywords.add(category.lower().replace(' ', '-'))
        
        # Common photon/core terms
        photon_terms = [
            'photon', 'photon/core', 'vector', 'graphics', 'drawing', 
            'paths', 'models', 'geometry', '2d', 'cad', 'laser', 'cnc'
        ]
        
        content_lower = content.lower()
        for term in photon_terms:
            if term in content_lower:
                keywords.add(term)
        
        # Extract code-related keywords
        if 'javascript' in content_lower or 'import' in content_lower:
            keywords.add('javascript')
        
        if 'svg' in content_lower:
            keywords.add('svg')
        
        if 'export' in content_lower:
            keywords.add('export')
        
        return sorted(list(keywords))[:10]  # Limit to 10 keywords
    
    def find_related_pages(self, file_path: Path, category: str, topic: str) -> List[str]:
        """Find related documentation pages."""
        related = []
        
        # Add category-based relations from prerequisites
        if category in self.PREREQUISITES_MAP:
            related.extend(self.PREREQUISITES_MAP[category])
        
        # Topic-based relations
        topic_relations = {
            'paths': ['Models', 'Path Constructors', 'Path Independence'],
            'models': ['Paths', 'Modeling', 'Built-in Models'],
            'chains': ['Chain Theory', 'Routes', 'Breaking'],
            'exporting': ['SVG Styling', 'Exporting DXF', 'Exporting PDF'],
            'fillets': ['Dogbones', 'Chain Fillet', 'Chains'],
            'cloning': ['Moving', 'Rotating', 'Scaling'],
            'moving': ['Rotating', 'Scaling', 'Originating'],
            'layouts': ['Layout on Path', 'Layout on Chain', 'Repeating Layouts']
        }
        
        for key, relations in topic_relations.items():
            if key in topic:
                related.extend(relations)
        
        return list(set(related))[:5]  # Limit to 5 related pages
    
    def enhance_frontmatter(self, file_path: Path) -> Dict[str, Any]:
        """Enhance frontmatter for a single file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            frontmatter, body, raw_fm = self.extract_frontmatter(content)
            
            if frontmatter is None:
                self.errors.append({
                    'file': str(file_path),
                    'error': 'Invalid YAML frontmatter'
                })
                return None
            
            # Get existing values
            title = frontmatter.get('title', file_path.stem.replace('-', ' ').title())
            description = frontmatter.get('description', '')
            
            # Determine enhancements
            category = self.determine_category(file_path)
            difficulty = self.determine_difficulty(category, body)
            ai_summary = self.generate_ai_summary(title, body, category)
            primary_topic = self.determine_primary_topic(title, body)
            keywords = frontmatter.get('keywords', [])
            if not keywords:
                keywords = self.extract_keywords(title, body, category)
            
            prerequisites = self.PREREQUISITES_MAP.get(category, [])
            related = self.find_related_pages(file_path, category, primary_topic)
            
            # Generate tags from category and topic
            tags = [
                category.lower().replace(' ', '-'),
                primary_topic,
                difficulty
            ]
            tags = list(set(tags))[:5]
            
            # Add new fields to frontmatter
            enhanced_fm = frontmatter.copy()
            enhanced_fm['title'] = title
            
            if not description:
                enhanced_fm['description'] = ai_summary
            
            enhanced_fm['category'] = category
            enhanced_fm['difficulty'] = difficulty
            enhanced_fm['ai_summary'] = ai_summary
            enhanced_fm['primary_topic'] = primary_topic
            enhanced_fm['keywords'] = keywords
            enhanced_fm['tags'] = tags
            
            if prerequisites:
                enhanced_fm['prerequisites'] = prerequisites
            
            if related:
                enhanced_fm['related'] = related
            
            # Write enhanced content
            if not self.dry_run:
                new_content = '---\n' + yaml.dump(enhanced_fm, default_flow_style=False, allow_unicode=True) + '---\n' + body
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
            
            return {
                'file': str(file_path.relative_to(self.docs_dir)),
                'category': category,
                'difficulty': difficulty,
                'primary_topic': primary_topic,
                'ai_summary': ai_summary,
                'keywords_count': len(keywords),
                'tags_count': len(tags),
                'prerequisites_count': len(prerequisites),
                'related_count': len(related),
                'status': 'enhanced' if not self.dry_run else 'dry_run'
            }
            
        except Exception as e:
            self.errors.append({
                'file': str(file_path),
                'error': str(e)
            })
            return None
    
    def process_directory(self) -> Dict[str, Any]:
        """Process all markdown files in directory."""
        markdown_files = list(self.docs_dir.rglob('*.md'))
        
        print(f"Found {len(markdown_files)} markdown files")
        print(f"Processing in {'DRY RUN' if self.dry_run else 'WRITE'} mode...")
        
        results = []
        for i, file_path in enumerate(markdown_files, 1):
            print(f"[{i}/{len(markdown_files)}] Processing: {file_path.relative_to(self.docs_dir)}")
            
            result = self.enhance_frontmatter(file_path)
            if result:
                results.append(result)
                self.processed_files.append(str(file_path))
        
        # Generate summary
        summary = {
            'total_files': len(markdown_files),
            'processed_files': len(results),
            'errors': len(self.errors),
            'mode': 'dry_run' if self.dry_run else 'write',
            'categories': {},
            'difficulties': {},
            'topics': {}
        }
        
        # Aggregate statistics
        for result in results:
            category = result['category']
            difficulty = result['difficulty']
            topic = result['primary_topic']
            
            summary['categories'][category] = summary['categories'].get(category, 0) + 1
            summary['difficulties'][difficulty] = summary['difficulties'].get(difficulty, 0) + 1
            summary['topics'][topic] = summary['topics'].get(topic, 0) + 1
        
        return {
            'summary': summary,
            'processed': results,
            'errors': self.errors
        }


def main():
    parser = argparse.ArgumentParser(
        description='Enhance markdown frontmatter with AI-friendly metadata'
    )
    parser.add_argument(
        'docs_dir',
        help='Documentation directory to process'
    )
    parser.add_argument(
        '--output',
        default='frontmatter-enhancement-report.json',
        help='Output report file (default: frontmatter-enhancement-report.json)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview changes without writing files'
    )
    
    args = parser.parse_args()
    
    # Validate directory
    if not os.path.isdir(args.docs_dir):
        print(f"Error: Directory not found: {args.docs_dir}")
        return 1
    
    # Run enhancement
    enhancer = FrontmatterEnhancer(args.docs_dir, dry_run=args.dry_run)
    results = enhancer.process_directory()
    
    # Write report
    with open(args.output, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print("\n" + "="*60)
    print("ENHANCEMENT SUMMARY")
    print("="*60)
    print(f"Total files: {results['summary']['total_files']}")
    print(f"Processed: {results['summary']['processed_files']}")
    print(f"Errors: {results['summary']['errors']}")
    print(f"Mode: {results['summary']['mode']}")
    
    print("\nCategories:")
    for category, count in sorted(results['summary']['categories'].items()):
        print(f"  {category}: {count}")
    
    print("\nDifficulty levels:")
    for difficulty, count in sorted(results['summary']['difficulties'].items()):
        print(f"  {difficulty}: {count}")
    
    print(f"\nReport saved to: {args.output}")
    
    if results['errors']:
        print(f"\n⚠️  {len(results['errors'])} errors occurred. Check report for details.")
        return 1
    
    print("\n✓ Frontmatter enhancement complete!")
    return 0


if __name__ == '__main__':
    exit(main())
