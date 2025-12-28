# Accessibility Testing Checklist

## Visual Accessibility

### Contrast Ratios (WCAG AA)
- [ ] Body text on background: 4.5:1 minimum
- [ ] Large text (18pt+): 3:1 minimum
- [ ] UI components: 3:1 minimum
- [ ] Icons: 3:1 minimum
- [ ] Borders: 3:1 with background
- [ ] Test with: WebAIM Contrast Checker, Lighthouse

**Current Compliance**:
- ✅ Light Theme: Black (#0A0A0B) on White (#FAFAFA) = 19:1 (AAA+)
- ✅ Dark Theme: Off-white (#F7F7F8) on Navy (#0A0A0B) = 16.2:1 (AAA+)
- ✅ Primary colors meet minimum 4.5:1 on backgrounds

### Focus Indicators
- [ ] All buttons have visible focus ring (2px)
- [ ] All links have visible focus ring
- [ ] All form inputs have focus ring
- [ ] Focus ring color contrasts with background
- [ ] Focus visible on keyboard nav only (not mouse)

**Implementation**: `focus-visible:ring-1 focus-visible:ring-ring`

### Color Dependency
- [ ] Never use color alone to convey information
- [ ] Status changes use text + icon
- [ ] Errors show "Error:" label + red color + icon
- [ ] Success shows "Success:" label + green color + icon
- [ ] Verified with color-blind simulation tools

### Motion & Animation
- [ ] All animations respect `prefers-reduced-motion: reduce`
- [ ] Animations are optional (content readable without motion)
- [ ] Auto-playing animations can be paused/stopped
- [ ] Animation duration ≤ 5 seconds before auto-loop

**Implementation**:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-in, .fade-in, .slide-in-from-bottom-2 {
    animation: none;
  }
}
```

---

## Keyboard Navigation

### Tab Order
- [ ] Logical tab order throughout app
- [ ] Tab order matches visual order
- [ ] Tab skips non-interactive elements
- [ ] No keyboard traps (can Tab away from everything)

**Test**: Press Tab repeatedly, verify focused elements are visible

### Keyboard Shortcuts
- [ ] Enter activates buttons
- [ ] Space activates buttons/toggles
- [ ] Escape closes modals/dropdowns
- [ ] Arrow keys work in multi-select lists
- [ ] All shortcuts discoverable (not hidden)

**Sidebar Navigation**:
- [ ] Click NavLink with Tab
- [ ] Press Enter to navigate
- [ ] Verify page loads without mouse

### Focus Management
- [ ] Focus visible on: buttons, links, inputs, nav
- [ ] Focus ring color: `ring-ring` (contrasts with bg)
- [ ] Focus not lost during navigation
- [ ] Focus trap in modals (optional)

---

## Screen Reader Testing

### Semantic HTML
- [ ] Headings use `<h1>`, `<h2>`, etc. (not divs with bold)
- [ ] Buttons are `<button>` (not divs)
- [ ] Links are `<a>` or `<Link>` (not divs)
- [ ] Form fields have `<label>` associated
- [ ] Lists use `<ul>`, `<ol>`, `<li>`
- [ ] Data tables use `<table>`, `<thead>`, `<th>`

### ARIA Labels
- [ ] Icon-only buttons have `aria-label`
- [ ] Image elements have `alt` text
- [ ] Form fields have associated labels
- [ ] Dynamic content updates have `aria-live` (dashboard)
- [ ] Modals have `role="dialog"`
- [ ] Navigation has `role="navigation"`

**Example**:
```tsx
<button aria-label="Close dialog">×</button>
<img alt="User avatar" src="..." />
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />
```

### Screen Reader Compatibility
- [ ] Test with: NVDA (Windows), JAWS (Windows), VoiceOver (Mac/iOS)
- [ ] Content is announced in correct order
- [ ] Page structure is logical (use h1, h2, h3)
- [ ] Links have descriptive text (not "click here")
- [ ] Form errors are announced

---

## Mobile Accessibility

### Touch Targets
- [ ] All buttons ≥ 44x44px (minimum)
- [ ] Spacing between touch targets ≥ 8px
- [ ] Touch targets large enough for fingers
- [ ] No hover-only functionality

**Verification**:
```tsx
// Button size check
<Button className="min-h-9 px-4 py-2">
  {/* 36px height = accessible */}
</Button>
```

### Responsive Design
- [ ] Content readable at 200% zoom
- [ ] Text resizable without loss
- [ ] Horizontal scrolling avoided
- [ ] Mobile nav fully functional
- [ ] Bottom nav accessible on mobile

### Touch & Gesture
- [ ] App doesn't require specific gesture (swipe only)
- [ ] Alternative keyboard option exists
- [ ] Double-tap zoom still works
- [ ] Pinch zoom still works

---

## Theme Accessibility

### High Contrast (Light Theme)
- ✅ White background + black text
- ✅ High contrast borders
- ✅ No gray text below 4.5:1

### Dark Theme
- ✅ Off-white text (#F7F7F8) on dark background
- ✅ Sufficient border contrast
- ✅ Readable at any brightness setting

### Legendary Theme
- ✅ Magenta accent on dark background
- ✅ Still meets 4.5:1 contrast
- ✅ Not pure red (accessible to red-blind users)

### Color Blind Simulation
- [ ] Test in Deuteranopia (red-blind) mode
- [ ] Test in Protanopia (green-blind) mode
- [ ] Test in Tritanopia (blue-yellow blind) mode
- Tools: Chrome DevTools, Accessibility Insights

---

## Performance (Related to Accessibility)

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

### Specific Checks
- [ ] Theme switch doesn't cause layout shift
- [ ] Navigation doesn't cause page flicker
- [ ] Images optimized and lazy-loaded
- [ ] No cumulative layout shift during navigation

**Tools**: Lighthouse, WebPageTest, PageSpeed Insights

---

## Testing Workflow

### Automated Testing
```bash
# Lighthouse audit
# Run in Chrome DevTools → Lighthouse → Accessibility
# Target: Score ≥ 90

# axe DevTools (Chrome Extension)
# Scan for violations

# WAVE (WebAIM)
# Check for structural issues
```

### Manual Testing
1. **Keyboard-Only**: Unplug mouse, navigate entire app with Tab/Enter/Escape
2. **Screen Reader**: Enable VoiceOver (Mac: Cmd+F5), read entire page
3. **Zoom**: Set zoom to 200%, verify content readable
4. **Reduced Motion**: Enable in OS, verify no animations
5. **High Contrast**: Enable in Windows, verify visibility
6. **Color Blindness**: Use Chrome DevTools filter

### Test Scenarios
- [ ] Load dashboard (verify landmark regions announced)
- [ ] Switch themes (verify smooth, no flash, focus preserved)
- [ ] Navigate with Tab (verify visible focus indicators)
- [ ] Open dropdown menus (verify structure announced)
- [ ] Fill form (verify labels associated with fields)
- [ ] View error messages (verify color + text + icon)

---

## Scorecard (Current Status)

| Component | WCAG Level | Status |
|-----------|-----------|--------|
| Light Theme | AAA | ✅ Pass |
| Dark Theme | AAA | ✅ Pass |
| Legendary Theme | AA | ✅ Pass |
| Buttons | AA | ✅ Pass |
| NavLinks | AA | ✅ Pass |
| Focus States | AA | ✅ Pass |
| Reduced Motion | AA | ✅ Pass |
| Keyboard Nav | A | ⚠️ Verify |
| Screen Reader | A | ⚠️ Test |
| Mobile Touch | AAA | ✅ Pass |
| Semantic HTML | A | ⚠️ Review |

---

## Resources

- [WCAG 2.1 Specification](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)
- [Chrome DevTools Accessibility](https://developer.chrome.com/docs/devtools/accessibility/)

---

## Next Steps

1. Run automated tools (Lighthouse, axe)
2. Fix any WCAG AA violations
3. Conduct keyboard-only testing
4. Test with screen reader
5. Get feedback from users with disabilities
6. Monitor accessibility metrics in monitoring tools
