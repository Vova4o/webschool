import { Pool } from "pg";

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export interface Tutorial {
  id: number;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  content: string;
  category: string;
  order: number;
  is_free: boolean; // true = free, false = premium
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: "user" | "admin";
  is_premium: boolean;
  premium_until: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Example {
  id: number;
  slug: string;
  title: string;
  description: string;
  code: string;
  language: string;
  category: string;
  order: number;
  created_at: Date;
  updated_at: Date;
}

export async function createTables() {
  // Users table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'user',
      is_premium BOOLEAN DEFAULT FALSE,
      premium_until TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tutorials table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tutorials (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(500) NOT NULL,
      description TEXT,
      level VARCHAR(100) NOT NULL,
      duration VARCHAR(50),
      content TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      "order" INTEGER DEFAULT 0,
      is_free BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Examples table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS examples (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(500) NOT NULL,
      description TEXT,
      code TEXT NOT NULL,
      language VARCHAR(50) DEFAULT 'go',
      category VARCHAR(100) NOT NULL,
      "order" INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Deprecated - use createTables instead
export async function createTutorialsTable() {
  await createTables();
}

export async function getTutorials(): Promise<Tutorial[]> {
  const result = await pool.query<Tutorial>(
    'SELECT * FROM tutorials ORDER BY category, "order", created_at'
  );
  return result.rows;
}

export async function getTutorialBySlug(
  slug: string
): Promise<Tutorial | null> {
  const result = await pool.query<Tutorial>(
    "SELECT * FROM tutorials WHERE slug = $1 LIMIT 1",
    [slug]
  );
  return result.rows[0] || null;
}

export async function getNextTutorialInCategory(
  category: string,
  order: number
): Promise<Tutorial | null> {
  const result = await pool.query<Tutorial>(
    'SELECT * FROM tutorials WHERE category = $1 AND "order" > $2 ORDER BY "order" ASC, created_at ASC LIMIT 1',
    [category, order]
  );
  return result.rows[0] || null;
}

export async function createTutorial(
  tutorial: Omit<Tutorial, "id" | "created_at" | "updated_at">
): Promise<Tutorial> {
  const result = await pool.query<Tutorial>(
    'INSERT INTO tutorials (slug, title, description, level, duration, content, category, "order") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [
      tutorial.slug,
      tutorial.title,
      tutorial.description,
      tutorial.level,
      tutorial.duration,
      tutorial.content,
      tutorial.category,
      tutorial.order,
    ]
  );
  return result.rows[0];
}

export async function updateTutorial(
  id: number,
  tutorial: Partial<Tutorial>
): Promise<Tutorial> {
  const updates: string[] = [];
  const values: (string | number | boolean)[] = [];
  let paramIndex = 1;

  if (tutorial.slug !== undefined) {
    updates.push(`slug = $${paramIndex++}`);
    values.push(tutorial.slug);
  }
  if (tutorial.title !== undefined) {
    updates.push(`title = $${paramIndex++}`);
    values.push(tutorial.title);
  }
  if (tutorial.description !== undefined) {
    updates.push(`description = $${paramIndex++}`);
    values.push(tutorial.description);
  }
  if (tutorial.level !== undefined) {
    updates.push(`level = $${paramIndex++}`);
    values.push(tutorial.level);
  }
  if (tutorial.duration !== undefined) {
    updates.push(`duration = $${paramIndex++}`);
    values.push(tutorial.duration);
  }
  if (tutorial.content !== undefined) {
    updates.push(`content = $${paramIndex++}`);
    values.push(tutorial.content);
  }
  if (tutorial.category !== undefined) {
    updates.push(`category = $${paramIndex++}`);
    values.push(tutorial.category);
  }
  if (tutorial.order !== undefined) {
    updates.push(`"order" = $${paramIndex++}`);
    values.push(tutorial.order);
  }

  updates.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  const query = `
    UPDATE tutorials 
    SET ${updates.join(", ")}
    WHERE id = $${paramIndex}
    RETURNING *
  `;

  const result = await pool.query<Tutorial>(query, values);
  return result.rows[0];
}

export async function deleteTutorial(id: number): Promise<void> {
  await pool.query("DELETE FROM tutorials WHERE id = $1", [id]);
}

// ==================== User Management ====================

export async function createUser(
  user: Omit<User, "id" | "created_at" | "updated_at">
): Promise<User> {
  const result = await pool.query<User>(
    "INSERT INTO users (email, password_hash, name, role, is_premium, premium_until) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      user.email,
      user.password_hash,
      user.name,
      user.role,
      user.is_premium,
      user.premium_until ? user.premium_until.toISOString() : null,
    ]
  );
  return result.rows[0];
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query<User>(
    "SELECT * FROM users WHERE email = $1 LIMIT 1",
    [email]
  );
  return result.rows[0] || null;
}

export async function getUserCount(): Promise<number> {
  const result = await pool.query<{ count: string }>(
    "SELECT COUNT(*) as count FROM users"
  );
  return parseInt(result.rows[0]?.count || "0", 10);
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await pool.query<User>(
    "SELECT * FROM users WHERE id = $1 LIMIT 1",
    [id]
  );
  return result.rows[0] || null;
}

export async function updateUserPremiumStatus(
  userId: number,
  isPremium: boolean,
  premiumUntil: Date | null
): Promise<User> {
  const result = await pool.query<User>(
    "UPDATE users SET is_premium = $1, premium_until = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
    [isPremium, premiumUntil ? premiumUntil.toISOString() : null, userId]
  );
  return result.rows[0];
}

export async function checkUserAccess(
  userId: number | null,
  tutorialId: number
): Promise<boolean> {
  // Get tutorial
  const tutorialResult = await pool.query<Tutorial>(
    "SELECT is_free FROM tutorials WHERE id = $1",
    [tutorialId]
  );

  if (!tutorialResult.rows[0]) return false;

  // If tutorial is free, everyone can access
  if (tutorialResult.rows[0].is_free) return true;

  // If not logged in, no access to premium
  if (!userId) return false;

  // Check if user has premium access
  const user = await getUserById(userId);
  if (!user) return false;

  // Admin always has access
  if (user.role === "admin") return true;

  // Check premium status
  if (user.is_premium) {
    if (!user.premium_until) return true; // Lifetime premium
    return new Date(user.premium_until) > new Date(); // Not expired
  }

  return false;
}

// ===== Examples CRUD Operations =====

export async function getExamples(): Promise<Example[]> {
  const result = await pool.query<Example>(
    'SELECT * FROM examples ORDER BY "order" ASC, created_at DESC'
  );
  return result.rows;
}

export async function getExampleBySlug(slug: string): Promise<Example | null> {
  const result = await pool.query<Example>(
    "SELECT * FROM examples WHERE slug = $1",
    [slug]
  );
  return result.rows[0] || null;
}

export async function getExampleById(id: number): Promise<Example | null> {
  const result = await pool.query<Example>(
    "SELECT * FROM examples WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
}

export async function createExample(example: {
  slug: string;
  title: string;
  description: string;
  code: string;
  language: string;
  category: string;
  order?: number;
}): Promise<Example> {
  const result = await pool.query<Example>(
    'INSERT INTO examples (slug, title, description, code, language, category, "order") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [
      example.slug,
      example.title,
      example.description,
      example.code,
      example.language,
      example.category,
      example.order || 0,
    ]
  );
  return result.rows[0];
}

export async function updateExample(
  id: number,
  example: {
    slug?: string;
    title?: string;
    description?: string;
    code?: string;
    language?: string;
    category?: string;
    order?: number;
  }
): Promise<Example> {
  const updates: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (example.slug !== undefined) {
    updates.push(`slug = $${paramIndex++}`);
    values.push(example.slug);
  }
  if (example.title !== undefined) {
    updates.push(`title = $${paramIndex++}`);
    values.push(example.title);
  }
  if (example.description !== undefined) {
    updates.push(`description = $${paramIndex++}`);
    values.push(example.description);
  }
  if (example.code !== undefined) {
    updates.push(`code = $${paramIndex++}`);
    values.push(example.code);
  }
  if (example.language !== undefined) {
    updates.push(`language = $${paramIndex++}`);
    values.push(example.language);
  }
  if (example.category !== undefined) {
    updates.push(`category = $${paramIndex++}`);
    values.push(example.category);
  }
  if (example.order !== undefined) {
    updates.push(`"order" = $${paramIndex++}`);
    values.push(example.order);
  }

  updates.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  const query = `UPDATE examples SET ${updates.join(
    ", "
  )} WHERE id = $${paramIndex} RETURNING *`;
  const result = await pool.query<Example>(query, values);
  return result.rows[0];
}

export async function deleteExample(id: number): Promise<void> {
  await pool.query("DELETE FROM examples WHERE id = $1", [id]);
}
