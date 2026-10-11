# 🏎️ ItzFizz — Scroll-Driven Hero Section Animation

> A high-performance, scroll-driven interactive hero section inspired by supercar motion design, engineered with **React**, **GSAP ScrollTrigger**, and **Tailwind CSS**.

---

## 🔗 Submission Links

- **Live Demo Webpage:** `[Your GitHub Pages URL will go here]` *(e.g. `https://<your-username>.github.io/ItzFizz/`)*
- **GitHub Repository:** `[Your GitHub Repository URL will go here]` *(e.g. `https://github.com/<your-username>/ItzFizz`)*

*(Follow the [Hosting & Deployment](#-hosting--deployment-instructions) section below to publish your live URL in 2 minutes!)*

---

## 🎯 Assignment Objective & Requirements Compliance

This project recreates and elevates the reference demo ([car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)), focusing on motion quality, 60 FPS performance, and smooth interaction logic.

| Functional Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **1. Hero Section Layout** | Occupies the first screen (100vh above the fold). Displays letter-spaced headline `W E L C O M E   I T Z F I Z Z` on a single balanced line, with 4 impact metric cards directly below. | ✅ Complete |
| **2. Initial Load Animation** | Smooth staggered entrance for headline letters with upward drift and blur clearing. Statistics cards animate in sequentially with subtle delay and easing. | ✅ Complete |
| **3. Scroll-Based Animation** | The McLaren supercar glides across the asphalt track strictly tied to scroll progress. Glowing neon trail follows the car in real-time. Letters ignite dynamically into radiant lime glow upon vehicle collision. | ✅ Complete |
| **4. Motion & Performance** | Pure GPU-composited CSS transforms (`translate3d`, `will-change: transform`). GSAP `scrub: 1.0` inertia dampening. Pre-calculated letter collision geometry preventing layout reflows (CLS = 0.00). | ✅ Complete |
| **5. Mandatory Tech Stack** | HTML5, CSS, JavaScript (ES6+), GSAP (ScrollTrigger), React.js (Vite), and Tailwind CSS. | ✅ Complete |

---

## ✨ Features & Enhancements

- 🏎️ **Top-Down McLaren 720S Supercar:** Smoothly responsive to page scroll with dynamic headlight beams and afterburner exhaust effects.
- 💡 **Dynamic Letter Ignition Engine:** Each letter of `WELCOME ITZFIZZ` illuminates with high-intensity neon glow when the supercar's front axle passes its coordinates.
- 📊 **Reactive Impact Metric Cards:** Glassmorphic metric cards that enter smoothly on load and light up with sector milestone indicators as the car advances.
- 🎛️ **Cockpit Telemetry HUD:** Real-time speedometer (0–320 km/h), RPM tachometer, active gear shift indicator (N, 1–7), and engine state metrics calculated from scroll velocity.
- 🔊 **Web Audio API Supercar Synthesizer:** Pure browser-synthesized V8 engine roar modulated by scroll speed and throttle (zero external audio files, 100% reliable, mute/unmute toggle).
- 🎨 **Interactive Workbench:**
  - **Livery Customizer:** Papaya Orange, Emerald Acid, Cyber Cyan, Hyper Purple, and Stealth Carbon.
  - **Scrub Damping Selector:** Instant (0.3s), Standard (1.0s), or Cinematic (1.8s) inertia.
  - **Manual Scrubber Slider:** Scrub through the track progress directly via UI slider.
  - **Auto Cruise:** One-click automated demonstration cruise for effortless evaluation.
  - **Apex Confetti Celebration:** Interactive particle celebration on completion.

---

## 🛠️ Tech Stack

- **Core Framework:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Animation & Physics:** [GSAP 3.12](https://greensock.com/gsap/) (`gsap`, `ScrollTrigger`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphism & Cyber Grid Utilities
- **Icons:** [Lucide React](https://lucide.dev/)
- **Sound:** Native HTML5 Web Audio API (OscillatorNode + BiquadFilterNode + GainNode)
- **Effects:** Canvas Confetti

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ItzFizz
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```
The optimized static build will be generated in the `dist/` directory.

---

## 🌐 Hosting & Deployment Instructions

### Option A: GitHub Pages (Recommended)

1. **Initialize Git & Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: scroll-driven hero section animation for ItzFizz"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ItzFizz.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**.
   - The included workflow `.github/workflows/deploy.yml` will automatically build and publish the site!
   - Your live URL will be: `https://<your-username>.github.io/ItzFizz/`

### Option B: Vercel (1-Click Alternative)
1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Framework preset will automatically detect **Vite**. Click **Deploy**!

---

## 📐 Architecture & Performance Highlights

```
┌────────────────────────────────────────────────────────┐
│  Scroll Input (Mouse Wheel, Touch, Trackpad, Drag)     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  GSAP ScrollTrigger (pin: true, scrub: 1.0)           │
│  - Dampened inertia interpolation                      │
│  - Viewport locking over 240vh distance                │
└───────────────────────────┬────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
┌─────────────────────────┐   ┌───────────────────────────┐
│ GPU Composite Layer     │   │ Real-time Telemetry &     │
│ - translate3d(x, 0, 0)  │   │ Letter Ignition Math      │
│ - will-change: transform│   │ - Bounding Box Checks     │
│ - Zero Layout Reflows   │   │ - Web Audio V8 Throttle   │
└─────────────────────────┘   └───────────────────────────┘
```

---

## 📄 License & Attribution

- Built for the **ItzFizz Frontend Animation Assignment**.
- Inspired by the reference demo by [Paras Chaturvedi](https://paraschaturvedi.github.io/car-scroll-animation).
