const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db_users');
const loggers = require('../utils/logger');


//throw new Error('Тестовая ошибка');

// Маршрут для регистрации нового пользователя
router.post('/register', async (req, res) => {
    try {
        const { phone, email, password } = req.body;

        // Проверяем, что все необходимые поля заполнены
        if (!phone || !email || !password) {
            return res.status(400).json({ message: 'Необходимо заполнить все обязательные поля' });
        }

        // Проверяем формат номера телефона
        const phoneRegex = /^\+7\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Неверный формат номера телефона' });
        }

        // Проверяем формат email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Неверный формат email' });
        }

        // Проверяем правила для пароля
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Пароль должен содержать не менее 8 символов, как минимум одну строчную букву, одну заглавную букву и одну цифру' });
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Добавляем пользователя в базу данных
        const newUser = await pool.query('INSERT INTO users (phone, email, password) VALUES ($1, $2, $3) RETURNING *', [phone, email, hashedPassword]);

        // Логирование успешной регистрации
        loggers.info.info('Пользователь успешно зарегистрирован');

        // Отправляем ответ с подтверждением успешной регистрации
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser.rows[0] });
    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        // Логирование ошибки при регистрации
        loggers.error.error('Ошибка при регистрации пользователя:', error);
        res.status(500).json({ message: 'Ошибка при регистрации пользователя' });
    }
});

module.exports = router;

