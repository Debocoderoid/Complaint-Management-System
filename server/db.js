// Shared PostgreSQL pool. Reads DATABASE_URL from the environment (.env locally).
require('dotenv').config({ quiet: true });
const { Pool } = require('pg');

const isLocalhost = !process.env.DATABASE_URL || 
  process.env.DATABASE_URL.includes('localhost') || 
  process.env.DATABASE_URL.includes('127.0.0.1');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  ssl: isLocalhost ? false : { rejectUnauthorized: true },
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err.message);
});

module.exports = pool;
