import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../../data/app.db');

export interface AITool {
  id?: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  pricing: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  link: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SearchQuery {
  id?: number;
  query: string;
  results: string | null;
  timestamp: string;
}

export interface DatabaseRow {
  [key: string]: string | number | null | undefined;
}

export interface ToolRow extends DatabaseRow {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  pricing: string;
  pros: string;
  cons: string;
  best_for: string;
  link: string;
  tags: string;
  created_at: string;
  updated_at: string;
}

export interface CountRow {
  count: number;
}

class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(DB_PATH);
  }

  async run(sql: string, params: (string | number | null)[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err: Error | null) {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async get(sql: string, params: (string | number | null)[] = []): Promise<DatabaseRow | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err: Error | null, row: DatabaseRow | undefined) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async all(sql: string, params: (string | number | null)[] = []): Promise<DatabaseRow[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err: Error | null, rows: DatabaseRow[]) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err: Error | null) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  // Typed helper methods for specific operations
  async getTools(): Promise<ToolRow[]> {
    const rows = await this.all('SELECT * FROM ai_tools ORDER BY rating DESC');
    return rows as ToolRow[];
  }

  async getToolById(id: number): Promise<ToolRow | undefined> {
    const row = await this.get('SELECT * FROM ai_tools WHERE id = ?', [id]);
    return row as ToolRow | undefined;
  }

  async searchToolsByQuery(query: string): Promise<ToolRow[]> {
    const searchPattern = `%${query.toLowerCase()}%`;
    const rows = await this.all(`
      SELECT * FROM ai_tools 
      WHERE LOWER(name) LIKE ? 
         OR LOWER(category) LIKE ? 
         OR LOWER(description) LIKE ? 
         OR LOWER(best_for) LIKE ? 
         OR LOWER(tags) LIKE ?
      ORDER BY rating DESC
    `, [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern]);
    return rows as ToolRow[];
  }

  async getSearchQueries(limit: number = 10): Promise<SearchQuery[]> {
    const rows = await this.all(
      'SELECT id, query, results, timestamp FROM search_queries ORDER BY timestamp DESC LIMIT ?',
      [limit]
    );
    return rows.map(row => ({
      id: row.id as number,
      query: row.query as string,
      results: row.results as string | null,
      timestamp: row.timestamp as string
    }));
  }
}

let dbInstance: Database;

export function getDatabase(): Database {
  if (!dbInstance) {
    dbInstance = new Database();
  }
  return dbInstance;
}

export async function initializeDatabase(): Promise<void> {
  const db = getDatabase();
  
  // Create tables
  await db.run(`
    CREATE TABLE IF NOT EXISTS ai_tools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      rating REAL DEFAULT 0,
      pricing TEXT,
      pros TEXT, -- JSON array as string
      cons TEXT, -- JSON array as string
      best_for TEXT,
      link TEXT,
      tags TEXT, -- JSON array as string
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS search_queries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      query TEXT NOT NULL,
      results TEXT, -- JSON string
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create indexes
  await db.run(`CREATE INDEX IF NOT EXISTS idx_tools_category ON ai_tools(category)`);
  await db.run(`CREATE INDEX IF NOT EXISTS idx_tools_tags ON ai_tools(tags)`);
  await db.run(`CREATE INDEX IF NOT EXISTS idx_queries_timestamp ON search_queries(timestamp)`);

  console.log('✅ Database initialized successfully');
  
  // Seed with some initial data if empty
  await seedInitialData(db);
}

async function seedInitialData(db: Database): Promise<void> {
  const existingTools = await db.get('SELECT COUNT(*) as count FROM ai_tools') as CountRow | undefined;
  
  if (!existingTools || existingTools.count === 0) {
    console.log('🌱 Seeding initial tool data...');
    
    const initialTools: Omit<AITool, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: "Lovable (formerly GPT Engineer)",
        category: "No-Code Development",
        description: "AI-powered web app builder that generates production-ready React applications from simple text descriptions.",
        rating: 4.8,
        pricing: "Free tier, $20/month Pro",
        pros: ["Generates complete React applications", "No coding experience required", "Rapid prototyping capabilities", "Export source code"],
        cons: ["Limited customization for complex logic", "May require technical review", "Template-based outputs"],
        bestFor: "Solo founders and entrepreneurs who need to quickly validate ideas with functional prototypes",
        link: "https://lovable.dev",
        tags: ["no-code", "react", "web-development", "mvp", "startup"]
      },
      {
        name: "Cursor",
        category: "AI-Powered IDE",
        description: "Advanced code editor with AI pair programming capabilities, perfect for developers building custom solutions.",
        rating: 4.9,
        pricing: "Free, $20/month Pro",
        pros: ["Real-time AI code suggestions", "Natural language to code conversion", "Excellent for full-stack development", "Integrates with existing workflows"],
        cons: ["Requires programming knowledge", "Can be overwhelming for beginners", "Subscription required for advanced features"],
        bestFor: "Developers and technical founders who want to accelerate their coding process",
        link: "https://cursor.sh",
        tags: ["ide", "coding", "development", "ai-assistant", "programming"]
      },
      {
        name: "Webflow",
        category: "Website Builder",
        description: "Professional website builder with advanced design capabilities and CMS functionality.",
        rating: 4.7,
        pricing: "Free tier, $12-$39/month",
        pros: ["Professional design capabilities", "Built-in CMS", "SEO-friendly", "No coding required"],
        cons: ["Learning curve for advanced features", "Can be expensive for multiple sites", "Limited e-commerce on basic plans"],
        bestFor: "Designers and businesses who need professional websites without coding",
        link: "https://webflow.com",
        tags: ["website", "design", "cms", "landing-page", "no-code"]
      },
      {
        name: "ChatGPT",
        category: "AI Assistant",
        description: "Advanced AI chatbot for content creation, coding help, and general assistance.",
        rating: 4.6,
        pricing: "Free tier, $20/month Plus",
        pros: ["Versatile content creation", "Code generation and debugging", "Multiple languages", "Large knowledge base"],
        cons: ["Can provide outdated information", "May generate incorrect code", "Rate limits on free tier"],
        bestFor: "Content creators, developers, and professionals needing AI assistance",
        link: "https://chat.openai.com",
        tags: ["ai-assistant", "content", "coding", "writing", "general-purpose"]
      }
    ];

    for (const tool of initialTools) {
      await db.run(`
        INSERT INTO ai_tools (name, category, description, rating, pricing, pros, cons, best_for, link, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        tool.name,
        tool.category,
        tool.description,
        tool.rating,
        tool.pricing,
        JSON.stringify(tool.pros),
        JSON.stringify(tool.cons),
        tool.bestFor,
        tool.link,
        JSON.stringify(tool.tags)
      ] as (string | number)[]);
    }

    console.log('✅ Initial tool data seeded');
  }
}