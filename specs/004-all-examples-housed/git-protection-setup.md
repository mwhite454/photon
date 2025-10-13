# Git Branch Protection Setup

**Task**: T003 - Setup git branch protection

## Recommendation

Configure branch protection for `004-all-examples-housed` branch to require:

1. **Status checks must pass before merging**:
   - `verify-examples` (from examples-verification.yml workflow)

2. **GitHub Settings Path**:
   - Repository Settings → Branches → Branch protection rules
   - Add rule for pattern: `004-all-examples-housed`
   - Enable: "Require status checks to pass before merging"
   - Select: "verify-examples" check

## Manual Setup Required

This requires repository admin access. To enable:

```bash
# Via GitHub CLI (if available):
gh api repos/:owner/:repo/branches/004-all-examples-housed/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["verify-examples"]}'
```

Or configure via GitHub web interface.

**Status**: Documented for manual setup
