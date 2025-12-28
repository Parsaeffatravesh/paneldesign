# Tralent Design System v1.0

## Design Philosophy
Minimalist, performance-focused design with smooth interactions and accessibility at the core. 
- **Flat colors** with subtle shadows for depth
- **Smooth transitions** on all interactive elements
- **Respects motion preferences** (prefers-reduced-motion)
- **WCAG AA contrast compliance**

---

## Token System

### Color Tokens

#### Light Theme (default)
- **Primary**: `240 5.9% 10%` (Dark Gray - Actions)
- **Accent**: `240 5.9% 10%` (Dark Gray)
- **Background**: `60 9.1% 97.8%` (Light Cream)
- **Foreground**: `240 10% 3.9%` (Near Black)
- **Card**: `0 0% 100%` (Pure White)
- **Border**: `240 5.9% 90%` (Light Gray)
- **Muted**: `240 4.8% 95.9%` (Gray)

#### Dark Theme
- **Primary**: `220 90% 56%` (Vibrant Blue)
- **Accent**: `220 90% 56%` (Vibrant Blue)
- **Background**: `240 10% 3.9%` (Deep Navy)
- **Foreground**: `60 9.1% 97.8%` (Off-White)
- **Card**: `240 10% 9.8%` (Dark Gray)
- **Border**: `215 27.9% 16.9%` (Dark Border)
- **Muted**: `215 16.3% 46.9%` (Medium Gray)

#### Legendary Theme (Premium)
- **Primary**: `340 82% 52%` (Magenta)
- **Accent**: `340 82% 52%` (Magenta)
- **Background**: `240 10% 3.9%` (Deep Navy)
- **Foreground**: `60 9.1% 97.8%` (Off-White)
- **Card**: `240 10% 9.8%` (Dark Gray)
- **Border**: `215 27.9% 16.9%` (Dark Border)

### Typography

**Font Family**: Plus Jakarta Sans, fallback Inter
- **Display**: `font-bold text-3xl tracking-tight`
- **Heading**: `font-bold text-2xl`
- **Subheading**: `font-semibold text-lg`
- **Body**: `font-medium text-sm`
- **Caption**: `font-medium text-xs`

### Spacing Scale

- `2px` - xs
- `4px` - sm  
- `8px` - md
- `12px` - lg
- `16px` - xl
- `24px` - 2xl
- `32px` - 3xl

### Durations (all animations)

- **Quick**: `0.15s` (state changes, focus)
- **Standard**: `0.2s` (button press, fade)
- **Smooth**: `0.3s` (theme switch, transitions)
- **Slow**: `0.5s` (modals, page transitions)

**Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out for theme)

---

## Components

### Button
```tsx
// Smooth interaction
<Button className="transition-all duration-200">
  Click me
</Button>

// On click: scale 0.95 active state, no persistent hover
// Focus: visible ring with 1px border
```

### NavLink (Sidebar)
```tsx
// Active state with smooth indicator
<NavLink 
  to="/dashboard"
  className="transition-all duration-200"
>
  Dashboard
</NavLink>

// Active: background color fade-in + stroke weight increase
// Hover: subtle background color lift
// Respects reduced-motion
```

### Card
```tsx
// Flat color with soft shadow
<Card className="border border-border/60 shadow-sm">
  {/* No gradients, pure flat color */}
</Card>
```

---

## Theme Switching (Smooth)

### CSS Setup
```css
:root {
  transition: background-color 0.3s ease-out, color 0.3s ease-out;
}

.theme-transition {
  transition: 
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### React Hook (useTheme.ts)
- Adds `theme-transition` class for 350ms during switch
- Removes `theme-transition` after duration to prevent unintended transitions
- Updates `data-theme` attribute and localStorage
- Theme applies immediately, colors transition smoothly

---

## Accessibility Requirements

✅ **Contrast**: All text meets WCAG AA standard (4.5:1 min)
✅ **Focus States**: Visible 2px ring focus on all interactive elements
✅ **Reduced Motion**: `prefers-reduced-motion: reduce` disables all animations
✅ **Keyboard Nav**: All links/buttons fully keyboard accessible
✅ **Color**: Never rely on color alone; use icons + text
✅ **ARIA**: Proper semantic HTML, ARIA labels where needed

### Testing Checklist
- [ ] Test with `prefers-reduced-motion: reduce` enabled
- [ ] Check contrast with Lighthouse/WebAIM
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Verify screen reader compatibility
- [ ] Test on mobile and desktop
- [ ] Verify theme switcher doesn't flash

---

## Gradient Usage (Minimal)

Gradients are **optional overlays only**:
- Background gradients: **AVOID**
- Card gradients: **AVOID**
- Accent overlays: OK (10-20% opacity)
- Use `background: linear-gradient(135deg, rgba(var(--primary), 0.1), transparent)`

---

## Performance Guidelines

- No backdrop-filter on non-critical elements
- Use `will-change: transform` sparingly on animated elements
- Preload pages with React.lazy + Suspense
- CSS variables update atomically (no repaints)
- Sidebar fixed positioning optimized

---

## File References

- **Colors**: `client/src/index.css` (lines 65-242)
- **Transitions**: `client/src/index.css` (lines 145-152)
- **Theme Logic**: `client/src/hooks/useTheme.ts`
- **Component Examples**: Sidebar, Button, Card in `client/src/components`

---

## Next Steps

1. ✅ Implement smooth theme switching with `theme-transition` class
2. ✅ Add focus states to buttons and nav links
3. ✅ Test reduced-motion support
4. ✅ Verify contrast ratios on all text
5. ✅ Profile performance (no jank on theme switch)
