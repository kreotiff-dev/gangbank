const express = require('express');
const router = express.Router();
const pool = require('../db_users').pool;
const { errorLogger } = require('../utils/logger');

router.post('/confirm', async (req, res) => {
    try {
        const { phone, confirmationCode } = req.body;
        errorLogger.info(`Запрос на подтверждение регистрации для номера телефона: ${phone}`);

        const user = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
        
        if (user.rows.length === 0) {
            errorLogger.error('Пользователь не найден. Начните процесс регистрации сначала');
            return res.status(404).json({ message: 'Пользователь не найден. Начните процесс регистрации сначала' });
        }

        const userData = user.rows[0];

        if (userData.confirmed) {
            errorLogger.error('Пользователь уже зарегистрирован. Войдите с помощью номера телефона и пароля');
            return res.status(400).json({ message: 'Пользователь уже зарегистрирован. Войдите с помощью номера телефона и пароля' });
        }

        if (confirmationCode === "12345") { 
            await pool.query('UPDATE users SET confirmed = true WHERE phone = $1', [phone]);

            errorLogger.info(`Регистрация успешно подтверждена для номера телефона: ${phone}`);
            // Перенаправление на страницу персонального кабинета
            res.redirect(`http://localhost:3001/personal-cabinet`);

            // return res.status(200).json({ message: 'Регистрация успешно подтверждена' });
        } else {
            errorLogger.error('Неверный код подтверждения');
            return res.status(400).json({ message: 'Неверный код подтверждения' });
        }
    } catch (error) {
        errorLogger.error('Ошибка при подтверждении регистрации:', error);
        console.error('Ошибка при подтверждении регистрации:', error);
        res.status(500).json({ message: 'Ошибка при подтверждении регистрации' });
    }
});

module.exports = router;
