// Shared PostgreSQL pool. Reads DATABASE_URL from the environment (.env locally).
require('dotenv').config({ quiet: true });
const { Pool } = require('pg');

const databaseUrl = process.env.DATABASE_URL;
const databaseHost = databaseUrl ? new URL(databaseUrl).hostname : 'localhost';
const localHosts = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

const pool = new Pool({
  connectionString: databaseUrl,
  max: 10,
  ssl: localHosts.has(databaseHost) ? false : { rejectUnauthorized: true },
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err.message);
});

module.exports = pool;
