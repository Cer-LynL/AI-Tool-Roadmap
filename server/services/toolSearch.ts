import { getDatabase, AITool, ToolRow } from '../database/init';

// Helper function to convert ToolRow to AITool
function convertToolRowToAITool(tool: ToolRow): AITool {
  return {
    id: tool.id,
    name: tool.name,
    category: tool.category,
    description: tool.description,
    rating: tool.rating,
    pricing: tool.pricing,
    pros: JSON.parse(tool.pros || '[]') as string[],
    cons: JSON.parse(tool.cons || '[]') as string[],
    tags: JSON.parse(tool.tags || '[]') as string[],
    bestFor: tool.best_for || '',
    link: tool.link,
    createdAt: tool.created_at,
    updatedAt: tool.updated_at
  };
}

export async function searchTools(query: string): Promise<AITool[]> {
  const db = getDatabase();
  const searchTerms = query.toLowerCase().split(' ');
  
  // Build search query with scoring
  const searchQuery = `
    SELECT *, 
    (
      -- Name matches (highest priority)
      CASE WHEN LOWER(name) LIKE ? THEN 100 ELSE 0 END +
      -- Category matches
      CASE WHEN LOWER(category) LIKE ? THEN 50 ELSE 0 END +
      -- Description matches
      CASE WHEN LOWER(description) LIKE ? THEN 30 ELSE 0 END +
      -- Best for matches
      CASE WHEN LOWER(best_for) LIKE ? THEN 40 ELSE 0 END +
      -- Tags matches
      CASE WHEN LOWER(tags) LIKE ? THEN 60 ELSE 0 END +
      -- Rating bonus
      rating * 5
    ) as relevance_score
    FROM ai_tools
    WHERE 
      LOWER(name) LIKE ? OR
      LOWER(category) LIKE ? OR
      LOWER(description) LIKE ? OR
      LOWER(best_for) LIKE ? OR
      LOWER(tags) LIKE ?
    ORDER BY relevance_score DESC, rating DESC
    LIMIT 10
  `;

  // Create search patterns
  const allTermsPattern = `%${searchTerms.join('%')}%`;
  
  // Parameters for the query (5 for scoring + 5 for WHERE clause)
  const params = [
    allTermsPattern, allTermsPattern, allTermsPattern, allTermsPattern, allTermsPattern, // scoring
    allTermsPattern, allTermsPattern, allTermsPattern, allTermsPattern, allTermsPattern  // where clause
  ];

  try {
    const results = await db.all(searchQuery, params) as ToolRow[];
    
    // Parse JSON fields and normalize database field names
    const tools: AITool[] = results.map(convertToolRowToAITool);

    // Additional keyword-based filtering for better relevance
    return tools.filter(tool => {
      const toolText = `${tool.name} ${tool.category} ${tool.description} ${tool.bestFor} ${tool.tags.join(' ')}`.toLowerCase();
      return searchTerms.some(term => toolText.includes(term));
    });

  } catch (error) {
    console.error('Tool search error:', error);
    
    // Fallback: return popular tools if search fails
    const fallbackResults = await db.all(
      'SELECT * FROM ai_tools ORDER BY rating DESC LIMIT 5'
    ) as ToolRow[];
    
    return fallbackResults.map(convertToolRowToAITool);
  }
}

export async function getToolsByCategory(category: string): Promise<AITool[]> {
  const db = getDatabase();
  
  try {
    const results = await db.all(
      'SELECT * FROM ai_tools WHERE LOWER(category) = LOWER(?) ORDER BY rating DESC',
      [category]
    );
    
    return (results as ToolRow[]).map(convertToolRowToAITool);
  } catch (error) {
    console.error('Category search error:', error);
    return [];
  }
}

export async function getToolsByTags(tags: string[]): Promise<AITool[]> {
  const db = getDatabase();
  
  try {
    const tagConditions = tags.map(() => 'LOWER(tags) LIKE LOWER(?)').join(' OR ');
    const tagParams = tags.map(tag => `%"${tag}"%`);
    
    const results = await db.all(
      `SELECT * FROM ai_tools WHERE ${tagConditions} ORDER BY rating DESC LIMIT 10`,
      tagParams
    );
    
    return (results as ToolRow[]).map(convertToolRowToAITool);
  } catch (error) {
    console.error('Tag search error:', error);
    return [];
  }
}