import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'app.db');

// Ensure the data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(`📁 Created data directory: ${dataDir}`);
}

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
  results: string;
  timestamp: string;
}

class Database {
  private db: sqlite3.Database;

  constructor() {
    console.log(`🗄️  Connecting to database at: ${DB_PATH}`);
    this.db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('❌ Database connection failed:', err);
        throw err;
      } else {
        console.log('✅ Database connected successfully');
      }
    });
  }

  async run(sql: string, params: any[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async get(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async all(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
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
  
  try {
    // Create tables
    await db.run(`
      CREATE TABLE IF NOT EXISTS ai_tools (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        rating REAL DEFAULT 0,
        pricing TEXT,
        pros TEXT,
        cons TEXT,
        best_for TEXT,
        link TEXT,
        tags TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.run(`
      CREATE TABLE IF NOT EXISTS search_queries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        query TEXT NOT NULL,
        results TEXT,
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
    
    // Test database by running a simple query
    const testResult = await db.get('SELECT COUNT(*) as count FROM ai_tools');
    console.log(`📊 Database contains ${testResult.count} tools`);
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

async function seedInitialData(db: Database): Promise<void> {
  const existingTools = await db.get('SELECT COUNT(*) as count FROM ai_tools');
  
  if (existingTools.count === 0) {
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
      ]);
    }

    console.log('✅ Initial tool data seeded');
  }
}