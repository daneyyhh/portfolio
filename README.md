# Cinematic Architecture & Spider-Verse Portfolio

> "Awwwards-grade digital storytelling experience blending cinematic architecture, Spider-Verse aesthetics, and high-performance engineering."

An immersive, futuristic digital portfolio built to showcase development projects, technical certifications, and design capabilities. The experience seamlessly integrates a premium "Bone White and Charcoal" minimal aesthetic with advanced GSAP-driven scroll animations, glitchy tech-HUD elements, and a custom radioactive spider cursor.

## 🌟 Key Features

- **Cinematic Storytelling**: Fluid, high-performance scroll-based storytelling powered by Lenis and GSAP.
- **Spider-Verse Aesthetics**: Immersive comic-book bursts, glitch-heavy text, and a highly responsive radioactive spider custom cursor.
- **Architecture Archive**: A dynamically rendered, tabbed horizontal scrolling system categorized into Projects, Certificates, and Tools featuring real-world credentials.
- **Premium UI/UX**: Glassmorphism, tailored typography (Bangers, Monospace), and mathematically-generated blueprint grid backgrounds.
- **High-Performance**: Fully optimized component rendering with Vite, React, and Framer Motion.

## 🛠 Tech Stack

- **Core Framework**: React (Vite)
- **Styling**: Tailwind CSS, Vanilla CSS (Custom Keyframes)
- **Animation Engine**: Framer Motion, GSAP
- **Scroll Hijacking**: Lenis (Smooth Scroll)
- **Icons & Assets**: Lucide React, Devicons

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/daneyyhh/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```

## 📦 Deployment to Hostinger

This portfolio is fully configured for hosting on **Hostinger** (with Apache `.htaccess` rewrite rules for client-side routing & caching).

### Method 1: Automatic Deployment on `git push` (GitHub Actions)
Pushes to the `main` branch automatically build and sync production files directly to Hostinger's `public_html`.
1. Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Add the following secrets from your Hostinger hPanel (*Files* -> *FTP Accounts*):
   - `FTP_SERVER`: Your Hostinger FTP Hostname or IP.
   - `FTP_USERNAME`: Your Hostinger FTP Username.
   - `FTP_PASSWORD`: Your Hostinger FTP Password.

### Method 2: Instant 1-Command Local Deploy
Run the deploy command locally to build and upload directly:
```bash
npm run deploy
```
*(Add `HOSTINGER_FTP_HOST`, `HOSTINGER_FTP_USER`, and `HOSTINGER_FTP_PASSWORD` to your `.env` file)*

### Method 3: Direct File Manager Upload
1. Generate the optimized deployment bundle:
   ```bash
   npm run zip
   ```
2. Upload and extract `dist.zip` into Hostinger's `public_html` directory via [Hostinger hPanel](https://hpanel.hostinger.com).

---
*Architected and Built by [daneyyhh](https://github.com/daneyyhh)*
