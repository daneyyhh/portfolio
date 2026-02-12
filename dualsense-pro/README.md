# DualSense Pro Website

This is a Next.js project implementing a premium "Scrollytelling" experience for the DualSense Pro controller.

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

    *If you don't have `npm` in your path, ensure Node.js is installed.*

2.  **Add Images:**
    The project expects image sequences for the 3D rotation in `public/images/{variant}/`.
    - `public/images/whitergb/` (1.webp to 120.webp)
    - `public/images/blackpro/` (1.webp to 120.webp)
    - `public/images/pulseelite/` (1.webp to 120.webp)

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

4.  **Build for Production:**
    ```bash
    npm run build
    ```
    The output will be in the `out` directory (static export).

## Features
- **Scrollytelling:** 3D product rotation controlled by scroll.
- **Framer Motion:** Smooth transitions and reveals.
- **Tailwind CSS:** Styling.
- **TypeScript:** Type safety.

## Architecture
- `components/ProductControllerScroll.tsx`: Handles the canvas and image sequence.
- `app/page.tsx`: Orchestrates the product state and transitions.
- `data/products.ts`: Contains all product data and text.
