# 🎯 GETTING STARTED

**Welcome to your new portfolio!** This guide will get you up and running in 10 minutes.

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit: `http://localhost:3000`

**That's it! Your portfolio is running!** 🎉

---

## 📝 First Customizations (5 Minutes)

### 1. Update Your Name
**File:** `src/components/Hero.jsx` (Line ~38)
```javascript
<span className="...">
  Yogiraj Shinde  // ← Change to your name
</span>
```

### 2. Update Your Bio
**File:** `src/components/About.jsx` (Line ~9)
```javascript
const bio = "Your bio here...";  // ← Write your bio
```

### 3. Update Your Email
**File:** `src/components/Contact.jsx` (Line ~27)
```javascript
href: "mailto:your.email@example.com",  // ← Your email
```

**Save files** → Changes appear automatically! ✨

---

## 🎨 What You Get

### ✅ Pre-Built Sections
1. **Hero** - Animated landing with your name
2. **About** - Bio with bento grid layout
3. **Experience** - Timeline of your journey
4. **Skills** - Tech stack showcase
5. **Projects** - Portfolio of work
6. **Contact** - Get in touch form
7. **Footer** - Social links

### ✅ Amazing Features
- 🌈 Stunning animations
- 📱 Mobile responsive
- 🚀 Lightning fast
- ♿ Accessible
- 🎨 Modern design
- 📦 Production ready

---

## 📚 Documentation

### 📖 Full Guides
- **README.md** - Complete documentation
- **QUICKSTART.md** - This file (detailed version)
- **CUSTOMIZATION.md** - Change colors, content, etc.
- **DEPLOYMENT.md** - Deploy to production
- **TROUBLESHOOTING.md** - Fix common issues
- **PROJECT_SUMMARY.md** - What's included
- **PRE_LAUNCH_CHECKLIST.md** - Before going live

### 🎯 Quick Links
- Need help? → `TROUBLESHOOTING.md`
- Want to customize? → `CUSTOMIZATION.md`
- Ready to deploy? → `DEPLOYMENT.md`

---

## 🔧 Available Commands

```bash
npm run dev      # Start development (with hot reload)
npm run build    # Build for production
npm run preview  # Preview production build
npm run format   # Format code with Prettier
npm run clean    # Clean install (fixes most issues)
```

---

## 🎨 Customization Priorities

### Must Do (Before Deploying)
1. ✅ Name in Hero section
2. ✅ Bio in About section
3. ✅ Email in Contact section
4. ✅ Add your projects (at least 3)
5. ✅ Update social links

### Should Do (Recommended)
1. 📝 Experience timeline
2. 💪 Skills list
3. 🖼️ Project images
4. 🌐 Meta tags in `index.html`
5. 🎨 Favicon

### Could Do (Optional)
1. 🎨 Change colors
2. ✨ Adjust animations
3. 📊 Add analytics
4. 🌍 Custom domain

---

## 🚀 Deploy in 3 Steps

### Option 1: Vercel (Easiest)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" → Done!

### Option 2: Netlify
1. Run `npm run build`
2. Drag `dist` folder to [netlify.com](https://netlify.com)
3. Done!

**Full instructions:** See `DEPLOYMENT.md`

---

## 🆘 Common Issues

### ❌ Port already in use
```bash
# Kill process on port 3000
netstat -ano | findstr :3000  # Windows
lsof -ti:3000 | xargs kill -9  # Mac/Linux

# Or use different port
npm run dev -- --port 3001
```

### ❌ Changes not showing
1. Save file (Ctrl+S / Cmd+S)
2. Check browser console (F12)
3. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### ❌ Build errors
```bash
npm run clean  # Clean install
npm run dev    # Try again
```

**More solutions:** See `TROUBLESHOOTING.md`

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── ui/              # Pre-built UI components ✨
│   │   ├── Navigation.jsx   # ← Edit nav items here
│   │   ├── Hero.jsx         # ← Edit name & titles here
│   │   ├── About.jsx        # ← Edit bio here
│   │   ├── Experience.jsx   # ← Edit experience here
│   │   ├── Skills.jsx       # ← Edit skills here
│   │   ├── Projects.jsx     # ← Edit projects here
│   │   ├── Contact.jsx      # ← Edit contact info here
│   │   └── Footer.jsx       # ← Edit footer here
│   ├── App.jsx              # Main app
│   ├── index.css            # Global styles
│   └── main.jsx             # Entry point
├── public/                   # Static files (images, etc.)
├── index.html               # HTML template
└── package.json             # Dependencies
```

---

## 🎯 Your First Hour

### Minutes 0-10: Setup
- ✅ Install dependencies
- ✅ Start dev server
- ✅ Browse the portfolio

### Minutes 10-30: Basic Customization
- ✅ Update name
- ✅ Update bio
- ✅ Update email
- ✅ Update social links

### Minutes 30-50: Content
- ✅ Add your projects
- ✅ Update skills
- ✅ Update experience

### Minutes 50-60: Polish
- ✅ Test on mobile
- ✅ Check all links
- ✅ Review content

---

## 💡 Pro Tips

### Development
1. **Keep dev server running** while editing
2. **Use VS Code** for best experience
3. **Install recommended extensions** (`.vscode/extensions.json`)
4. **Save often** - changes appear instantly
5. **Check browser console** for errors (F12)

### Content
1. **Be concise** - quality over quantity
2. **Use good images** - compress before adding
3. **Update regularly** - keep content fresh
4. **Proofread** - no typos!
5. **Get feedback** - ask friends to review

### Performance
1. **Optimize images** - use WebP format
2. **Test before deploy** - `npm run build && npm run preview`
3. **Check Lighthouse score** - aim for 90+
4. **Test on real devices** - not just DevTools
5. **Monitor after launch** - fix issues quickly

---

## 🌟 Success Checklist

**Before you deploy, make sure:**

- [ ] Personal info updated (name, bio, email)
- [ ] At least 3 projects added
- [ ] All social links work
- [ ] Images load correctly
- [ ] No console errors
- [ ] Tested on mobile
- [ ] Content is proofread
- [ ] Production build works (`npm run build`)

**Full checklist:** See `PRE_LAUNCH_CHECKLIST.md`

---

## 📖 Learn More

### Technologies Used
- [React](https://react.dev) - UI library
- [Vite](https://vitejs.dev) - Build tool
- [TailwindCSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Aceternity UI](https://ui.aceternity.com) - Components

### Tutorials
- React basics: [react.dev/learn](https://react.dev/learn)
- Tailwind basics: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- Vite guide: [vitejs.dev/guide](https://vitejs.dev/guide/)

---

## 🤝 Get Help

### Self-Help
1. Check `TROUBLESHOOTING.md` first
2. Search error message on Google
3. Check browser console (F12)

### Community
- [React Discord](https://discord.gg/react)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)
- GitHub Issues (for this template)

---

## 🎉 You're Ready!

**You now have everything you need to:**
- ✅ Run the portfolio locally
- ✅ Customize it for yourself
- ✅ Deploy to production
- ✅ Impress recruiters

**Next steps:**
1. Update your personal information
2. Add your best projects
3. Deploy to Vercel/Netlify
4. Share with the world!

---

**Questions?** Check the documentation files!

**Ready?** Start customizing and make it yours! 🚀

Good luck with your new portfolio! 💪

---

Built with ❤️ using React + Vite + TailwindCSS + Aceternity UI
