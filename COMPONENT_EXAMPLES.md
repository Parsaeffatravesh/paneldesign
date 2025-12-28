# Component Examples with Smooth Transitions

## 1. Sidebar NavLink with Animated Active Indicator

```tsx
// client/src/components/layout/Sidebar.tsx
<NavLink
  to={item.href}
  className={cn(
    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium",
    "transition-all duration-200 group",  // Smooth transition
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" 
      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
  )}
>
  <Icon className={cn(
    "h-5 w-5",
    isActive ? "stroke-[2.5px]" : "stroke-[1.5px] group-hover:stroke-[2px]"
  )} />
  {item.label}
</NavLink>

/* CSS Transitions:
   - background-color: 200ms ease
   - text-color: 200ms ease
   - stroke-width: 200ms ease (via class)
   - shadow: 200ms ease
*/
```

## 2. Button with Smooth Interaction

```tsx
// client/src/components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium " +
  "transition-colors duration-200 " +  // Smooth color transitions
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring " +
  "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border border-primary-border",
        outline: "border shadow-xs active:shadow-none",
        ghost: "border border-transparent",
      },
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
  }
);

/* Example Usage:
   <Button variant="default" size="default">
     Click Me
   </Button>
   
   States:
   - Default: Solid background
   - Hover: Subtle opacity change (no scale, no shadow jump)
   - Active: Lighter shade (transition-colors)
   - Focus: Visible 1px ring
   - Disabled: Reduced opacity
*/
```

## 3. Card with Soft Shadow (No Gradient)

```tsx
// client/src/components/ui/card.tsx
<Card className="border border-border/60 shadow-sm">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Winnings</CardTitle>
    <span className="text-muted-foreground font-sans text-xs">$</span>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">$12,340</div>
    <p className="text-xs text-muted-foreground mt-1 flex items-center text-green-600">
      <TrendingUp className="h-3 w-3 mr-1" />
      +2.5% from last month
    </p>
  </CardContent>
</Card>

/* CSS:
   - Background: Flat color (no gradient)
   - Border: border-border/60 (60% opacity for subtlety)
   - Shadow: shadow-sm only (6px blur, no elevation)
   - Transition: None on hover (not interactive)
   
   Output:
   - Light theme: White card with light border
   - Dark theme: Dark gray card with subtle border
   - Legendary: Dark gray with magenta accent border option
*/
```

## 4. Theme Switcher with Smooth Transition

```tsx
// client/src/components/ThemeSwitcher.tsx
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: Theme) => {
    // useTheme hook handles smooth transition:
    // 1. Adds .theme-transition class
    // 2. Updates CSS variables
    // 3. Removes .theme-transition after 350ms
    setTheme(newTheme);
  };

  return (
    <div className="space-y-2">
      {['light', 'dark', 'legendary'].map(t => (
        <button
          key={t}
          onClick={() => handleThemeChange(t as Theme)}
          className={cn(
            "w-full px-3 py-2 rounded-md text-sm font-medium",
            "transition-all duration-200",
            theme === t 
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
          )}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}

/* Flow:
   1. User clicks theme button
   2. setTheme() is called
   3. .theme-transition class is added to :root
   4. CSS variables are updated immediately
   5. Colors fade smoothly over 300ms
   6. .theme-transition class is removed after 350ms
   7. No flashing, no layout shift
*/
```

## 5. Bottom Nav with Smooth Active State

```tsx
// client/src/components/layout/BottomNav.tsx
<NavLink
  to={item.href}
  className={cn(
    "flex flex-col items-center justify-center w-full h-full space-y-1",
    "transition-colors duration-200",  // Smooth color transition
    "cursor-pointer",
    isActive 
      ? "text-primary" 
      : "text-muted-foreground hover:text-foreground"
  )}
>
  <Icon className={cn(
    "h-6 w-6",
    isActive && "stroke-[2.5px]"  // Heavier stroke on active
  )} />
  <span className="text-[10px] font-medium">{item.label}</span>
</NavLink>

/* Mobile Navigation States:
   - Default: Muted gray text
   - Hover: Foreground color (smooth fade)
   - Active: Primary color (blue/magenta depending on theme)
   - Icon stroke: Thicker on active (2.5px vs 2px)
*/
```

---

## CSS Classes Reference

### Transition Classes (in index.css)
```css
.theme-transition {
  /* Applied during theme switch for 350ms */
  transition: 
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Tailwind Applied Classes
- `transition-all duration-200` - Quick interactions (buttons, nav)
- `transition-colors duration-200` - Color changes (text, background)
- `focus-visible:ring-1 focus-visible:ring-ring` - Focus states
- `disabled:opacity-50` - Disabled states
- `hover:bg-sidebar-accent/50` - Subtle hover (no jump)
- `shadow-sm` - Soft shadows on cards
- `border-border/60` - Subtle borders

---

## Testing These Components

1. **Theme Switch**: Click theme switcher, observe smooth color transition (no flash)
2. **Button Interaction**: Hover/click buttons, verify smooth feedback
3. **NavLink Active**: Click nav items, verify active indicator fades in
4. **Reduced Motion**: Enable `prefers-reduced-motion: reduce`, verify no animations
5. **Focus States**: Tab through components, verify visible focus ring
6. **Contrast**: Use Lighthouse to verify WCAG AA compliance

---

## Performance Notes

- All transitions use GPU-accelerated properties (color, background-color, opacity)
- No layout shifts during theme switch (CSS variables only)
- Sidebar NavLinks use class-based styling (no inline styles)
- Cards use flat colors only (no computed gradients)
- Prefers-reduced-motion support built-in
