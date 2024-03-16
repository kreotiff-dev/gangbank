const express = require('express');
const router = express.Router();
const pool = require('../db_users');
const { infoLogger, errorLogger } = require('../utils/logger');

// Маршрут для подтверждения регистрации по смс-коду
router.post('/confirm', async (req, res) => {
    try {
        const { phone, code } = req.body;

        // Логирование информации о запросе
        infoLogger.info(`Запрос на подтверждение регистрации для номера телефона: ${phone}`);

        // Проверяем, существует ли пользователь с указанным номером телефона
        const user = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);

        if (user.rows.length === 0) {
            // Логирование ошибки: пользователь не найден
            errorLogger.error('Пользователь не найден. Начните процесс регистрации сначала');
            return res.status(404).json({ message: 'Пользователь не найден. Начните процесс регистрации сначала' });
        }

        const userData = user.rows[0];

        if (userData.confirmed) {
            // Логирование ошибки: пользователь уже зарегистрирован
            errorLogger.error('Пользователь уже зарегистрирован. Войдите с помощью номера телефона и пароля');
            return res.status(400).json({ message: 'Пользователь уже зарегистрирован. Войдите с помощью номера телефона и пароля' });
        }

        // Проверяем, совпадает ли код подтверждения с ожидаемым
        if (code === "12345") { // Ваш код проверки подтверждения

            // Обновляем статус подтверждения в БД
            await pool.query('UPDATE users SET confirmed = true WHERE phone = $1', [phone]);

            // Логирование успешной регистрации
            infoLogger.info(`Регистрация успешно подтверждена для номера телефона: ${phone}`);

            // Возвращаем сообщение об успешной регистрации
            return res.status(200).json({ message: 'Регистрация успешно подтверждена' });
        } else {
            // Логирование ошибки: неверный код подтверждения
            errorLogger.error('Неверный код подтверждения');
            // Неверный код подтверждения
            return res.status(400).json({ message: 'Неверный код подтверждения' });
        }
    } catch (error) {
        // Логирование ошибки при подтверждении регистрации
        errorLogger.error('Ошибка при подтверждении регистрации:', error);
        console.error('Ошибка при подтверждении регистрации:', error);
        res.status(500).json({ message: 'Ошибка при подтверждении регистрации' });
    }
});

module.exports = router;
