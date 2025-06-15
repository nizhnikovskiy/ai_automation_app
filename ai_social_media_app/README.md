# AI Social Media Automation

A React-based frontend demo for an AI Social Media Automation MVP. This SaaS platform helps small business owners automate their social media presence using AI-powered content generation.

## 🚀 Features

- **AI Content Generation**: Create engaging social media posts tailored to your business
- **Image Generation**: Generate professional images using DALL-E 3
- **Multi-Platform Support**: Optimized for Instagram, Facebook, Twitter, LinkedIn, and TikTok
- **Trend Integration**: Incorporate current trends into your content
- **Business-Specific**: Customized for different business types (Plumbing, HVAC, Restaurants, etc.)
- **Modern UI**: Beautiful dark theme with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS (CDN)
- **Build Tool**: Vite
- **AI Integration**: OpenAI GPT-4 & DALL-E 3
- **Deployment**: GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/ai_social_media_app.git
cd ai_social_media_app
```

2. Install dependencies:
```bash
npm install
```

3. Add your OpenAI API key:
   - Open `src/App.tsx`
   - Replace `YOUR_OPENAI_API_KEY_HERE` with your actual OpenAI API key

4. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment to GitHub Pages

### Method 1: Manual Deployment

1. **Update the homepage URL** in `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/ai_social_media_app"
   ```

2. **Build and deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

### Method 2: Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Click "Save"

3. **Your app will be available at**:
   `https://YOUR_USERNAME.github.io/ai_social_media_app`

## 🔧 Configuration

### OpenAI API Setup

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Ensure you have access to:
   - GPT-4 or GPT-4o for text generation
   - DALL-E 3 for image generation
3. Replace the API key in `src/App.tsx`

### Customization

- **Business Types**: Edit the options in the Business Type dropdown
- **Platforms**: Modify the platform options for different social media networks
- **Styling**: Customize colors and themes in `src/index.css`
- **Prompts**: Adjust the AI prompts for different content styles

## 📁 Project Structure

```
ai_social_media_app/
├── public/
├── src/
│   ├── App.tsx          # Main application component
│   ├── index.css        # Tailwind CSS and custom styles
│   └── main.tsx         # Application entry point
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions deployment
├── index.html           # HTML template with Tailwind CDN
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

## 🎯 Usage

1. **Select Business Type**: Choose your business category
2. **Choose Platform**: Select the social media platform
3. **Enter Trend**: Add current trends to incorporate
4. **Describe Post**: Enter what you want the post to be about
5. **Generate**: Click to create both post content and image
6. **Regenerate**: Use individual buttons to regenerate post or image

## 🔒 Security Note

**Important**: This is a demo application. In production:
- Store API keys securely (environment variables, not in code)
- Implement proper authentication
- Add rate limiting and error handling
- Use a backend service for API calls

## 📝 License

This project is for demonstration purposes. Please ensure you comply with OpenAI's usage policies when using their APIs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Note**: Remember to replace `YOUR_USERNAME` with your actual GitHub username in the configuration files!
