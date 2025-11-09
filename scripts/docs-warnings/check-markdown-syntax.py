#!/usr/bin/env python3
"""
Check markdown syntax using markdownlint.
"""
import json
import subprocess
import sys
from pathlib import Path


def run_markdownlint():
    """Run markdownlint on documentation files and save results."""
    docs_dir = Path('docs/docs')
    output_file = Path('reports/tests/markdown-lint.json')

    # Ensure output directory exists
    output_file.parent.mkdir(parents=True, exist_ok=True)

    try:
        # Find all markdown files
        md_files = list(docs_dir.rglob('*.md'))
        print(f"🔍 Running markdownlint on {len(md_files)} documentation files...")

        all_results = []

        for md_file in md_files:  # Process all files
            try:
                # Run markdownlint on individual file
                result = subprocess.run(
                    ['markdownlint', '--json', str(md_file)],
                    capture_output=True,
                    text=True,
                    cwd=Path.cwd()
                )

                # Parse the JSON output for this file (from stderr when issues found)
                json_output = result.stderr.strip() if result.stderr.strip() else result.stdout.strip()
                if json_output:
                    try:
                        file_results = json.loads(json_output)
                        all_results.extend(file_results)
                    except json.JSONDecodeError as e:
                        print(f"❌ Failed to parse JSON for {md_file}: {e}")
                        print(f"Output: {json_output[:200]}...")
                        continue

            except subprocess.CalledProcessError as e:
                print(f"❌ Error processing {md_file}: {e}")
                continue

        # Save results
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_results, f, indent=2, ensure_ascii=False)

        # Print summary
        if all_results:
            total_files = len(set(r.get('fileName', '') for r in all_results))
            total_issues = len(all_results)
            print(f"⚠️  Found {total_issues} markdown syntax issues in {total_files} files")
            print(f"📊 Results saved to {output_file}")
        else:
            print("✅ No markdown syntax issues found")
            print(f"📊 Results saved to {output_file}")

        return True

    except FileNotFoundError:
        print("❌ markdownlint not found. Please install markdownlint-cli:")
        print("   npm install -g markdownlint-cli")
        return False
    except Exception as e:
        print(f"❌ Error running markdownlint: {e}")
        return False


if __name__ == '__main__':
    success = run_markdownlint()
    sys.exit(0 if success else 1)
