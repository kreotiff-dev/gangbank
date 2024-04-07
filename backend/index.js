const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express'); // импорт модуля swagger-ui-express
const swaggerDocument = require('./docs/swagger.json');
const logger = require('./utils/logger');
const port = process.env.PORT || 3000; // Порт, на котором будет работать сервер
const authRoutes = require('./routes/authRoutes');
const confirmRoutes = require('./routes/confirmRoutes');
// Подключаем миграцию 
const { Sequelize } = require('sequelize');
const dbConfig = require('./db_users'); // Поменяй путь на корректный путь к db_users.js

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  port: dbConfig.port
});

// Пример подключения к базе данных с использованием sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
//подключение миграции

// Middleware для обработки JSON тела запроса
app.use(express.json());

// Middleware для обработки CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Замените на нужный origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Регистрация маршрутов
app.use('/auth', authRoutes);
app.use('/auth', confirmRoutes);

// Обработчик маршрута для корневого URL
app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

// Подключаем документацию Swagger к пути /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Подключаем логгеры к приложению
app.use((req, res, next) => {
  // Логгер для обычных действий
  logger.infoLogger.info(`${req.method} ${req.url}`);

  // Продолжаем обработку запроса
  next();
});

// Обработчик ошибок
app.use((err, req, res, next) => {
  // Логгер для ошибок
  logger.errorLogger.error(err.stack);

  // Отправляем ответ с ошибкой
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});