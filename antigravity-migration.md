# React to Next.js Migration Plan

## Current Stack Analysis
- **Framework**: React 19.2.4 with Vite 6.0.0
- **Animations**: GSAP with ScrollTrigger
- **Smooth Scrolling**: Lenis
- **3D Graphics**: Three.js
- **Structure**: Single-page app with sections

## Migration Strategy

### Phase 1: Project Setup
1. Initialize Next.js 15 with App Router
2. Install required dependencies:
   ```bash
   npm install next@latest react@latest react-dom@latest
   npm install -D @types/node @types/react @types/react-dom typescript
   npm install gsap lenis three
   ```

### Phase 2: File Structure Conversion
```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx           # Home page (current App.jsx)
│   ├── globals.css        # Global styles
│   └── components/
│       ├── layout/
│       │   ├── Header.tsx
│       │   └── Footer.tsx
│       ├── sections/
│       │   ├── Hero.tsx
│       │   ├── About.tsx
│       │   ├── Projects.tsx
│       │   ├── Articles.tsx
│       │   └── Contact.tsx
│       └── ui/
│           └── Particles.tsx
└── lib/
    ├── lenis.ts           # Lenis configuration
    ├── gsap.ts            # GSAP setup
    └── cursor.ts          # Custom cursor logic
```

### Phase 3: Component Conversion Steps

#### 1. Layout Component (app/layout.tsx)
- Convert App.jsx to TypeScript
- Add proper metadata for SEO with domain reubg.in
- Handle GSAP and Lenis initialization
- Ensure SSR compatibility

#### 2. Main Page (app/page.tsx)
- Move Hero section logic from App.jsx
- Convert to client component with 'use client'
- Preserve all animations and interactions

#### 3. Component Conversion Pattern
For each .jsx component:
1. Add TypeScript types
2. Convert to .tsx
3. Add 'use client' directive where needed (GSAP heavy components)
4. Ensure proper imports for Next.js

### Phase 4: Animation Preservation
- GSAP animations require 'use client' directive
- Lenis needs to be client-side only
- Custom cursor logic must be client component
- ScrollTrigger effects need careful SSR handling

### Phase 5: Next.js Optimizations
- Add next/image for images
- Implement proper metadata
- Set up static generation where possible
- Configure next.config.js for animations

## Migration Commands for Antigravity

Copy this prompt into Antigravity's Agent Manager:

```
Execute React to Next.js migration with these specific requirements:

1. CREATE Next.js project structure with App Router
2. CONVERT all .jsx files to .tsx with TypeScript
3. PRESERVE all GSAP animations with proper 'use client' directives
4. MAINTAIN Lenis smooth scrolling functionality
5. KEEP custom cursor implementation
6. SET UP SEO metadata in layout.tsx with domain reubg.in
7. CONFIGURE Vercel deployment for https://reubenbg-portfolio.vercel.app/
8. ADD domain redirect from Vercel URL to reubg.in
9. PRESERVE all current styling and animations
10. ENSURE Three.js 3D effects continue working
11. CONFIGURE next.config.js for animation libraries
12. TEST all scroll triggers and animations work identically

Dependencies to install:
- next@latest
- typescript
- @types/node @types/react @types/react-dom
- Keep existing: gsap, lenis, three

Domain Configuration:
- Primary domain: reubg.in
- Vercel URL: https://reubenbg-portfolio.vercel.app/
- Set up automatic redirect from Vercel URL to custom domain

Key files to convert:
- src/App.jsx → app/page.tsx + app/layout.tsx
- All components/*.jsx → app/components/*.tsx
- src/style.css → app/globals.css

CRITICAL: Ensure no functionality is lost in the migration process.
```

## Validation Checklist
- [ ] All GSAP animations work
- [ ] Lenis smooth scrolling functions
- [ ] Custom cursor behaves identically
- [ ] Three.js 3D effects preserved
- [ ] No hydration errors
- [ ] SEO metadata properly set with reubg.in domain
- [ ] Vercel deployment configured
- [ ] Domain redirect from reubenbg-portfolio.vercel.app to reubg.in
- [ ] Performance metrics maintained