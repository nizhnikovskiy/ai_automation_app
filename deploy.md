# 🚀 Deployment Guide for GitHub Pages

## Quick Setup Steps

### 1. Update Configuration
Before deploying, update the following files with your GitHub username:

**In `package.json`:**
```json
"homepage": "https://YOUR_USERNAME.github.io/ai_automation_app"
```

**In `vite.config.ts`:**
```typescript
base: '/ai_automation_app/'
```

### 2. Deploy Options

#### Option A: Manual Deployment (Recommended for first time)
```bash
# Build and deploy
npm run build
npm run deploy
```

#### Option B: Automatic Deployment via GitHub Actions
1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

2. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "gh-pages"
   - Save

### 3. Access Your App
Your app will be available at:
`https://YOUR_USERNAME.github.io/ai_automation_app`

## 🔧 Troubleshooting

### Common Issues:

1. **404 Error**: Check that the repository name matches the base path in `vite.config.ts`
2. **Blank Page**: Ensure the homepage URL in `package.json` is correct
3. **Build Fails**: Make sure all dependencies are installed with `npm install`

### API Key Setup:
- Replace the placeholder API key in `src/App.tsx` with your actual OpenAI API key
- For production, consider using environment variables

## 📝 Notes
- The app uses Tailwind CSS via CDN for styling
- All builds are optimized for production
- The deployment creates a `gh-pages` branch automatically 