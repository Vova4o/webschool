const { readFile } = require("node:fs/promises");
const path = require("node:path");
const { Pool } = require("pg");

const connectionAttempts = 30;
const connectionRetryDelayMs = 2000;

function delay(durationMs) {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}

async function connectWithRetry(pool) {
  let lastError;

  for (let attempt = 1; attempt <= connectionAttempts; attempt += 1) {
    try {
      const client = await pool.connect();
      console.log(`database connection established on attempt ${attempt}`);
      return client;
    } catch (error) {
      lastError = error;
      console.log(`database is not ready, attempt ${attempt}/${connectionAttempts}`);
      await delay(connectionRetryDelayMs);
    }
  }

  throw new Error(`connect to database: ${lastError?.message ?? "unknown error"}`);
}

async function seedDatabase() {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL is required");
  }

  const seedPath = process.env.TUTORIAL_SEED_FILE
    ? path.resolve(process.env.TUTORIAL_SEED_FILE)
    : path.join(__dirname, "..", "seed", "tutorials.json");
  const tutorials = JSON.parse(await readFile(seedPath, "utf8"));
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
  const client = await connectWithRetry(pool);

  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock($1)", [824501]);
    await client.query(`
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
    await client.query(`
      CREATE TABLE IF NOT EXISTS tutorials (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        description TEXT NOT NULL,
        level VARCHAR(100) NOT NULL,
        duration VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        "order" INTEGER NOT NULL DEFAULT 0,
        is_free BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS examples (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        description TEXT NOT NULL,
        code TEXT NOT NULL,
        language VARCHAR(50) DEFAULT 'go',
        category VARCHAR(100) NOT NULL,
        "order" INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    let inserted = 0;
    for (const tutorial of tutorials) {
      const result = await client.query(
        `INSERT INTO tutorials
          (slug, title, description, level, duration, content, category, "order", is_free)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (slug) DO NOTHING`,
        [
          tutorial.slug,
          tutorial.title,
          tutorial.description,
          tutorial.level,
          tutorial.duration,
          tutorial.content,
          tutorial.category,
          tutorial.order,
          tutorial.is_free,
        ]
      );
      inserted += result.rowCount;
    }

    await client.query("COMMIT");
    console.log(`database seed complete: ${inserted} inserted, ${tutorials.length - inserted} already present`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw new Error(`seed database: ${error.message}`);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
