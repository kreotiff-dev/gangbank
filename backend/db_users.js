const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432, // порт по умолчанию для PostgreSQL
});

module.exports = pool;