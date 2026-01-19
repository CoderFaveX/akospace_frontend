# Hero Components Structure

## 📁 File Organization

```
hero-components/
├── Hero.tsx                    # Main container component
├── HeroBackground.tsx          # Background image & overlay
├── HeroText.tsx               # Large "Akospace" text
├── HeroTagline.tsx            # "Where Ideas Meet Opportunity"
├── ScrollIndicator.tsx        # Scroll down button
├── HeroContent.tsx            # Main content (left & right sections)
├── PulseSection.tsx           # Trending cards with infinite scroll
├── useHeroAnimations.ts       # All GSAP animations
└── index.ts                   # Export barrel
```

## 🎯 Component Breakdown

### **Hero.tsx** (Main Component)
- Manages all refs
- Coordinates sub-components
- Handles scroll logic
- Entry point for the entire hero section

### **HeroBackground.tsx**
- Background image
- Dark overlay that fades in

### **HeroText.tsx**
- Large "Akospace" text
- Scales from 300vw to 5rem
- Fades and moves up

### **HeroTagline.tsx**
- "Where Ideas Meet Opportunity"
- Gradient text
- Bouncy entrance with elastic easing

### **ScrollIndicator.tsx**
- Floating scroll button
- Text changes to "Keep Scrolling"
- Bounce animation

### **HeroContent.tsx**
- **Left side**: Badge, heading, description, buttons, avatars
- **Right side**: Image, floating pitch card
- Slides in from left/right

### **PulseSection.tsx**
- Header with "The Pulse" title
- Infinite scrolling cards
- Trending content display

### **useHeroAnimations.ts** (Custom Hook)
- Main timeline animation
- Content fade in/out
- Pulse section entrance
- Infinite scroll
- Card bounce effects
- Description split text
- Avatar animations

## 🚀 Usage

```tsx
// Simple import
import { Hero } from './components/hero-components';

function App() {
  return (
    <div>
      <Hero />
      {/* Rest of your app */}
    </div>
  );
}
```

## 🔧 Customization

### Modify Animation Timing
Edit `useHeroAnimations.ts`:
```typescript
end: "+=300%",  // Change scroll distance
stagger: 0.08,   // Change stagger timing
```

### Update Content
Edit respective component files:
- `HeroContent.tsx` - Change text, buttons, images
- `PulseSection.tsx` - Update trending cards
- `HeroTagline.tsx` - Change tagline text

### Adjust Styling
Each component uses Tailwind classes. Update directly in component files.

## 📦 Dependencies

- React
- GSAP + ScrollTrigger + TextPlugin + SplitText
- @gsap/react
- FontAwesome icons
- Tailwind CSS

## 🎨 Key Features

✅ Modular component structure
✅ Separated animation logic
✅ Type-safe with TypeScript
✅ Easy to maintain and extend
✅ Professional GSAP animations
✅ Infinite scroll for pulse cards
✅ Responsive design
✅ Clean code organization
