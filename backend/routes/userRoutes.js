const express = require('express');
const router = express.Router();
// Измените эту строку
const { User } = require('../models/index'); // Путь может отличаться в зависимости от структуры вашего проекта

router.get('/user/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10); // Преобразование строки в число
    if (isNaN(id)) { // Проверка, что результат преобразования - действительное число
      return res.status(400).send('Invalid ID format'); // Возвращаем ошибку, если id не является числом
    }

    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
