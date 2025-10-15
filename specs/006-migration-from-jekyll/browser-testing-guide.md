# Browser Testing Guide for MkDocs Migration

**Date**: 2025-10-14  
**Phase**: Phase 7 - Validation & Quality Assurance  
**Tasks**: T064 (Cross-browser), T065 (Accessibility)

## T064: Cross-Browser Testing

### Objective
Verify consistent rendering across Chrome, Firefox, and Safari.

### Setup
1. Start the MkDocs dev server:
   ```bash
   cd docs-new
   mkdocs serve
   ```
2. Open http://localhost:8000 in each browser

### Test Checklist

#### Chrome (Latest)
- [ ] Homepage loads correctly
- [ ] Navigation menu functional
- [ ] Search works
- [ ] Code blocks render with syntax highlighting
- [ ] Tables display properly
- [ ] Images load
- [ ] Links are clickable
- [ ] Theme switching works (if applicable)
- [ ] Responsive design works (test mobile viewport)

#### Firefox (Latest)
- [ ] Homepage loads correctly
- [ ] Navigation menu functional
- [ ] Search works
- [ ] Code blocks render with syntax highlighting
- [ ] Tables display properly
- [ ] Images load
- [ ] Links are clickable
- [ ] Theme switching works (if applicable)
- [ ] Responsive design works (test mobile viewport)

#### Safari (Latest, macOS)
- [ ] Homepage loads correctly
- [ ] Navigation menu functional
- [ ] Search works
- [ ] Code blocks render with syntax highlighting
- [ ] Tables display properly
- [ ] Images load
- [ ] Links are clickable
- [ ] Theme switching works (if applicable)
- [ ] Responsive design works (test mobile viewport)

### Key Pages to Test
1. `/` - Homepage
2. `/getting-started/` - Getting Started
3. `/snippets/chain-fillet/` - Code example page
4. `/converted/api/classes/core_paths.Circle/` - API reference
5. `/model-trees/` - Section index

### Expected Results
- **Consistent layout** across all browsers
- **No JavaScript errors** in console
- **Search functionality** works in all browsers
- **Navigation** is accessible and functional
- **Code highlighting** renders correctly

### Known Issues to Document
- Note any browser-specific rendering issues
- Document any performance differences
- Report any broken features per browser

---

## T065: Accessibility Audit

### Objective
Run Lighthouse accessibility test and verify score ≥90.

### Setup
1. Start the MkDocs dev server:
   ```bash
   cd docs-new
   mkdocs serve
   ```
2. Open http://localhost:8000 in Chrome
3. Open Chrome DevTools (F12)
4. Navigate to "Lighthouse" tab

### Running Lighthouse

#### Configuration
- **Mode**: Navigation (Default)
- **Categories**: 
  - ✓ Accessibility (required)
  - ✓ Best Practices (recommended)
  - ✓ SEO (recommended)
  - ✓ Performance (optional)
- **Device**: Desktop (primary), Mobile (secondary)

#### Test Pages
Run Lighthouse on these representative pages:

1. **Homepage** (`/`)
   - Target: ≥90 accessibility score
   
2. **Documentation page** (`/snippets/chain-fillet/`)
   - Target: ≥90 accessibility score
   
3. **API reference** (`/converted/api/classes/core_paths.Circle/`)
   - Target: ≥90 accessibility score

### Lighthouse Checklist

#### Accessibility Score
- [ ] Homepage: Score ___/100
- [ ] Documentation page: Score ___/100
- [ ] API reference: Score ___/100
- [ ] **All pages ≥90?** (Yes/No)

#### Common Issues to Check
- [ ] Images have alt text
- [ ] Headings are in logical order (H1 → H2 → H3)
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] ARIA attributes are valid
- [ ] Links have descriptive text
- [ ] Forms have labels (if applicable)
- [ ] No duplicate IDs
- [ ] Language is specified in HTML

### Fixing Issues

If accessibility score < 90:

1. **Review Lighthouse report** for specific issues
2. **Prioritize issues** by impact:
   - Critical: Missing alt text, heading order
   - Important: Color contrast, ARIA errors
   - Nice to have: Optimizations
3. **Fix in MkDocs theme** or page frontmatter
4. **Re-run Lighthouse** to verify fixes

### Theme-Specific Checks

#### mkdocs-shadcn Theme
- Check if theme has built-in accessibility features
- Verify theme CSS doesn't override accessible defaults
- Test keyboard navigation through all interactive elements

### Documentation

Create `accessibility-audit-report.json`:
```json
{
  "timestamp": "YYYY-MM-DDTHH:MM:SSZ",
  "pages_tested": [
    {
      "url": "/",
      "accessibility_score": 95,
      "issues": []
    },
    {
      "url": "/snippets/chain-fillet/",
      "accessibility_score": 92,
      "issues": ["Minor contrast issue on code blocks"]
    }
  ],
  "overall_score": 93,
  "status": "pass",
  "recommendations": []
}
```

---

## Automated Testing Option

For CI/CD integration, consider using Playwright for automated accessibility testing:

```javascript
// tests/docs-migration/accessibility.spec.js
test('homepage meets accessibility standards', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  
  // Use axe-core for automated accessibility testing
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

---

## Sign-off

**Tester**: ___________________  
**Date**: ___________________  
**Chrome Version**: ___________________  
**Firefox Version**: ___________________  
**Safari Version**: ___________________  

**Overall Status**: ☐ PASS  ☐ FAIL  
**Notes**:
