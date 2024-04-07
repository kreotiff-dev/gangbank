const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432,
});

module.exports = {
  up: async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS Users (
          id SERIAL PRIMARY KEY,
          phone VARCHAR(20) NOT NULL UNIQUE CHECK (phone ~ '^\\+7\\d{10}$'),
          email VARCHAR(100) NOT NULL UNIQUE CHECK (email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
          password VARCHAR(100) NOT NULL,
          firstName VARCHAR(50),
          lastName VARCHAR(50),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Table "Users" created successfully.');
    } catch (error) {
      console.error('Error creating table:', error);
    } finally {
      client.release();
    }
  },
  down: async () => {
    const client = await pool.connect();
    try {
      await client.query('DROP TABLE IF EXISTS Users');
      console.log('Table "Users" dropped successfully.');
    } catch (error) {
      console.error('Error dropping table:', error);
    } finally {
      client.release();
    }
  }
};
