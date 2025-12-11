# 🚀 Deployment Guide

This guide covers multiple deployment options for your portfolio website.

## Table of Contents
- [Vercel (Recommended)](#vercel-recommended)
- [Netlify](#netlify)
- [GitHub Pages](#github-pages)
- [Custom Server](#custom-server)

---

## Vercel (Recommended)

### Why Vercel?
- ✅ Free hosting for personal projects
- ✅ Automatic deployments on git push
- ✅ Built-in CI/CD
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Global CDN

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

3. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as shown

### Environment Variables
If you have any `.env` variables:
- Go to Project Settings → Environment Variables
- Add your variables (e.g., `VITE_EMAIL_SERVICE_ID`)

---

## Netlify

### Deployment Steps

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy via Drag & Drop**
   - Visit [netlify.com](https://netlify.com)
   - Drag the `dist` folder to the upload area
   - Done!

3. **Deploy via Git (Recommended)**
   - Push code to GitHub
   - Click "New site from Git" on Netlify
   - Choose your repository
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Deploy

4. **Custom Domain**
   - Go to Site Settings → Domain Management
   - Add custom domain
   - Update DNS

### Netlify Configuration File

Create `netlify.toml` in root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## GitHub Pages

### Setup Steps

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/repository-name/', // Your repo name
   });
   ```

3. **Add Deploy Scripts** to `package.json`
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Save

Your site will be at: `https://yourusername.github.io/repository-name/`

---

## Custom Server (VPS/Cloud)

### Using PM2 (Production Server)

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Install Serve Globally**
   ```bash
   npm install -g serve pm2
   ```

3. **Start Server**
   ```bash
   pm2 start "serve -s dist -l 3000" --name portfolio
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx** (Optional)
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All placeholder content is replaced with your information
- [ ] Images are optimized and loaded correctly
- [ ] Contact form is configured (if using email service)
- [ ] Social media links are updated
- [ ] Meta tags in `index.html` are updated
- [ ] Favicon is added
- [ ] Project runs without errors: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Check responsive design on mobile/tablet
- [ ] Test all navigation links
- [ ] Verify all external links work
- [ ] Check browser console for errors
- [ ] Test form submissions
- [ ] Performance audit with Lighthouse

---

## Performance Optimization

### Before Deployment

1. **Optimize Images**
   - Use WebP format
   - Compress images (TinyPNG, Squoosh)
   - Use appropriate sizes

2. **Code Splitting**
   Already implemented via React.lazy() ✅

3. **Lighthouse Audit**
   ```bash
   npm run build
   npm run preview
   # Open DevTools → Lighthouse → Run Audit
   ```

4. **Bundle Analysis**
   ```bash
   npm install --save-dev vite-plugin-visualizer
   ```

   Add to `vite.config.js`:
   ```javascript
   import { visualizer } from 'vite-plugin-visualizer';
   
   plugins: [react(), visualizer()],
   ```

---

## Custom Domain Setup

### For Vercel/Netlify

1. Buy domain (Namecheap, GoDaddy, etc.)
2. Add to platform (Vercel/Netlify)
3. Update DNS records:
   ```
   Type: A
   Name: @
   Value: [Platform IP]
   
   Type: CNAME
   Name: www
   Value: [Platform domain]
   ```

### SSL Certificate
- Auto-configured by Vercel/Netlify ✅

---

## Troubleshooting

### Blank Page After Deployment
- Check browser console for errors
- Verify `base` path in vite.config.js
- Check if all assets loaded correctly

### 404 on Refresh
Add redirect rules (covered in Netlify section)

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Slow Load Times
- Optimize images
- Enable CDN
- Check Lighthouse performance

---

## Monitoring & Analytics

### Add Google Analytics

1. Get tracking ID from [analytics.google.com](https://analytics.google.com)

2. Add to `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

---

## Continuous Deployment

### Automatic Deployments (Vercel/Netlify)

Once connected to Git:
1. Push to main branch
2. Automatic build triggers
3. Deployment completes
4. Live in ~2 minutes

### Deploy Preview
Both platforms create preview deployments for pull requests!

---

**Need more help?** Check platform-specific documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

Good luck with your deployment! 🚀
