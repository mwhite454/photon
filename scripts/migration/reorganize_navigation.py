#!/usr/bin/env python3
"""
Reorganize Navigation - Create proper nested structure for MkDocs

This script categorizes snippets into their logical sections and generates
a properly nested navigation structure for mkdocs.yml.
"""

import yaml
from pathlib import Path

# Snippet categorization based on content and naming
SNIPPET_CATEGORIES = {
    'Getting Started': [
        'try-it-now.md',
        'getting-started-browser.md',
        'getting-started-node.md',
        '$-function.md',
        'frequently-used-functions.md',
    ],
    'Basic Drawing': [
        'paths.md',
        'models.md',
        'modeling.md',
        'built-in-models.md',
        'basic-rendering-in-svg.md',
        'just-json.md',
        'units.md',
        'points.md',
        'path-constructors.md',
        'path-independence.md',
        'open-vs-closed-geometry.md',
    ],
    'Intermediate Drawing': [
        'cloning.md',
        'moving.md',
        'rotating.md',
        'scaling.md',
        'mirroring.md',
        'modifying-models.md',
        'measuring.md',
        'zeroing-and-centering.md',
        'originating.md',
        'intersection.md',
        'simplifying.md',
        'converging.md',
        'distorting.md',
        'wireframe.md',
        'order-of-operations.md',
    ],
    'Advanced Drawing': [
        'fillets.md',
        'chain-fillet.md',
        'dogbones.md',
        'chain-dogbone.md',
        'combining.md',
        'expanding.md',
        'outlining.md',
        'layers.md',
        'captions.md',
        'fonts-and-text.md',
        'breaking.md',
        'routes.md',
    ],
    'Working with Chains': [
        'chains.md',
        'chain-theory.md',
        'chain-single.md',
        'chain-multiple.md',
        'chain-links.md',
        'chain-order.md',
        'chain-to-points.md',
        'chain-to-key-points.md',
        'chain-to-new-model.md',
    ],
    'Model Trees': [
        'tree.md',
        'walking.md',
    ],
    'Layout': [
        'layout-repeating.md',
        'layout-on-path.md',
        'layout-on-chain.md',
    ],
    'Exporting': [
        'exporting-svg.md',
        'svg-styling.md',
        'exporting-svg-path-data.md',
        'exporting-dxf.md',
        'exporting-pdf.md',
        'exporting-openjscad.md',
        'exporting-stl.md',
    ],
    'Importing': [
        'importing-svg-path-data.md',
        'importing-svg-points.md',
    ],
    'Advanced Topics': [
        'aliasing.md',
        'bezier-curves.md',
        'cascading-functions.md',
        'solvers.md',
    ],
}

def generate_navigation():
    """Generate the complete navigation structure."""
    
    nav = [
        {'Photon Documentation': 'index.md'},
    ]
    
    # Add categorized snippets
    for category, snippets in SNIPPET_CATEGORIES.items():
        category_items = []
        for snippet in snippets:
            snippet_path = f'snippets/{snippet}'
            # Use the filename as title (will be overridden by frontmatter when rendered)
            title = snippet.replace('.md', '').replace('-', ' ').title()
            category_items.append({title: snippet_path})
        
        if category_items:
            nav.append({category: category_items})
    
    # Add API Reference at the end
    nav.append({'API Reference': 'api/index.md'})
    
    return nav

def write_mkdocs_nav_section(output_path: Path):
    """Write just the nav section to a file."""
    nav = generate_navigation()
    
    # Write as YAML
    with open(output_path, 'w') as f:
        f.write("# Generated navigation structure for mkdocs.yml\n")
        f.write("# Copy the 'nav:' section below into your mkdocs.yml file\n\n")
        f.write("nav:\n")
        yaml.dump(nav, f, default_flow_style=False, sort_keys=False, indent=2)
    
    print(f"✅ Navigation structure written to: {output_path}")
    print(f"📝 Copy the 'nav:' section from this file into docs-new/mkdocs.yml")

if __name__ == '__main__':
    output_path = Path('docs-new/mkdocs.nav.generated.yml')
    write_mkdocs_nav_section(output_path)
