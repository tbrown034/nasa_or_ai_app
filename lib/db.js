// lib/db.js
import { Pool } from "pg";

// Determine the correct database URL based on environment
const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.POSTGRES_URL // Use Vercel's managed PostgreSQL in production
    : process.env.DATABASE_URL; // Use local PostgreSQL in development

// Configure SSL settings
const sslConfig =
  process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false } // Enable SSL for Vercel production database
    : false; // No SSL for local development

// Initialize the database pool with environment-specific settings
const pool = new Pool({
  connectionString,
  ssl: sslConfig,
});

// Debugging: Log connection details and pool creation status
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Connecting to:", connectionString);

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database.");
});

pool.on("error", (err) => {
  console.error("Unexpected error on PostgreSQL client:", err);
  process.exit(-1); // Exit process on database connection error
});

export default pool;
