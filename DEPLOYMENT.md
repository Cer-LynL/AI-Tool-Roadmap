# Deployment Guide

## Pre-Deployment Checklist

### ✅ Code & Configuration
- [x] Hard-coded mock data replaced with real API
- [x] Database setup with SQLite
- [x] Environment variables configured
- [x] Error handling implemented
- [x] Production build tested
- [x] Docker configuration ready

### 🔧 Environment Setup
- [x] `.env.example` provided with all required variables
- [x] Database initialization script included
- [x] Setup script created (`scripts/setup.sh`)

### 🚀 Deployment Options Ready
- [x] Docker + Docker Compose configuration
- [x] Traditional Node.js deployment
- [x] Cloud platform compatibility (Railway, Render, Heroku)
- [x] Static site deployment option (Vercel/Netlify + API backend)

## Quick Deployment Commands

### Local Development
```bash
./scripts/setup.sh
npm run dev
```

### Production with Docker
```bash
docker-compose up -d
```

### Traditional Deployment
```bash
npm run build
npm run build:server
npm start
```

### Cloud Platform (Railway/Render)
1. Connect your Git repository
2. Set environment variables from `.env.example`
3. Use the provided `Dockerfile`
4. Deploy!

## Environment Variables for Production

### Required
```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.com
```

### Optional (enhances functionality)
```
YOUTUBE_API_KEY=your_youtube_api_key
OPENAI_API_KEY=your_openai_api_key
```

## Post-Deployment

### Health Check
- Visit `/api/health` to verify backend is running
- Test search functionality
- Verify database is working (search results are saved)

### Monitoring
- Check server logs for any errors
- Monitor database size (SQLite file in `data/` directory)
- Set up analytics if desired

### Scaling Considerations
- SQLite is perfect for small to medium traffic
- For high traffic, consider migrating to PostgreSQL
- Add Redis for caching if needed
- Use a CDN for static assets

## Troubleshooting

### Common Issues
1. **Database not found**: Ensure `data/` directory exists and is writable
2. **API calls failing**: Check CORS settings and frontend API URL
3. **Build failures**: Verify all dependencies are installed
4. **Port conflicts**: Change PORT in environment variables

### Support
- Check GitHub issues
- Review logs in `console` or deployment platform
- Verify environment variables are set correctly