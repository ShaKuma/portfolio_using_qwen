# 🚀 Shashi Kumar - Portfolio Website

A modern, professional portfolio website built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Features stunning AI/ML-themed animations, interactive neural network visualizations, and a sleek dark theme that showcases 11+ years of full-stack development expertise.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6-646cff?style=for-the-badge&logo=vite)

---

## ✨ Features

### 🎨 Design & UI
- **Modern Dark Theme** with purple/cyan gradient accents
- **Glassmorphism** cards with backdrop blur effects
- **Fully Responsive** - works seamlessly on mobile, tablet, and desktop
- **Smooth Animations** with scroll-triggered reveals
- **Interactive Hover Effects** with glow trails and card elevations

### 🤖 AI/ML Themed Animations
- **Neural Network Background** - Interactive particle system with 80+ connected nodes that respond to mouse movement
- **Animated Terminal** - Live code typing animation showcasing Python AI/ML code
- **Data Flow Visualization** - Animated data points flowing through neural network nodes
- **Floating Particles** - Pulsing particle system with radial glow effects
- **Gradient Text Animations** - Flowing gradient effects on headings

### 📱 Sections
- **Hero** - Animated intro with typing effect, AI/ML badge, and key stats
- **About** - Code-style visual with animated terminal and AI/ML expertise showcase
- **Skills** - Animated progress bars across 4 categories (Frontend, Backend, AI/ML, DevOps)
- **Projects** - Interactive project cards with hover overlays
- **Experience** - Animated timeline with career progression
- **Contact** - Functional mailto form with social links

### ⚡ Performance
- **60fps Animations** using CSS transforms and `requestAnimationFrame`
- **Lazy Loading** with Intersection Observer API
- **Optimized Build** with Vite's tree-shaking
- **Minimal Bundle Size** with code splitting

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS v4, Custom CSS Animations |
| **Animations** | Canvas API, CSS Keyframes, Intersection Observer |
| **Icons** | Font Awesome 6 |
| **Fonts** | Inter (Google Fonts) |
| **Build Tool** | Vite 6 |
| **Package Manager** | npm |

---

## 📦 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShaKuma/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

---

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |

---

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── About.tsx              # About section with AI/ML showcase
│   │   ├── AnimatedTerminal.tsx   # Live code typing animation
│   │   ├── Contact.tsx            # Contact form (mailto)
│   │   ├── DataFlowAnimation.tsx  # Neural data flow canvas
│   │   ├── Experience.tsx         # Career timeline
│   │   ├── FloatingParticles.tsx  # Particle system
│   │   ├── Footer.tsx             # Site footer
│   │   ├── Hero.tsx               # Hero section with neural background
│   │   ├── Navbar.tsx             # Responsive navigation
│   │   ├── NeuralNetworkBackground.tsx  # Interactive neural network
│   │   ├── Projects.tsx           # Project showcase grid
│   │   ├── ScrollProgress.tsx     # Scroll progress indicator
│   │   └── Skills.tsx             # Skills with animated bars
│   ├── hooks/
│   │   └── useInView.ts           # Scroll reveal hook
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles & animations
├── index.html             # HTML template
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

---

## 🎯 Customization

### Update Personal Information

1. **Basic Info** - Edit `src/components/Hero.tsx` and `src/components/About.tsx`
2. **Skills** - Modify the `skillCategories` array in `src/components/Skills.tsx`
3. **Projects** - Update the `projects` array in `src/components/Projects.tsx`
4. **Experience** - Edit the `experiences` array in `src/components/Experience.tsx`
5. **Contact** - Update email/phone in `src/components/Contact.tsx`

### Change Colors

Edit the color theme in `src/index.css`:
```css
@theme {
  --color-primary: #7c3aed;        /* Purple */
  --color-primary-light: #a78bfa;
  --color-accent: #06b6d4;         /* Cyan */
  --color-accent-light: #22d3ee;
  --color-dark-bg: #09090b;        /* Background */
  --color-dark-surface: #111113;
  --color-dark-card: #18181b;
}
```

---

## 🌐 Deployment

### GitHub Pages

1. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Set base path in `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ...
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Vercel (Recommended)

1. Push code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Deploy - it's automatic on every push!

### Netlify

1. Push code to GitHub
2. Connect repo at [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

---

## 📧 Contact

**Shashi Kumar**  
📧 Email: [Shashikmr01991@gmail.com](mailto:Shashikmr01991@gmail.com)  
📱 Phone: +91 9940342772  
📍 Location: Noida, India  
💼 LinkedIn: [Connect with me](#)  
🐙 GitHub: [ShaKuma](https://github.com/ShaKuma/)

---

## 🎓 About Me

- **11+ years** of experience as a Full Stack Web Application Developer
- **AI/ML Certified** from IIT Delhi (6-month intensive program)
- **Associate Lead Software Engineer** at TIS: FIS (Fidelity Information Services)
- Expertise in building enterprise AI agent platforms, MCP server ecosystems, and scalable web applications
- Proven track record of saving **$32K+ quarterly** through automation

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Font by [Google Fonts](https://fonts.google.com/)

---

<div align="center">

**If you like this portfolio, consider giving it a ⭐ on GitHub!**

Made with ❤️ by Shashi Kumar

</div>
