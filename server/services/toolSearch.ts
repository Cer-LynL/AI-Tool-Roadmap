import { getDatabase, AITool } from '../database/init';

export async function searchTools(query: string): Promise<AITool[]> {
  const db = getDatabase();
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  if (searchTerms.length === 0) {
    // Return popular tools if no search terms
    const results = await db.all('SELECT * FROM ai_tools ORDER BY rating DESC LIMIT 10');
    return results.map(tool => parseToolFromDB(tool));
  }

  try {
    // Use a simpler approach with multiple OR conditions
    const searchPattern = `%${searchTerms.join('%')}%`;
    
    const searchQuery = `
      SELECT *,
      (CASE 
        WHEN LOWER(name) LIKE ? THEN 100
        WHEN LOWER(category) LIKE ? THEN 80
        WHEN LOWER(description) LIKE ? THEN 60
        WHEN LOWER(best_for) LIKE ? THEN 70
        WHEN LOWER(tags) LIKE ? THEN 85
        ELSE 0
      END + rating * 5) as relevance_score
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

    const params = [
      searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, // scoring
      searchPattern, searchPattern, searchPattern, searchPattern, searchPattern  // where clause
    ];

    const results = await db.all(searchQuery, params);
    return results.map(tool => parseToolFromDB(tool));

  } catch (error) {
    console.error('Tool search error:', error);
    
    // Fallback: return popular tools if search fails
    try {
      const fallbackResults = await db.all('SELECT * FROM ai_tools ORDER BY rating DESC LIMIT 5');
      return fallbackResults.map(tool => parseToolFromDB(tool));
    } catch (fallbackError) {
      console.error('Fallback search also failed:', fallbackError);
      return [];
    }
  }
}

// Helper function to parse tool data from database
function parseToolFromDB(tool: any): AITool {
  return {
    ...tool,
    pros: JSON.parse(tool.pros || '[]'),
    cons: JSON.parse(tool.cons || '[]'),
    tags: JSON.parse(tool.tags || '[]')
  };
}

export async function getToolsByCategory(category: string): Promise<AITool[]> {
  const db = getDatabase();
  
  try {
    const results = await db.all(
      'SELECT * FROM ai_tools WHERE LOWER(category) = LOWER(?) ORDER BY rating DESC',
      [category]
    );
    
    return results.map(tool => parseToolFromDB(tool));
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
    
    return results.map(tool => parseToolFromDB(tool));
  } catch (error) {
    console.error('Tag search error:', error);
    return [];
  }
}