# Project Reactions Setup Guide

## Overview
The ProjectReactionBar component provides interactive emoji reactions (🔥💡⚡🎨) for each project. It uses **Vercel KV (Redis)** for persistent storage so all visitors see the same counts.

## Features
- ✅ **4 reaction types**: Impressive, Innovative, Technical, Creative
- ✅ **One vote per reaction per project per visitor** (using browser fingerprinting)
- ✅ **Real-time count updates** across all visitors
- ✅ **Optimistic UI** with error recovery
- ✅ **Loading states** and animations
- ✅ **LocalStorage fallback** if API fails
- ✅ **Accessible** with ARIA labels

## Setup Instructions

### Step 1: Create a Vercel KV Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (Yogiraj-Portfolio)
3. Go to the **Storage** tab
4. Click **Create Database** → **KV**
5. Give it a name (e.g., `portfolio-reactions`)
6. Select a region close to your visitors
7. Click **Create**

### Step 2: Connect KV to Your Project

1. After creating the KV database, click **Connect to Project**
2. Select your portfolio project
3. Vercel will automatically add these environment variables:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

### Step 3: Deploy

```bash
# Push your changes
git add .
git commit -m "Add project reactions with Vercel KV"
git push origin main
```

Vercel will automatically deploy with the KV integration.

## Local Development

For local development, you can:

### Option A: Use Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run with Vercel's dev server
vercel dev
```

### Option B: Create `.env.local` manually

If you've already set up KV, get the credentials from Vercel Dashboard → Storage → Your KV → Settings:

```env
KV_URL=redis://...
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
KV_REST_API_READ_ONLY_TOKEN=...
```

## API Endpoints

### GET `/api/reactions`
Get reaction counts for a project.

**Query Parameters:**
- `projectId` (required): Unique project identifier
- `visitorId` (optional): To check if visitor has already voted

**Response:**
```json
{
  "counts": {
    "impressive": 5,
    "innovative": 3,
    "technical": 7,
    "creative": 2
  },
  "userReactions": {
    "impressive": true,
    "innovative": false,
    "technical": false,
    "creative": false
  },
  "projectId": "stockest"
}
```

### POST `/api/reactions`
Add a reaction.

**Body:**
```json
{
  "projectId": "stockest",
  "reactionId": "impressive",
  "visitorId": "v_abc123_xyz"
}
```

**Response:**
```json
{
  "success": true,
  "projectId": "stockest",
  "reactionId": "impressive",
  "newCount": 6
}
```

**Error (Already Voted - 409):**
```json
{
  "error": "Already voted",
  "message": "You have already reacted with this emoji on this project"
}
```

## File Structure

```
├── api/
│   └── reactions.js        # Vercel serverless function
├── src/
│   └── components/
│       └── ui/
│           └── ProjectReactionBar.jsx  # React component
└── vercel.json             # Updated with API routes
```

## How Vote Tracking Works

1. **Visitor ID Generation**: On first visit, a unique ID is generated using browser fingerprinting (canvas, user agent, screen size, etc.) and stored in localStorage.

2. **Vote Storage**: When a visitor votes, their `visitorId` is stored in KV:
   ```
   voted:{projectId}:{visitorId}:{reactionId} = "1"
   ```

3. **Count Storage**: Reaction counts are stored as a hash:
   ```
   reactions:{projectId} = { impressive: 5, innovative: 3, ... }
   ```

4. **Duplicate Prevention**: Before accepting a vote, the API checks if the `voted:*` key exists.

## Troubleshooting

### "Failed to load reactions" error
- Check that KV is connected to your project
- Verify environment variables are set
- Check Vercel function logs for errors

### Counts reset on deploy
- This shouldn't happen as KV persists data
- If it does, check your KV database is still connected

### Votes not persisting
- Check browser console for API errors
- Verify the API response in Network tab
- Ensure visitor ID is being generated (check localStorage for `portfolio_visitor_id`)
