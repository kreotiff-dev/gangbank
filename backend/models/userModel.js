'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // Определение атрибутов модели
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        is: /^\+7\d{10}$/
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(50),
    },
    lastname: {
      type: DataTypes.STRING(50),
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdat' // Указываем фактическое имя колонки в базе данных
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedat' // Указываем фактическое имя колонки в базе данных
    },
  }, {
    // Дополнительные настройки модели
    tableName: 'users', // Обновите имя таблицы в соответствии с именем в базе данных
    timestamps: true // Подтверждение использования полей createdAt и updatedAt
  });

  User.associate = function(models) {
    // Здесь определите ассоциации
  };

  return User;
};
