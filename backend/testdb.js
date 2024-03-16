// testdb.js

const pool = require('./db_users');

// Выполнение запроса для проверки подключения
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Ошибка при выполнении запроса:', err);
  } else {
    console.log('Подключение к базе данных успешно! Текущая дата и время в базе данных:', res.rows[0].now);
  }

  // Завершение соединения с базой данных
  pool.end();
});

