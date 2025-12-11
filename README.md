# 🌟 Yogiraj Shinde - Portfolio Website

A modern, visually stunning portfolio website built with React, Vite, TailwindCSS, and Aceternity UI components. This portfolio showcases projects, skills, and experience with cutting-edge animations and effects.

![Portfolio Preview](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80)

## ✨ Features

- 🎨 **Modern UI/UX** - Sleek, professional design with smooth animations
- 🌈 **Aceternity UI Components** - Premium UI components for stunning visual effects
- ⚡ **Vite** - Lightning-fast build tool and development server
- 🎭 **Framer Motion** - Fluid animations and transitions
- 📱 **Responsive Design** - Fully responsive across all devices
- 🌙 **Dark Theme** - Eye-friendly dark theme by default
- 🚀 **Performance Optimized** - Lazy loading and code splitting
- ♿ **Accessible** - ARIA labels and semantic HTML

## 🛠️ Tech Stack

### Core
- **React 18+** - Modern React with hooks
- **Vite** - Next-generation frontend tooling
- **JavaScript (ES6+)** - No TypeScript

### Styling
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Aceternity UI** - Premium UI component library

### Tools
- **Lucide React** - Beautiful icon library
- **clsx & tailwind-merge** - Utility functions

## 📦 Installation

### Prerequisites

- Node.js 16+ and npm/yarn
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/yogirajbshinde21/portfolio.git
cd portfolio
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Initialize Aceternity UI (IMPORTANT!)

This project uses Aceternity UI components. You need to initialize them:

```bash
npx aceternity-ui@latest init
```

When prompted:
- ✅ Select **JavaScript** (NOT TypeScript)
- ✅ Accept Tailwind CSS configuration
- ✅ Accept component.json creation
- ✅ Accept Framer Motion installation

### Step 4: Add Aceternity Components

Add all required UI components:

```bash
# Navigation & Layout
npx aceternity-ui add floating-navbar

# Hero Section Components
npx aceternity-ui add lamp
npx aceternity-ui add spotlight
npx aceternity-ui add aurora-background
npx aceternity-ui add text-reveal-card
npx aceternity-ui add sparkles
npx aceternity-ui add moving-border
npx aceternity-ui add typewriter-effect
npx aceternity-ui add flip-words

# About Section Components
npx aceternity-ui add bento-grid
npx aceternity-ui add 3d-card-effect
npx aceternity-ui add background-gradient
npx aceternity-ui add text-generate-effect

# Experience Section Components
npx aceternity-ui add timeline
npx aceternity-ui add tracing-beam
npx aceternity-ui add background-lines

# Skills Section Components
npx aceternity-ui add wobble-card
npx aceternity-ui add infinite-moving-cards

# Projects Section Components
npx aceternity-ui add focus-cards
npx aceternity-ui add link-preview

# Contact Section Components
npx aceternity-ui add evervault-card
npx aceternity-ui add placeholders-and-vanish-input
npx aceternity-ui add meteors
npx aceternity-ui add shooting-stars
npx aceternity-ui add world-map

# Footer Components
npx aceternity-ui add background-beams-with-collision
npx aceternity-ui add animated-tooltip
```

**Note:** This project already includes pre-built versions of these components in `src/components/ui/`. The CLI commands above are for reference if you want to update or reinstall them.

### Step 5: Run Development Server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see your portfolio!

## 🚀 Build for Production

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── ui/                    # Aceternity UI components
│   │   │   ├── floating-navbar.jsx
│   │   │   ├── lamp.jsx
│   │   │   ├── spotlight.jsx
│   │   │   ├── aurora-background.jsx
│   │   │   ├── typewriter-effect.jsx
│   │   │   ├── sparkles.jsx
│   │   │   ├── text-reveal-card.jsx
│   │   │   ├── moving-border.jsx
│   │   │   ├── bento-grid.jsx
│   │   │   ├── 3d-card-effect.jsx
│   │   │   ├── background-gradient.jsx
│   │   │   ├── text-generate-effect.jsx
│   │   │   ├── timeline.jsx
│   │   │   ├── tracing-beam.jsx
│   │   │   ├── background-lines.jsx
│   │   │   ├── wobble-card.jsx
│   │   │   ├── infinite-moving-cards.jsx
│   │   │   ├── focus-cards.jsx
│   │   │   ├── link-preview.jsx
│   │   │   ├── evervault-card.jsx
│   │   │   ├── placeholders-and-vanish-input.jsx
│   │   │   ├── meteors.jsx
│   │   │   ├── shooting-stars.jsx
│   │   │   ├── world-map.jsx
│   │   │   ├── background-beams-with-collision.jsx
│   │   │   ├── animated-tooltip.jsx
│   │   │   └── flip-words.jsx
│   │   ├── Navigation.jsx       # Floating navigation bar
│   │   ├── Hero.jsx             # Hero section with animations
│   │   ├── About.jsx            # About section with bento grid
│   │   ├── Experience.jsx       # Timeline of experience
│   │   ├── Skills.jsx           # Skills showcase
│   │   ├── Projects.jsx         # Project portfolio
│   │   ├── Contact.jsx          # Contact form
│   │   └── Footer.jsx           # Footer with social links
│   ├── lib/
│   │   └── utils.js             # Utility functions (cn helper)
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── public/                       # Static assets
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                     # This file
```

## 🎨 Customization

### Update Personal Information

Edit the content in each component file:

**Hero Section** (`src/components/Hero.jsx`):
```javascript
const titles = ["Your Title 1", "Your Title 2", ...];
```

**About Section** (`src/components/About.jsx`):
```javascript
const bio = "Your bio here...";
```

**Experience Section** (`src/components/Experience.jsx`):
- Update `timelineData` array with your experience

**Skills Section** (`src/components/Skills.jsx`):
- Update `skillCategories` array with your skills

**Projects Section** (`src/components/Projects.jsx`):
- Update `projects` array with your projects
- Add project images (use Unsplash or your own)

**Contact Section** (`src/components/Contact.jsx`):
- Update email and social links
- Configure form submission endpoint

### Color Scheme

The portfolio uses a purple-pink-cyan gradient theme. To customize:

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: "#your-color",
  secondary: "#your-color",
  accent: "#your-color",
}
```

Edit `src/index.css` for gradient classes:
```css
.gradient-text {
  @apply bg-gradient-to-r from-your-color via-your-color to-your-color;
}
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy!

### Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify](https://netlify.com)

### GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Deploy:
```bash
npm run deploy
```

## 📝 Environment Variables

Create a `.env` file for sensitive data:

```env
VITE_EMAIL_SERVICE_ID=your_service_id
VITE_EMAIL_TEMPLATE_ID=your_template_id
VITE_EMAIL_PUBLIC_KEY=your_public_key
```

Access in code:
```javascript
const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Aceternity UI](https://ui.aceternity.com/) - Amazing UI component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Unsplash](https://unsplash.com/) - Free high-quality images

## 📧 Contact

**Yogiraj Shinde**
- Email: yogiraj.shinde@example.com
- LinkedIn: [linkedin.com/in/yogirajshinde](https://linkedin.com/in/yogirajshinde)
- GitHub: [github.com/yogirajshinde](https://github.com/yogirajbshinde21)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

⭐ **Star this repo if you find it helpful!**

Built with ❤️ by Yogiraj Shinde using React + Aceternity UI
