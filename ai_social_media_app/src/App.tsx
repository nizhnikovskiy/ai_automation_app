import { useState } from 'react';

// Demo key - replace with your actual key in production
const OPENAI_API_KEY = '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';

// Pre-filled example values
const defaultValues = {
  businessType: 'Plumbing',
  platform: 'Instagram',
  trend: 'Spring home maintenance',
  prompt: 'Spring plumbing maintenance tips and special offer'
};

function AiSocialPostGenerator() {
  const [prompt, setPrompt] = useState(defaultValues.prompt);
  const [businessType, setBusinessType] = useState(defaultValues.businessType);
  const [platform, setPlatform] = useState(defaultValues.platform);
  const [trend, setTrend] = useState(defaultValues.trend);
  const [result, setResult] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePost = async () => {
    setLoading(true);
    setError('');
    setResult('');
    setImagePrompt('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are a social media expert for ${businessType} businesses. Create a single, engaging social media post for ${platform}. 
              The post should be about: ${prompt}
              Current trend to incorporate: ${trend}
              
              Requirements:
              - Write the post directly without any labels or formatting
              - Include 3-5 relevant hashtags at the end
              - Keep it concise and engaging
              - Include a clear call-to-action
              - Optimize for ${platform}'s format
              - Make it sound natural and professional`
            }
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('No content in response');
      }
      setResult(data.choices[0].message.content);
      // Automatically generate image after post is generated
      await generateImage(data.choices[0].message.content);
    } catch (e) {
      setError('Failed to generate post. Check your API key and network.');
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async (postContent?: string) => {
    if (!result && !postContent) {
      setError('Please generate a post first');
      return;
    }

    setImageLoading(true);
    setError('');
    setImagePrompt('');

    try {
      const imageRes = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: `Create a professional, eye-catching image for a ${businessType} business social media post. 
          The post is about: ${prompt}
          
          Requirements:
          - NO TEXT OR WORDS in the image
          - NO LETTERS, NUMBERS, OR SYMBOLS
          - Professional and modern style
          - Suitable for ${platform}
          - Vibrant colors
          - High quality
          - Clean and minimalist design
          - Avoid any controversial or inappropriate content
          - Focus on visual elements only`,
          n: 1,
          size: '1024x1024',
          quality: "standard",
          style: "natural"
        }),
      });

      if (!imageRes.ok) {
        const errorData = await imageRes.json();
        console.error('Image generation error:', errorData);
        throw new Error(`Image generation failed: ${errorData.error?.message || 'Unknown error'}`);
      }
      const imageData = await imageRes.json();
      if (!imageData.data?.[0]?.url) {
        throw new Error('No image URL in response');
      }
      setImagePrompt(imageData.data[0].url);
    } catch (e) {
      setError('Failed to generate image. Check your API key and network.');
    } finally {
      setImageLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    await generatePost();
    setLoading(false);
  };

  const handleRegenerateImage = async () => {
    await generateImage();
  };

  return (
    <div className="card col-span-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">AI Social Post Generator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Business Type</label>
          <select 
            value={businessType} 
            onChange={(e) => setBusinessType(e.target.value)}
            className="select-field"
          >
            <option value="Plumbing">Plumbing</option>
            <option value="Roofing">Roofing</option>
            <option value="HVAC">HVAC</option>
            <option value="Electrical">Electrical</option>
            <option value="Landscaping">Landscaping</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Retail">Retail</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Platform</label>
          <select 
            value={platform} 
            onChange={(e) => setPlatform(e.target.value)}
            className="select-field"
          >
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="TikTok">TikTok</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Current Trend</label>
          <input 
            type="text" 
            value={trend} 
            onChange={(e) => setTrend(e.target.value)}
            placeholder="e.g., Spring home maintenance"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Post Topic</label>
          <input 
            type="text" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What should the post be about?"
            className="input-field"
          />
        </div>
      </div>

      <button 
        onClick={handleGenerate}
        disabled={loading}
        className="btn-primary w-full py-3 text-lg mb-6 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="spinner w-5 h-5"></div>
            Generating...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate Post & Image
          </>
        )}
      </button>

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {/* Image Container */}
      <div className="flex justify-center items-center min-h-[300px] bg-slate-900 rounded-lg relative mb-6">
        {imageLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="spinner w-10 h-10"></div>
            <div className="text-primary-400 font-medium">Generating image...</div>
          </div>
        )}
        {imagePrompt && (
          <img 
            src={imagePrompt} 
            alt="Generated social media post" 
            className="max-w-[80%] max-h-[300px] object-contain rounded-lg shadow-lg"
          />
        )}
        {!imagePrompt && !imageLoading && (
          <div className="text-slate-500 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>Generated image will appear here</p>
          </div>
        )}
      </div>
      
      {/* Post Content */}
      {result && (
        <>
          <div className="bg-slate-900 rounded-lg p-6 mb-6">
            <div className="text-primary-400 font-medium mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1.586l-4 4z" />
              </svg>
              Generated Post
            </div>
            <div className="text-white whitespace-pre-wrap leading-relaxed text-lg">
              {result}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={generatePost}
              disabled={loading}
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Regenerate Post
            </button>
            <button 
              onClick={handleRegenerateImage}
              disabled={loading || !result || imageLoading}
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              {imageLoading ? (
                <>
                  <div className="spinner w-4 h-4"></div>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Regenerate Image
                </>
              )}
            </button>
          </div>
        </>
      )}
      
      <div className="mt-6 text-sm text-yellow-400 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span><strong>Note:</strong> Demo only.</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient">AI Social Media Automation</h1>
                <p className="text-slate-400 text-sm">Automate your social media presence with AI</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium">
                MVP Demo
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Transform Your Social Media
            <span className="text-gradient block">With AI-Powered Content</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Generate engaging social media posts and stunning visuals for your business in seconds. 
            Perfect for small business owners who want to maintain a professional social media presence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Feature 1 */}
          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Content Generation</h3>
            <p className="text-slate-400">Create engaging posts tailored to your business and platform with advanced AI.</p>
          </div>

          {/* Feature 2 */}
          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Visual Content</h3>
            <p className="text-slate-400">Generate professional images that perfectly complement your social media posts.</p>
          </div>

          {/* Feature 3 */}
          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Trend Integration</h3>
            <p className="text-slate-400">Stay relevant by incorporating current trends into your content strategy.</p>
          </div>
        </div>

        {/* Main Generator */}
        <div className="grid grid-cols-1 gap-8">
          <AiSocialPostGenerator />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800/50 border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-400">
              © 2024 AI Social Media Automation. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
