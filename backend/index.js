const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express'); // импорт модуля swagger-ui-express
const swaggerDocument = require('./docs/swagger.json');
const logger = require('./utils/logger');
const port = process.env.PORT || 3000; // Порт, на котором будет работать сервер
const authRoutes = require('./routes/authRoutes');
const confirmRoutes = require('./routes/confirmRoutes');
const userRoutes = require('./routes/userRoutes');
const { user, password, database, host, portdb } = require('./db_users')
const cors = require('cors'); // Импорт пакета cors


// Middleware для обработки CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешить доступ только с http://localhost:3001
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// Используйте cors middleware
// app.use(cors());

// Установите разрешенный домен (http://localhost:3001) в качестве параметра, если нужно ограничить доступ
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));


// Подключаем миграцию 
const { Sequelize } = require('sequelize');

// app.use((req, res, next) => {
//   logger.info(`[${new Date().toLocaleString()}] - ${req.method} ${req.url}`);
//   next();
// });

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: user,
  password: password,
  database: database,
  host: host,
  port: portdb //port - используется на 62 строке, надо подумать как передавать конфиг
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


// Регистрация маршрутов
app.use('/auth', authRoutes);
app.use('/auth', confirmRoutes);
app.use('/', userRoutes);


// Обработчик маршрута для корневого URL
app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

// Обработчик маршрута для страницы /personal-cabinet
// app.get('/personal-cabinet', (req, res) => {
//   res.send('Welcome to your personal cabinet!');
// });


// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

// Подключаем документацию Swagger к пути /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Подключаем логгеры к приложению
app.use((req, res, next) => {
  // Логгер для обычных действий
  console.log('Request received:', req.method, req.url); // Добавленный console.log()
  logger.infoLogger.info(`${req.method} ${req.url}`);

  // Продолжаем обработку запроса
  next();
});

// Обработчик ошибок
app.use((err, req, res, next) => {
  // Логгер для ошибок
  console.log('Error occurred:', err); // Добавленный console.log()
  logger.errorLogger.error(err.stack);

  // Отправляем ответ с ошибкой
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});