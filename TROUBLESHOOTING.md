# 🔧 Troubleshooting Guide

Common issues and their solutions when working with this portfolio.

## Table of Contents
- [Installation Issues](#installation-issues)
- [Development Server Issues](#development-server-issues)
- [Build Issues](#build-issues)
- [Styling Issues](#styling-issues)
- [Performance Issues](#performance-issues)
- [Deployment Issues](#deployment-issues)

---

## Installation Issues

### ❌ `npm install` fails

**Problem:** Dependencies won't install

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete lock file and node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Or use yarn
yarn install
```

### ❌ Node version mismatch

**Problem:** `error: engine "node" is incompatible`

**Solution:**
```bash
# Check current version
node --version

# Install Node 16+ using nvm
nvm install 18
nvm use 18
```

### ❌ Permission errors (Mac/Linux)

**Problem:** `EACCES: permission denied`

**Solution:**
```bash
# Fix npm permissions
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config

# Or use sudo (not recommended)
sudo npm install
```

---

## Development Server Issues

### ❌ Port already in use

**Problem:** `Port 3000 is already in use`

**Solution 1: Kill the process**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Solution 2: Use different port**
```bash
npm run dev -- --port 3001
```

### ❌ Hot reload not working

**Problem:** Changes don't reflect automatically

**Solutions:**
1. Check if file is saved (Ctrl+S / Cmd+S)
2. Restart dev server: Ctrl+C, then `npm run dev`
3. Clear browser cache: Ctrl+Shift+R / Cmd+Shift+R
4. Check Vite config for HMR settings

### ❌ White screen / Blank page

**Problem:** App doesn't render

**Solutions:**
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify all imports are correct
4. Check if `main.jsx` renders App
5. Verify `index.html` has `<div id="root"></div>`

---

## Build Issues

### ❌ Build fails with module errors

**Problem:** `Cannot find module '@/components/...'`

**Solutions:**
```bash
# Check vite.config.js has correct alias
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}

# Reinstall dependencies
npm install
```

### ❌ Build succeeds but preview shows errors

**Problem:** `npm run build` works but `npm run preview` has issues

**Solutions:**
1. Clear dist folder: `rm -rf dist`
2. Rebuild: `npm run build`
3. Check for absolute paths in imports
4. Verify all assets are in public folder

### ❌ Out of memory error

**Problem:** `JavaScript heap out of memory`

**Solution:**
```bash
# Increase memory limit
set NODE_OPTIONS=--max_old_space_size=4096
npm run build

# Or in package.json
"build": "NODE_OPTIONS=--max_old_space_size=4096 vite build"
```

---

## Styling Issues

### ❌ Tailwind classes not working

**Problem:** Styles don't apply

**Solutions:**
1. Check `tailwind.config.js` content paths:
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,jsx}",
],
```

2. Verify `index.css` has directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Restart dev server
4. Clear browser cache

### ❌ Custom animations not working

**Problem:** Animation classes don't animate

**Solutions:**
1. Check `tailwind.config.js` has keyframes defined
2. Verify animation is in `theme.extend.animation`
3. Check browser console for errors
4. Test with simple animation first

### ❌ Dark mode not working

**Problem:** Dark theme doesn't apply

**Solutions:**
1. Check `<html>` has `dark` class
2. Verify `tailwind.config.js` has `darkMode: "class"`
3. Check CSS variables are defined
4. Inspect element to see applied classes

---

## Performance Issues

### ❌ Slow page load

**Problem:** Page takes too long to load

**Solutions:**
1. **Optimize images:**
```bash
# Use WebP format
# Compress with TinyPNG
# Use appropriate sizes
```

2. **Check bundle size:**
```bash
npm run build
# Check dist folder size
```

3. **Enable lazy loading:**
```javascript
const Component = lazy(() => import('./Component'));
```

4. **Use Lighthouse:**
- Open DevTools (F12)
- Go to Lighthouse tab
- Run audit
- Follow suggestions

### ❌ Animations are janky

**Problem:** Animations stutter

**Solutions:**
1. Reduce animation complexity
2. Use `will-change` CSS property
3. Limit number of animated elements
4. Use `transform` instead of `position` properties
5. Test on actual device, not just DevTools

### ❌ Memory leaks

**Problem:** Browser becomes slow over time

**Solutions:**
1. Check for missing cleanup in `useEffect`:
```javascript
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  
  return () => clearInterval(interval); // Cleanup
}, []);
```

2. Remove event listeners on unmount
3. Cancel API requests on unmount

---

## Deployment Issues

### ❌ 404 on page refresh

**Problem:** Direct URL access shows 404

**Solutions:**

**Netlify:** Create `netlify.toml`
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel:** Create `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**GitHub Pages:** Use hash router instead

### ❌ Assets not loading after deployment

**Problem:** Images/fonts don't load

**Solutions:**
1. Use relative paths: `./image.jpg` not `/image.jpg`
2. Put assets in `public/` folder
3. Check `base` in `vite.config.js`:
```javascript
export default defineConfig({
  base: '/repository-name/', // For GitHub Pages
});
```

### ❌ Environment variables not working

**Problem:** `.env` variables are undefined

**Solutions:**
1. Prefix with `VITE_`:
```
VITE_API_KEY=your_key
```

2. Access with `import.meta.env`:
```javascript
const key = import.meta.env.VITE_API_KEY;
```

3. Add to deployment platform (Vercel/Netlify)

### ❌ Build works locally but fails on platform

**Problem:** Deployment build fails

**Solutions:**
1. Check Node version matches platform
2. Remove package-lock.json, reinstall
3. Check for case-sensitive file names
4. Verify all dependencies are in `package.json`
5. Check deployment logs for specific error

---

## Component-Specific Issues

### ❌ Framer Motion animations not working

**Solutions:**
1. Verify import: `import { motion } from 'framer-motion'`
2. Use `<motion.div>` not `<div>`
3. Check initial/animate props are correct
4. Ensure viewport observer is working

### ❌ Icons not showing

**Solutions:**
1. Check Lucide React is installed: `npm install lucide-react`
2. Verify import: `import { IconName } from 'lucide-react'`
3. Check icon name is correct (case-sensitive)

### ❌ Smooth scroll not working

**Solutions:**
1. Check `index.css` has:
```css
html {
  scroll-behavior: smooth;
}
```

2. Verify anchor links: `href="#section-id"`
3. Check sections have matching `id` attributes

---

## Debug Tips

### Enable React DevTools

1. Install React DevTools extension
2. Open browser DevTools
3. Go to React tab
4. Inspect component tree

### Enable Verbose Logging

```javascript
// Add to components
console.log('Component rendered', { props, state });
```

### Check Bundle Contents

```bash
npm run build

# Analyze dist folder
ls -lh dist/assets/
```

### Test Production Build Locally

```bash
npm run build
npm run preview
```

### Clear Everything

```bash
# Nuclear option - start fresh
rm -rf node_modules dist package-lock.json .vite
npm install
npm run dev
```

---

## Getting Help

If none of these solutions work:

1. **Check browser console** for errors
2. **Search error message** on Google/StackOverflow
3. **Check GitHub issues** of related packages
4. **Ask for help:**
   - StackOverflow with `react` `vite` `tailwindcss` tags
   - React Discord/Slack communities
   - GitHub Discussions

### When Asking for Help

Provide:
- Error message (full stack trace)
- What you tried
- Relevant code snippets
- Node/npm versions
- Operating system
- Browser version

---

## Prevention Tips

1. **Regular updates:**
```bash
npm outdated
npm update
```

2. **Test before committing:**
```bash
npm run build
npm run preview
```

3. **Use version control:**
```bash
git commit -m "Working version"
```

4. **Keep dependencies stable:**
- Lock versions in `package.json`
- Use `package-lock.json`

5. **Document custom changes:**
- Add comments
- Update README

---

**Still stuck?** Open an issue with:
- What you're trying to do
- What's happening instead
- Error messages
- Steps to reproduce

Good luck debugging! 🐛🔧
