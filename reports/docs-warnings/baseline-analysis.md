# Baseline Warning Analysis

**Date**: 2025-10-16

This report summarizes the initial state of MkDocs build warnings captured on this date. The analysis provides a data-driven foundation for prioritizing remediation work.

## Key Findings

- **Total Warnings**: 130
- **Remediation Target**: <150 (70%+ reduction goal already met, but further reduction required for headroom)

## Warning Distribution by Category

Most warnings come from plugin metadata emitted for demo dependencies, followed by broken documentation links.

| Category | Count | Percentage |
| :--- | :--- | :--- |
| `plugin_warning` | 81 | 62.3% |
| `broken_link` | 45 | 34.6% |
| `file_conflict` | 3 | 2.3% |
| `config_warning` | 1 | 0.8% |

## Top Impacted Files

| File | Warning Count | Primary Category |
| :--- | :--- | :--- |
| `snippets/exporting-svg.md` | 21 | `broken_link` |
| `migration/migration-faq.md` | 5 | `broken_link` |
| `snippets/exporting-dxf.md` | 3 | `broken_link` |
| `snippets/walking.md` | 3 | `broken_link` |
| `migration/api-mapping.md` | 2 | `broken_link` |

## Next Steps

- **Broken Links**: Focus on high-volume offenders in `snippets/*.md` and `migration/*.md` to remove 34.6% of the baseline warnings.
- **Plugin Metadata**: Decide whether to adjust the git-revision-date plugin (possible `enable_git_follow: false`) or exclude `demos/node_modules/` from the build to eliminate the 81 plugin warnings.
- **Conflicts & Config**: Resolve remaining file conflict exclusions and the single navigation configuration issue to keep future builds clean.
