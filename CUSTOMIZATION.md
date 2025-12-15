# 🎨 Customization Guide

Complete guide to personalizing your portfolio website.

## Table of Contents
1. [Personal Information](#personal-information)
2. [Colors & Theme](#colors--theme)
3. [Images & Media](#images--media)
4. [Content Sections](#content-sections)
5. [Fonts & Typography](#fonts--typography)
6. [SEO & Meta Tags](#seo--meta-tags)

---

## Personal Information

### Hero Section
**File:** `src/components/Hero.jsx`

```javascript
// Update your name
<span className="...">
  Yogiraj Shinde  // ← Change this
</span>

// Update rotating titles
const titles = [
  "MERN Stack Developer",  // ← Add your titles
  "Full Stack Engineer",
  "Data Science Enthusiast",
  "Problem Solver"
];

// Update tagline
const words = [
  { text: "Turning" },
  { text: "Ideas" },
  { text: "into" },
  { text: "Intelligent", className: "text-cyan-500" },
  { text: "Web", className: "text-purple-500" },
  { text: "Experiences", className: "text-pink-500" },
];

// Update subtitle
<p>BS Data Science @ IITM | Top Voice '24</p>  // ← Change this
```

### About Section
**File:** `src/components/About.jsx`

```javascript
// Update bio
const bio = "Your bio text here...";

// Update bento grid items
const bentoItems = [
  {
    title: "Education",
    description: "Your education details",
    // ...
  },
  {
    title: "Experience",
    description: "Your experience summary",
    // ...
  },
  // Update all items
];
```

### Experience Section
**File:** `src/components/Experience.jsx`

```javascript
const timelineData = [
  {
    title: "2024",  // ← Year
    content: (
      <div>
        <h3>Your Job Title</h3>
        <p>Company Name</p>
        <ul>
          <li>Achievement 1</li>
          <li>Achievement 2</li>
        </ul>
      </div>
    ),
  },
  // Add more experiences
];
```

### Skills Section
**File:** `src/components/Skills.jsx`

```javascript
const skillCategories = [
  {
    title: "Frontend Development",
    skills: ["React.js", "HTML5", "CSS3", ...],  // ← Your skills
    gradient: "from-purple-500/20 to-pink-500/20",
    icon: "🎨",
  },
  // Add/modify categories
];
```

### Projects Section
**File:** `src/components/Projects.jsx`

```javascript
const projects = [
  {
    title: "Project Name",
    description: "Project description...",
    tech: ["React", "Node.js", ...],
    image: "path/to/image.jpg",  // ← Your image
    github: "https://github.com/...",  // ← Your repo
    live: "https://yourproject.com",  // ← Live demo
    gradient: "from-purple-500 to-pink-500",
  },
  // Add more projects
];
```

### Contact Section
**File:** `src/components/Contact.jsx`

```javascript
// Update email
<p>📧 your.email@example.com</p>

// Update social links
const socialLinks = [
  {
    name: "Email",
    icon: <Mail className="w-6 h-6" />,
    href: "mailto:your.email@example.com",  // ← Your email
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourprofile",  // ← Your LinkedIn
  },
  // Update all links
];
```

### Footer
**File:** `src/components/Footer.jsx`

```javascript
// Update quick info
<p>📧 your.email@example.com</p>
<p>📍 Your Location</p>
<p>🎓 Your Education</p>
```

---

## Colors & Theme

### Global Color Scheme
**File:** `src/index.css`

```css
/* Change gradient colors */
.gradient-text {
  @apply bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500;
  /* Change to: from-blue-500 via-green-500 to-yellow-500 */
}

/* Glow effects */
.glow-purple {
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
  /* Change color: rgba(R, G, B, 0.4) */
}

.glow-cyan {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
}
```

### Tailwind Colors
**File:** `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: "#a855f7",     // Purple
      secondary: "#06b6d4",   // Cyan
      accent: "#ec4899",      // Pink
      // Add custom colors
    }
  }
}
```

### Component-Specific Colors

**Hero gradient:**
```javascript
// src/components/Hero.jsx
className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
// Change to your colors
```

**Button colors:**
```javascript
// src/components/ui/moving-border.jsx
background: `linear-gradient(90deg, #a855f7, #06b6d4, #ec4899, #a855f7)`
// Update hex colors
```

---

## Images & Media

### Project Images

**Option 1: Local Images**
1. Add images to `public/images/`
2. Reference: `image: "/images/project1.jpg"`

**Option 2: Unsplash**
```javascript
image: "https://images.unsplash.com/photo-xxxxx?w=800&q=80"
```

**Option 3: Your Own CDN**
```javascript
image: "https://yourdomain.com/images/project1.jpg"
```

### Optimize Images

```bash
# Install image optimizer
npm install --save-dev vite-plugin-imagemin

# Add to vite.config.js
import viteImagemin from 'vite-plugin-imagemin';

plugins: [
  react(),
  viteImagemin({
    gifsicle: { optimizationLevel: 7 },
    optipng: { optimizationLevel: 7 },
    mozjpeg: { quality: 80 },
    pngquant: { quality: [0.8, 0.9] },
    svgo: { plugins: [{ name: 'removeViewBox' }] },
    webp: { quality: 80 }
  })
]
```

### Favicon

Replace `public/vite.svg` with your favicon:
1. Create favicon at [favicon.io](https://favicon.io)
2. Add to `public/` folder
3. Update `index.html`:
```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

---

## Content Sections

### Add New Section

1. **Create component:** `src/components/NewSection.jsx`
```javascript
import React from 'react';
import { motion } from 'framer-motion';

const NewSection = () => {
  return (
    <section id="newsection" className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white">
          New Section
        </h2>
        {/* Your content */}
      </div>
    </section>
  );
};

export default NewSection;
```

2. **Add to App.jsx:**
```javascript
import NewSection from './components/NewSection';

// In return statement
<NewSection />
```

3. **Add to Navigation:**
```javascript
// src/components/Navigation.jsx
{
  name: "New Section",
  link: "#newsection",
  icon: <Icon />
}
```

### Remove Section

1. Comment out in `src/App.jsx`
2. Remove from navigation items

---

## Fonts & Typography

### Google Fonts

**File:** `index.html`

```html
<head>
  <!-- Add Google Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
```

**File:** `tailwind.config.js`

```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Your Font', 'sans-serif'],
    }
  }
}
```

**Usage:**
```javascript
<h1 className="font-heading">Heading Text</h1>
<p className="font-sans">Body Text</p>
```

### Font Sizes

```javascript
// tailwind.config.js
fontSize: {
  'xs': '0.75rem',
  'sm': '0.875rem',
  'base': '1rem',
  'lg': '1.125rem',
  'xl': '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
}
```

---

## SEO & Meta Tags

### Update Meta Tags
**File:** `index.html`

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>Your Name | Portfolio</title>
  <meta name="title" content="Your Name | Portfolio" />
  <meta name="description" content="Your description here" />
  <meta name="keywords" content="React, Developer, Portfolio, Your Skills" />
  <meta name="author" content="Your Name" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yourwebsite.com/" />
  <meta property="og:title" content="Your Name | Portfolio" />
  <meta property="og:description" content="Your description" />
  <meta property="og:image" content="https://yourwebsite.com/og-image.png" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://yourwebsite.com/" />
  <meta property="twitter:title" content="Your Name | Portfolio" />
  <meta property="twitter:description" content="Your description" />
  <meta property="twitter:image" content="https://yourwebsite.com/og-image.png" />
</head>
```

### Create OG Image
1. Design 1200x630px image
2. Add to `public/og-image.png`
3. Update meta tags

### Sitemap (Optional)

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourwebsite.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Robots.txt

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yourwebsite.com/sitemap.xml
```

---

## Animation Customization

### Adjust Animation Speed

```javascript
// Slower
transition={{ duration: 1.5 }}

// Faster
transition={{ duration: 0.3 }}
```

### Change Animation Type

```javascript
// Bounce
transition={{ type: "spring", bounce: 0.4 }}

// Smooth
transition={{ type: "tween", ease: "easeInOut" }}
```

### Disable Animations (Performance)

```javascript
// Remove motion. prefix
<div> instead of <motion.div>
```

---

## Quick Customization Checklist

- [ ] Name in Hero section
- [ ] Bio in About section
- [ ] Experience timeline
- [ ] Skills list
- [ ] Projects with images
- [ ] Contact email
- [ ] Social media links
- [ ] Colors/theme
- [ ] Favicon
- [ ] Meta tags
- [ ] OG image
- [ ] Google Analytics (optional)

---

**Need help?** Check the main README.md or open an issue!

Happy customizing! 🎨
