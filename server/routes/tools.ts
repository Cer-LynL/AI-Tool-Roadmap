import { Router } from 'express';
import { getDatabase, AITool } from '../database/init';

const router = Router();

// Get all tools
router.get('/', async (req, res) => {
  try {
    const db = getDatabase();
    const { category, limit = '50', offset = '0' } = req.query;

    let query = 'SELECT * FROM ai_tools';
    const params: (string | number)[] = [];

    if (category && typeof category === 'string') {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY rating DESC, name ASC LIMIT ? OFFSET ?';
    params.push(parseInt(limit as string), parseInt(offset as string));

    const tools = await db.all(query, params);
    
    // Parse JSON fields
    const parsedTools = tools.map(tool => ({
      ...tool,
      pros: JSON.parse(tool.pros as string || '[]'),
      cons: JSON.parse(tool.cons as string || '[]'),
      tags: JSON.parse(tool.tags as string || '[]'),
      bestFor: tool.best_for as string || ''
    }));

    res.json(parsedTools);
  } catch (error: unknown) {
    console.error('Tools fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
});

// Get tool by ID
router.get('/:id', async (req, res) => {
  try {
    const db = getDatabase();
    const { id } = req.params;

    const tool = await db.get('SELECT * FROM ai_tools WHERE id = ?', [id]);

    if (!tool) {
      res.status(404).json({ error: 'Tool not found' });
      return;
    }

    // Parse JSON fields
    const parsedTool = {
      ...tool,
      pros: JSON.parse(tool.pros as string || '[]'),
      cons: JSON.parse(tool.cons as string || '[]'),
      tags: JSON.parse(tool.tags as string || '[]'),
      bestFor: tool.best_for as string || ''
    };

    res.json(parsedTool);
  } catch (error: unknown) {
    console.error('Tool fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch tool' });
  }
});

// Add new tool (admin endpoint)
router.post('/', async (req, res) => {
  try {
    const db = getDatabase();
    const tool: Omit<AITool, 'id' | 'createdAt' | 'updatedAt'> = req.body;

    // Validate required fields
    if (!tool.name || !tool.category || !tool.description || !tool.link) {
      res.status(400).json({ error: 'name, category, description, and link are required' });
      return;
    }

    await db.run(`
      INSERT INTO ai_tools (name, category, description, rating, pricing, pros, cons, best_for, link, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      tool.name,
      tool.category,
      tool.description,
      tool.rating || 0,
      tool.pricing || '',
      JSON.stringify(tool.pros || []),
      JSON.stringify(tool.cons || []),
      tool.bestFor || '',
      tool.link,
      JSON.stringify(tool.tags || [])
    ]);

    res.status(201).json({ message: 'Tool added successfully' });
  } catch (error: unknown) {
    console.error('Tool creation error:', error);
    res.status(500).json({ error: 'Failed to create tool' });
  }
});

// Get categories
router.get('/meta/categories', async (req, res) => {
  try {
    const db = getDatabase();
    const categories = await db.all('SELECT DISTINCT category FROM ai_tools ORDER BY category');
    res.json(categories.map(c => c.category));
  } catch (error: unknown) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

export { router as toolsRoutes };