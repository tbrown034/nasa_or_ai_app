import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production"
      ? process.env.POSTGRES_URL // Use Vercel's managed PostgreSQL in production
      : process.env.DATABASE_URL, // Use local PostgreSQL in development
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false } // Enable SSL for production (Vercel)
      : false, // Disable SSL for local development
});

export default pool;
