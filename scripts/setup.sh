#!/bin/bash

echo "🚀 Setting up AI Tool Roadmap application..."

# Create data directory if it doesn't exist
mkdir -p data

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📄 Creating .env file from template..."
    cp .env.example .env
    echo "✅ Please edit .env file with your API keys if you have them"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "✅ Setup complete! You can now run:"
echo "   npm run dev    # Start development server"
echo "   npm run build  # Build for production"
echo ""
echo "📝 Optional: Edit .env file to add API keys for enhanced functionality"
echo "   - YOUTUBE_API_KEY: For real YouTube video results"
echo "   - OPENAI_API_KEY: For enhanced AI-powered search"