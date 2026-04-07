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

## 📊 Analytics & Tracking Implementation

This project features a robust, privacy-conscious tracking system in `tracker.js`, designed for high-fidelity user attribution and conversion analysis.

### 1. UTM Parameter Capture (Attribution)
The tracker automatically captures and persists UTM parameters throughout the user session:
- **Automatic Capture**: Scans the URL for `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content` upon first load.
- **Persistence**: Stores these values in `localStorage` with a `pbz_` prefix to ensure attribution is maintained even if the user navigates away and returns later without UTMs.
- **Auto-Injection**: Every custom event (like button clicks) automatically includes the stored UTM parameters in its payload for seamless correlation in GA4.

### 2. PageView & Unique Visitor (UV)
- **Standard PV**: Fires a `page_view` event with page title and path.
- **Custom UV**: Generates a unique `pbz_uv_token` for new visitors and fires a `custom_unique_visit` event.
- **Returning Logic**: Identifies returning users to avoid inflating unique visitor counts.

### 3. Behavioral Tracking (Discord Conversions)
Every Discord-related call-to-action (CTA) is tracked with specific metadata:
- **Event Name**: `join_discord_click`
- **Parameters**: 
    - `button_id`: Distinguishes between the primary hero button (`discord-join-btn`) and the secondary guide button (`secondary-discord-join-btn`).
    - `destination_url`: The specific Discord invite link used.
    - All active UTM parameters.

> *Note: Events are dispatched via standard `gtag` dataLayer pushes. Since the Discord link opens in a new tab (`target="_blank"`), the browser ensures the event is sent successfully.*

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
