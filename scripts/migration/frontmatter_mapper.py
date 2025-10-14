import argparse
import json
from pathlib import Path


def map_frontmatter(input_file: str, output_file: str) -> None:
    input_path = Path(input_file)
    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    mapping_result = {
        "source": str(input_path.resolve()),
        "mapped": {},
        "errors": [],
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(mapping_result, f, indent=2)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    map_frontmatter(args.input, args.output)


if __name__ == "__main__":
    main()
