const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  portdb: 5432, // порт по умолчанию для PostgreSQL
});

const { user, host, database, password, portdb } = pool.options;

module.exports = {
  pool,
  user,
  host,
  database,
  password,
  portdb
}
