const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  portdb: 5432, // порт по умолчанию для PostgreSQL
});

module.exports = pool;
module.exports = {
  user: pool.options.user,
  host: pool.options.host,
  database: pool.options.database,
  password: pool.options.password,
  portdb: pool.options.portdb
};