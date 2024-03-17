import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; // Импортируем файл стилей для формы
import { Input } from 'react-input-mask'; // Импортируем компонент для маски ввода
import PhoneInput from 'react-phone-number-input'; // Импортируем компонент для выбора номера телефона
import 'react-phone-number-input/style.css'; // Стили для PhoneInput компонента

function RegistrationForm({ onSubmit, closeModal }) {
    const [formData, setFormData] = useState({
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handlePhoneChange = (value) => {
      setFormData((prevData) => ({
        ...prevData,
        phone: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/auth/register', formData);
        console.log(response.data);
        setFormData({
          phone: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        closeModal(); // Добавляем вызов функции для закрытия модального окна
      } catch (error) {
        console.error('Ошибка при отправке данных:', error);
      }
    };
  
    return (
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Телефон:</label>
          <PhoneInput
            international
            defaultCountry="RU"
            countries={['RU', 'BY']}
            className='modal-form-field'
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input className='modal-form-field' type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input className='modal-form-field' type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Повторите пароль:</label>
          <input className='modal-form-field' type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <button className="btn modal-btn-reg" type="submit">Зарегистрироваться</button>
      </form>
    );
  }
  
  export default RegistrationForm;