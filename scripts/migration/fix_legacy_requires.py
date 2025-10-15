#!/usr/bin/env python3
"""
Fix legacy require statements in documentation
"""

import re
from pathlib import Path

def fix_require_statement(content: str) -> str:
    """Convert require('makerjs') to proper imports"""
    
    # Pattern: const m = require('makerjs');
    # Replace with: import { models, paths, exporter, point, model, layout, chain } from '@7syllable/photon-core';
    # And update all m.* references
    
    if "require('makerjs')" not in content:
        return content
    
    # Remove the require statement
    content = re.sub(
        r"const\s+m\s*=\s*require\(['\"]makerjs['\"]\);?\s*\n?",
        "",
        content
    )
    
    # Find all m. references to determine what to import
    imports_needed = set()
    
    if re.search(r'm\.models\.', content):
        imports_needed.add('models')
    if re.search(r'm\.paths\.', content):
        imports_needed.add('paths')
    if re.search(r'm\.exporter\.', content):
        imports_needed.add('exporter')
    if re.search(r'm\.point\.', content):
        imports_needed.add('point')
    if re.search(r'm\.model\.', content):
        imports_needed.add('model')
    if re.search(r'm\.layout\.', content):
        imports_needed.add('layout')
    if re.search(r'm\.chain\.', content):
        imports_needed.add('chain')
    
    # Replace m.namespace. with namespace.
    content = re.sub(r'\bm\.models\.', 'models.', content)
    content = re.sub(r'\bm\.paths\.', 'paths.', content)
    content = re.sub(r'\bm\.exporter\.', 'exporter.', content)
    content = re.sub(r'\bm\.point\.', 'point.', content)
    content = re.sub(r'\bm\.model\.', 'model.', content)
    content = re.sub(r'\bm\.layout\.', 'layout.', content)
    content = re.sub(r'\bm\.chain\.', 'chain.', content)
    
    # Add import statement at the beginning of code blocks
    if imports_needed:
        import_statement = f"import {{ {', '.join(sorted(imports_needed))} }} from '@7syllable/photon-core';\n"
        
        # Find code blocks and add imports
        def add_import_to_block(match):
            block_start = match.group(1)
            block_content = match.group(2)
            block_end = match.group(3)
            
            # Check if this block has our namespace usage
            if any(f'{ns}.' in block_content for ns in imports_needed):
                # Add import if not already present
                if '@7syllable/photon-core' not in block_content:
                    return f"{block_start}{import_statement}{block_content}{block_end}"
            
            return match.group(0)
        
        content = re.sub(
            r'(```javascript\n)(.*?)(```)',
            add_import_to_block,
            content,
            flags=re.DOTALL
        )
    
    return content


def main():
    docs_dir = Path('docs-new/docs/snippets')
    
    files_to_fix = [
        'bezier-curves.md',
        'chain-fillet.md',
        'chains.md',
        'expanding.md',
        'layout-repeating.md',
        'outlining.md',
        'simplifying.md',
        'wireframe.md',
    ]
    
    fixed_count = 0
    for filename in files_to_fix:
        file_path = docs_dir / filename
        if file_path.exists():
            content = file_path.read_text()
            fixed_content = fix_require_statement(content)
            
            if content != fixed_content:
                file_path.write_text(fixed_content)
                print(f"✓ Fixed {filename}")
                fixed_count += 1
            else:
                print(f"- Skipped {filename} (no changes needed)")
        else:
            print(f"✗ Not found: {filename}")
    
    print(f"\nFixed {fixed_count} files")


if __name__ == '__main__':
    main()
