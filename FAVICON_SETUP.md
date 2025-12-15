# Favicon & OG Image Setup Instructions

## 1. Favicon Files (Quick Setup)

### Option A: Use Online Generator (Recommended - 2 minutes)
1. Go to https://favicon.io/favicon-converter/
2. Upload your profile picture or use the included `favicon.svg`
3. Download the generated package
4. Extract and place these files in `/public/`:
   - `favicon.ico`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png` (180x180)

### Option B: Quick Manual Setup
The included `favicon.svg` has your initials "YS". You can:
1. Rename `favicon.svg` to `favicon.ico` (browser will handle it)
2. Or use an image editor to export PNG versions

## 2. OG Image (Social Media Preview)

### Create Your OG Image (1200x630px):
1. Go to https://www.canva.com/ (free)
2. Search for "Open Graph" template or create custom 1200x630px
3. Add:
   - Your name: "Yogiraj Shinde"
   - Title: "MERN Stack Developer"
   - Subtitle: "3+ Years Experience | 10+ Projects"
   - Your profile photo
   - Tech stack icons (React, Node, MongoDB, etc.)
   - Teal/dark background matching portfolio theme
4. Export as `og-image.png`
5. Place in `/public/` folder

### Quick Alternative:
Use your existing profile pic:
1. Copy `src/Yogiraj Pic.jpg` to `public/og-image.png`
2. This works but a custom designed OG image is better

## 3. Update URLs in index.html

After deploying, replace `https://yogirajshinde.com/` with your actual domain in:
- Line 16: `<meta property="og:url" ... />`
- Line 19: `<meta property="og:image" ... />`
- Line 22: `<meta property="twitter:url" ... />`
- Line 25: `<meta property="twitter:image" ... />`

## Testing

### Test Favicon:
- Run `npm run dev` and check browser tab icon

### Test OG Preview:
1. Deploy your site
2. Test at: https://www.opengraph.xyz/
3. Or share link on LinkedIn/Twitter to see preview

---

**Note:** The portfolio is ready to deploy without these! The OG image will fallback gracefully, and favicons are optional polish.
