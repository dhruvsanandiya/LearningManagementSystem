# LMS Pro - Styling & Branding Guide

## Overview

This guide covers the comprehensive styling system implemented for LMS Pro, including design tokens, components, and theming capabilities.

## Design System

### Color Palette

#### Primary Colors (Blue)
- **50**: `#f0f9ff` - Lightest blue
- **100**: `#e0f2fe` - Very light blue
- **200**: `#bae6fd` - Light blue
- **300**: `#7dd3fc` - Medium light blue
- **400**: `#38bdf8` - Medium blue
- **500**: `#0ea5e9` - Base blue (primary)
- **600**: `#0284c7` - Dark blue
- **700**: `#0369a1` - Darker blue
- **800**: `#075985` - Very dark blue
- **900**: `#0c4a6e` - Darkest blue
- **950**: `#082f49` - Ultra dark blue

#### Secondary Colors (Purple)
- **50**: `#faf5ff` - Lightest purple
- **500**: `#a855f7` - Base purple (secondary)
- **900**: `#581c87` - Darkest purple

#### Semantic Colors
- **Success**: Green palette for positive actions
- **Warning**: Yellow/Orange palette for caution
- **Error**: Red palette for errors and destructive actions
- **Neutral**: Gray palette for text and backgrounds

### Typography

#### Font Families
- **Display**: Poppins (headings, titles)
- **Body**: Inter (body text, UI elements)
- **Mono**: JetBrains Mono (code, technical content)

#### Font Sizes
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)

### Spacing Scale

- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

### Border Radius

- **sm**: 0.375rem (6px)
- **md**: 0.5rem (8px)
- **lg**: 0.75rem (12px)
- **xl**: 1rem (16px)
- **2xl**: 1.5rem (24px)
- **3xl**: 2rem (32px)

### Shadows

- **soft**: Subtle shadow for cards and subtle elevation
- **medium**: Medium shadow for modals and elevated elements
- **large**: Strong shadow for prominent elements
- **glow**: Glowing effect for primary elements
- **glow-lg**: Large glowing effect for hero elements

## Component Styles

### Buttons

#### Variants
- **primary**: Blue gradient with white text
- **secondary**: Purple gradient with white text
- **success**: Green gradient with white text
- **warning**: Yellow gradient with white text
- **error**: Red gradient with white text
- **outline**: Transparent with colored border
- **ghost**: Transparent with colored text
- **link**: Text-only with underline on hover

#### Sizes
- **xs**: Extra small (8px padding)
- **sm**: Small (12px padding)
- **md**: Medium (16px padding)
- **lg**: Large (24px padding)
- **xl**: Extra large (32px padding)

### Input Fields

#### Base Styles
- Rounded corners (xl)
- Focus ring with primary color
- Smooth transitions
- Dark mode support

#### States
- **Default**: Gray border
- **Focus**: Primary color ring and border
- **Error**: Red border and ring
- **Disabled**: Reduced opacity

### Cards

#### Base Card
- White background (dark mode: gray-800)
- Rounded corners (2xl)
- Soft shadow
- Border for definition

#### Card Hover
- Lifted shadow on hover
- Subtle upward movement
- Smooth transitions

## Theming

### Light Theme (Default)
- Background: White
- Text: Dark gray
- Borders: Light gray
- Accents: Primary blue

### Dark Theme
- Background: Dark slate
- Text: Light gray
- Borders: Medium gray
- Accents: Lighter blue

### Theme Toggle
- Smooth transitions between themes
- Persistent theme selection
- System preference detection

## Animations

### Built-in Animations
- **fade-in**: Smooth opacity transition
- **slide-up**: Slide up with fade
- **slide-down**: Slide down with fade
- **scale-in**: Scale up with fade
- **bounce-gentle**: Subtle bounce effect
- **pulse-soft**: Gentle pulsing effect

### Usage
```jsx
<div className="animate-fade-in">
  Content with fade-in animation
</div>
```

## Gradients

### Available Gradients
- **gradient-primary**: Blue gradient
- **gradient-secondary**: Purple gradient
- **gradient-hero**: Multi-color hero gradient
- **gradient-success**: Green gradient
- **gradient-warning**: Yellow gradient
- **gradient-error**: Red gradient

### Usage
```jsx
<div className="gradient-primary">
  Content with primary gradient background
</div>
```

## Utility Classes

### Glass Morphism
```jsx
<div className="glass">
  Glass morphism effect
</div>
```

### Status Indicators
```jsx
<div className="status-success">Success message</div>
<div className="status-warning">Warning message</div>
<div className="status-error">Error message</div>
```

### Loading Spinner
```jsx
<div className="spinner w-5 h-5"></div>
```

## Responsive Design

### Breakpoints
- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactive elements

## Accessibility

### Focus Management
- Visible focus indicators
- Keyboard navigation support
- Screen reader compatibility

### Color Contrast
- WCAG AA compliant color combinations
- High contrast mode support
- Color-blind friendly palette

## Usage Examples

### Creating a Card
```jsx
<div className="card card-hover">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-gray-600 dark:text-gray-300">Card content</p>
  <Button variant="primary" size="md">Action</Button>
</div>
```

### Creating a Form
```jsx
<form className="space-y-6">
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Email Address
    </label>
    <input
      type="email"
      className="input-field"
      placeholder="Enter your email"
    />
  </div>
  <Button type="submit" variant="primary" className="w-full">
    Submit
  </Button>
</form>
```

### Using Theme Toggle
```jsx
import ThemeToggle from './components/common/ThemeToggle';

<ThemeToggle className="ml-auto" />
```

## Brand Assets

### Logo Usage
- Primary: Blue gradient with white text
- Secondary: White with blue gradient background
- Monochrome: Single color variants

### Color Combinations
- Primary + White: High contrast
- Primary + Light Blue: Subtle contrast
- Secondary + White: Accent usage
- Neutral + Primary: Balanced design

## Best Practices

1. **Consistency**: Use the design system consistently across all components
2. **Accessibility**: Always consider accessibility when implementing styles
3. **Performance**: Use CSS custom properties for theming
4. **Responsive**: Design mobile-first, then enhance for larger screens
5. **Dark Mode**: Always provide dark mode alternatives
6. **Animations**: Use subtle animations that enhance UX without being distracting

## File Structure

```
src/
├── assets/
│   └── brand.js              # Brand configuration
├── components/
│   └── common/
│       ├── Button.jsx        # Enhanced button component
│       └── ThemeToggle.jsx   # Theme switching component
├── contexts/
│   └── ThemeContext.jsx      # Theme management
├── index.css                 # Global styles and utilities
└── tailwind.config.js        # Tailwind configuration
```

This styling system provides a solid foundation for building a modern, accessible, and visually appealing learning management system.
