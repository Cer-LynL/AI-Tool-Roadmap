import { Router } from 'express';
import { getDatabase } from '../database/init';
import { searchYouTubeVideos } from '../services/youtube';
import { generateRoadmap } from '../services/roadmap';
import { findAdditionalResources } from '../services/resources';
import { searchTools } from '../services/toolSearch';
import { generateOptimizedPrompt } from '../services/promptOptimization';

const router = Router();

// Main search endpoint
router.post('/', async (req, res): Promise<void> => {
  try {
    const { query } = req.body;
    
    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'Query is required and must be a string' });
      return;
    }

    console.log(`🔍 Processing search query: "${query}"`);

    // Store search query in database
    const db = getDatabase();
    await db.run(
      'INSERT INTO search_queries (query) VALUES (?)',
      [query]
    );

    // Perform parallel searches and generate optimized prompt
    const [recommendedTools, youtubeVideos, roadmap, additionalResources, optimizedPrompt] = await Promise.all([
      searchTools(query),
      searchYouTubeVideos(query),
      generateRoadmap(query),
      findAdditionalResources(query),
      Promise.resolve(generateOptimizedPrompt(query))
    ]);

    const results = {
      recommendedTools,
      youtubeVideos,
      roadmap,
      additionalResources,
      optimizedPrompt,
      query,
      timestamp: new Date().toISOString()
    };

    // Update the search query with results
    await db.run(
      'UPDATE search_queries SET results = ? WHERE query = ? AND results IS NULL ORDER BY timestamp DESC LIMIT 1',
      [JSON.stringify(results), query]
    );

    res.json(results);
  } catch (error: unknown) {
    console.error('Search error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
});

// Get search history
router.get('/history', async (req, res) => {
  try {
    const db = getDatabase();
    const limit = parseInt(req.query.limit as string) || 10;
    
    const history = await db.all(
      'SELECT query, timestamp FROM search_queries ORDER BY timestamp DESC LIMIT ?',
      [limit]
    );

    res.json(history);
  } catch (error: unknown) {
    console.error('History error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: 'Failed to fetch search history',
      message: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
});

export { router as searchRoutes };