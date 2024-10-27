import { Pool } from "pg";

// Log environment variables to help with debugging
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(
  "Connecting to:",
  process.env.NODE_ENV === "production"
    ? process.env.POSTGRES_URL
    : process.env.DATABASE_URL
);

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production"
      ? process.env.POSTGRES_URL // Use Vercel's managed PostgreSQL in production
      : process.env.DATABASE_URL, // Use local PostgreSQL in development
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false } // Enable SSL for production
      : false, // Disable SSL for local development
});

// Log pool creation for debugging
console.log("Database pool created.");

export default pool;
