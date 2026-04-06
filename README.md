# Phantom Blade Zero - Official Community Landing Page

A high-conversion, premium advertising landing page designed to route users into the official Phantom Blade Zero Discord community. 

Built with an emphasis on performance, extreme visual fidelity, and robust user tracking, this project uses a lightweight vanilla web stack (HTML/CSS/JS) bundled with Vite.

## 🌟 Project Architecture & Tech Stack

- **Core Tech**: Vanilla HTML5, CSS3, ES6 JavaScript
- **Build Tool**: [Vite](https://vitejs.dev/) (for fast HMR during development and highly optimized static production builds)
- **Styling**: Pure CSS with advanced visual techniques (CSS Grid/Flexbox, backdrop-filtering, radial gradient masking, CSS keyframe animations)
- **Tracking**: Modular Google Analytics 4 (GA4) implementation (`tracker.js`)

## 📁 File Structure

```text
├── public/                 # Static assets like images (e.g. bg.webp)
├── index.html              # Main HTML entry point (semantic structure)
├── main.js                 # JS Entry: DOM bindings and event listeners
├── tracker.js              # GA4 Analytics wrapper module (PV, UV, Events)
├── style.css               # Comprehensive cinematic stylesheet
├── package.json            # Project dependencies and Vite scripts
├── vite.config.js          # Vite configuration for deployment compatibility
└── README.md
```

## 🎨 Visual Design Strategy

The styling strictly adheres to the dark, cinematic, and premium Wuxia aesthetic of Phantom Blade Zero. 
Instead of relying on heavy raster graphics, the project utilizes native CSS properties to create a lightweight but immersive atmosphere:
- **Atmospheric Depth:** Uses `radial-gradient` masks and `backdrop-filter: blur()` overlays to push the background game art backward and bring the text layer forward.
- **Micro-Animations:** Implements continuous breathing animations (`pulseGlow`), subtle metallic shines on buttons (`shimmer`), and crisp transition delays for hover states.
- **Responsive Fluidity:** CSS `clamp()` formatting, percentage-based containers, and mobile-specific media queries (`@media (max-width: 768px)`) ensure strict alignment and spacing reduction on mobile devices.

## 📊 Analytics Implementation (`tracker.js`)

A dedicated object-oriented module handles web analytics cleanly without polluting the main business logic:
1. **PageView & Unique Visitor (UV):** Fires a `page_view` immediately. It also drops a `pbz_uv_token` inside the browser's `localStorage` to simulate or support first-visit tokenization.
2. **Behavioral Tracking (Global Catch-all):** Dynamically mounts listeners to any anchor tag referencing `discord.gg`. It captures the ID of the specific button clicked to separate primary vs. secondary CTA conversions before successfully dispatching the `join_discord_click` event.
   > *Note: Because the CTA opens in a new tab (`target="_blank"`), the `gtag` dataLayer push executes safely without the browser terminating the request prematurely.*

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)

### Installation & Execution

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run local development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```
   *The optimized static output will be generated inside the `/dist` directory.*

## ☁️ Deployment Notes

- **Cloudflare Pages / Workers**: The included base `vite.config.js` is intentionally provided to satisfy `wrangler`'s automated CI/CD injection requirements. Without it, Cloudflare deployments may fail with a config error.

## 💡 Pre-Launch Checklist

Before pushing heavy traffic to this page, ensure you complete the following:
- [ ] **GA4 Configuration:** Open `tracker.js` and replace `G-XXXXXXXXXX` with the official Google Analytics 4 Measurement ID.
- [ ] **SEO Validation:** Double-check that the configured OpenGraph and Twitter Card metadata headers in `index.html` render as intended on Discord/Twitter link scrapers.
