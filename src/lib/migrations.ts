import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

/**
 * Check if a table exists in the database
 */
async function tableExists(tableName: string): Promise<boolean> {
  const { rows } = await pool.query(
    `SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = $1
    )`,
    [tableName]
  );
  return rows[0].exists;
}

/**
 * Create users table if it doesn't exist
 */
async function createUsersTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'user',
      is_premium BOOLEAN DEFAULT false,
      premium_until TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

/**
 * Create tutorials table if it doesn't exist
 */
async function createTutorialsTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tutorials (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      level VARCHAR(50) NOT NULL,
      duration VARCHAR(50) NOT NULL,
      content TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      "order" INTEGER NOT NULL DEFAULT 0,
      is_free BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

/**
 * Create examples table if it doesn't exist
 */
async function createExamplesTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS examples (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      code TEXT NOT NULL,
      language VARCHAR(50) DEFAULT 'go',
      category VARCHAR(100) NOT NULL,
      "order" INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

/**
 * Run all migrations - create all tables if they don't exist
 * This is idempotent - safe to call multiple times
 */
export async function runMigrations(): Promise<void> {
  console.log("🔧 Running database migrations...");

  try {
    await createUsersTable();
    console.log("✅ Users table ready");

    await createTutorialsTable();
    console.log("✅ Tutorials table ready");

    await createExamplesTable();
    console.log("✅ Examples table ready");

    console.log("🎉 All migrations complete!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

/**
 * Check if database is ready (all tables exist)
 */
export async function isDatabaseReady(): Promise<boolean> {
  try {
    const usersExist = await tableExists("users");
    const tutorialsExist = await tableExists("tutorials");
    const examplesExist = await tableExists("examples");

    return usersExist && tutorialsExist && examplesExist;
  } catch (error) {
    console.error("Error checking database:", error);
    return false;
  }
}

/**
 * Ensure database is ready, run migrations if needed
 */
export async function ensureDatabaseReady(): Promise<void> {
  const isReady = await isDatabaseReady();

  if (!isReady) {
    console.log("📋 Database not ready, running migrations...");
    await runMigrations();
  } else {
    console.log("✅ Database is ready");
  }
}
