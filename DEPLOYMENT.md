# GitHub Codespaces Quota Calculator - Deployment Guide

## Overview

This is a static Next.js application that calculates GitHub Codespaces usage and costs. It's configured for deployment to GitHub Pages with automatic builds via GitHub Actions.

## Deployment Options

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Push to your repository:**
   \`\`\`bash
   git add .
   git commit -m "Add Codespaces calculator"
   git push origin main
   \`\`\`

2. **Enable GitHub Pages:**
   - Go to your repository Settings → Pages
   - Under "Build and deployment", select "GitHub Actions"
   - The workflow will automatically trigger on push to main

3. **Access your calculator:**
   - If on a personal repo (username.github.io): `https://username.github.io`
   - If on a regular repo: `https://username.github.io/repo-name`

### Option 2: Deploy to Vercel

1. **Push to GitHub (if not already done)**

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repository
   - Accept default settings
   - Click "Deploy"

3. **Access your calculator:**
   - Vercel provides a unique URL (e.g., `codespaces-calc.vercel.app`)

### Option 3: Local Development

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open in browser:**
   - Visit `http://localhost:3000`

## Configuration for GitHub Pages Subdirectory

If deploying to a subdirectory (e.g., `username.github.io/repo-name`), update `next.config.mjs`:

\`\`\`javascript
const nextConfig = {
  output: 'export',
  basePath: '/repo-name', // Add this line
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}
\`\`\`

Then update the GitHub Actions workflow to use this configuration.

## Pricing Data

The calculator includes hardcoded pricing as of early 2026:

- **Free Plan:** 120 core-hours/month, 15 GB storage
- **Pro Plan:** 180 core-hours/month, 20 GB storage
- **Team/Enterprise:** Pay-as-you-go

Overage rates:
- 2-core: $0.18/hour
- 4-core: $0.36/hour
- 8-core: $0.72/hour
- Storage: $0.07/GB-month

To update these values, edit `/lib/constants.ts` and `/app/page.tsx`.

## Features

- Real-time calculation as you input usage
- Support for multiple machine types (2, 4, 8-core)
- Storage overage calculation
- Visual progress bar showing quota usage
- Cost breakdown for compute and storage
- Responsive design for mobile and desktop
- No backend required - fully client-side

## Building for Production

\`\`\`bash
npm run build
\`\`\`

The output is generated in the `out` directory, ready for static hosting.

## Troubleshooting

**Calculator not updating?**
- Check browser console for errors
- Clear browser cache and reload

**GitHub Pages showing 404?**
- Verify Pages is enabled in Settings → Pages
- Check that "GitHub Actions" is selected as the source
- Wait a few minutes for the first deployment

**Need to change pricing?**
- Edit `/lib/constants.ts` for plans and quotas
- Edit `/app/page.tsx` for displayed information
- Prices are used in `/lib/calculator.ts` for cost calculations

## License

MIT
