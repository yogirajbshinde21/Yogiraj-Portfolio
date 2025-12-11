# 🚀 Quick Start Guide

## Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

## Installation Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

Your portfolio will be running at `http://localhost:3000` 🎉

## 📝 Important Notes

### Aceternity UI Components
This project includes **pre-built** Aceternity UI components in `src/components/ui/`. You **DO NOT** need to run the Aceternity CLI commands unless you want to update/reinstall components.

The components are already configured and ready to use!

### What's Included

✅ **All UI Components** - 25+ Aceternity components pre-installed
✅ **Responsive Design** - Mobile, tablet, and desktop optimized
✅ **Smooth Animations** - Framer Motion animations throughout
✅ **Dark Theme** - Professional dark mode by default
✅ **Optimized Performance** - Lazy loading and code splitting

## 🎨 Customization Guide

### 1. Update Your Information

**Hero Section** - `src/components/Hero.jsx`
- Change name, titles, and tagline

**About Section** - `src/components/About.jsx`
- Update bio and education details

**Experience** - `src/components/Experience.jsx`
- Add your work experience

**Skills** - `src/components/Skills.jsx`
- List your technical skills

**Projects** - `src/components/Projects.jsx`
- Showcase your projects with images

**Contact** - `src/components/Contact.jsx`
- Update email and social links

### 2. Change Colors

Edit `src/index.css` to change the gradient colors:
```css
.gradient-text {
  @apply bg-gradient-to-r from-your-color via-your-color to-your-color;
}
```

### 3. Add Your Images

Replace placeholder images in:
- `src/components/Projects.jsx` - Project screenshots
- Any other sections with images

## 🏗️ Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` folder.

## 🌐 Deploy

### Vercel (Easiest)
1. Push code to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Deploy automatically!

### Netlify
1. Run `npm run build`
2. Upload `dist/` folder to [netlify.com](https://netlify.com)

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- --port 3001
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Module Not Found
```bash
# Ensure all dependencies are installed
npm install
```

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Aceternity UI](https://ui.aceternity.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 💡 Pro Tips

1. **Use VS Code** with these extensions:
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - Prettier - Code formatter

2. **Hot Reload** - Changes appear instantly during development

3. **Performance** - Components are lazy-loaded for faster initial load

4. **SEO** - Update meta tags in `index.html`

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Start dev server
3. 🎨 Customize content
4. 📸 Add your images
5. 🧪 Test on different devices
6. 🚀 Deploy to production

---

**Need Help?** Check the full README.md for detailed documentation!

Happy coding! 🎉
