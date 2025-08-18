# AI Tool Roadmap

A production-ready web application that helps users discover the perfect AI tools for their specific needs. Get personalized recommendations, step-by-step roadmaps, and curated resources to achieve your goals faster.

## Features

- 🔍 **Smart Search**: AI-powered search that understands your goals and recommends relevant tools
- 🛠️ **Curated Tool Database**: Comprehensive database of AI tools with ratings, pricing, and detailed information
- 🗺️ **Step-by-Step Roadmaps**: Personalized roadmaps for different project types (MVP, Landing Page, Content Creation, etc.)
- 📺 **Learning Resources**: Integrated YouTube videos and additional resources for each search
- 🎨 **Modern UI**: Beautiful, responsive design built with React and Tailwind CSS
- 🚀 **Production Ready**: Full backend API, database, and deployment configuration

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for fast development and building
- **Lucide React** for icons

### Backend
- **Express.js** with TypeScript
- **SQLite** database for data persistence
- **Real API integrations** (YouTube, tool databases)
- **RESTful API** design

### Deployment
- **Docker** containerization
- **Nginx** reverse proxy
- **Multi-stage builds** for optimization

## Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### 1. Setup
```bash
# Clone and setup
git clone <your-repo>
cd ai-tool-roadmap
./scripts/setup.sh
```

### 2. Development
```bash
# Start both frontend and backend
npm run dev

# Or start them separately
npm run dev:client  # Frontend on http://localhost:5173
npm run dev:server  # Backend on http://localhost:3001
```

### 3. Production Build
```bash
npm run build
npm run build:server
npm start
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Optional API Keys (app works without them)
YOUTUBE_API_KEY=your_youtube_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Database
DATABASE_PATH=./data/app.db
```

**Note**: The application works fully without API keys by using curated data. API keys enhance functionality with real-time data.

## Deployment Options

### Option 1: Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t ai-tool-roadmap .
docker run -p 3001:3001 ai-tool-roadmap
```

### Option 2: Traditional Hosting

```bash
# Build the application
npm run build
npm run build:server

# Start the server
npm start
```

### Option 3: Cloud Platforms

#### Vercel/Netlify (Frontend) + Railway/Heroku (Backend)
1. Deploy frontend to Vercel/Netlify
2. Deploy backend to Railway/Heroku
3. Update `VITE_API_URL` environment variable

#### Single Platform (e.g., Railway, Render)
1. Use the provided Dockerfile
2. Set environment variables
3. Deploy with automatic builds

## API Documentation

### Search Endpoint
```http
POST /api/search
Content-Type: application/json

{
  "query": "Build an MVP for my startup"
}
```

### Tools Endpoint
```http
GET /api/tools?category=No-Code Development&limit=10
GET /api/tools/1
GET /api/tools/meta/categories
```

### Health Check
```http
GET /api/health
```

## Project Structure

```
ai-tool-roadmap/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── context/           # React context providers
│   ├── services/          # API client and services
│   └── data/              # Legacy mock data (now unused)
├── server/                # Backend Express application
│   ├── routes/            # API routes
│   ├── services/          # Business logic services
│   ├── database/          # Database setup and models
│   └── index.ts           # Server entry point
├── scripts/               # Setup and deployment scripts
├── Dockerfile             # Container configuration
├── docker-compose.yml     # Multi-service deployment
└── nginx.conf             # Nginx configuration
```

## Key Improvements from Prototype

### 🔄 Replaced Hard-coded Logic
- ✅ Real database with SQLite
- ✅ Dynamic search algorithm with scoring
- ✅ API-driven architecture
- ✅ Configurable data sources

### 🚀 Added Production Features
- ✅ Error handling and fallbacks
- ✅ Database persistence
- ✅ API rate limiting ready
- ✅ Docker containerization
- ✅ Environment configuration
- ✅ Logging and monitoring ready

### 📈 Enhanced Functionality
- ✅ Smart search with relevance scoring
- ✅ Extensible roadmap generation
- ✅ Real YouTube API integration option
- ✅ Admin endpoints for tool management
- ✅ Search history tracking

## Customization

### Adding New Tools
```bash
curl -X POST http://localhost:3001/api/tools \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New AI Tool",
    "category": "AI Assistant",
    "description": "Description here",
    "rating": 4.5,
    "pricing": "Free tier available",
    "pros": ["Pro 1", "Pro 2"],
    "cons": ["Con 1"],
    "bestFor": "Who this is best for",
    "link": "https://example.com",
    "tags": ["tag1", "tag2"]
  }'
```

### Custom Roadmaps
Edit `server/services/roadmap.ts` to add new roadmap templates for different query types.

### Styling
The app uses Tailwind CSS. Customize the design by editing the components in `src/components/`.

## Monitoring & Analytics

### Built-in Features
- Search query logging
- Error tracking
- Performance monitoring ready

### Recommended Additions
- **Sentry** for error tracking
- **Google Analytics** for user analytics
- **Prometheus** for server metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this for your own projects!

## Support

For questions or issues:
1. Check the GitHub issues
2. Review the API documentation
3. Examine the example environment configuration

---

**Ready to deploy!** 🚀 This application is production-ready and can be deployed to any platform that supports Node.js and Docker.
