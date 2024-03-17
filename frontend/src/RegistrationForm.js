import React, { useState } from 'react';
import './RegistrationForm.css'; // Импортируем файл стилей для формы

function RegistrationForm({ onSubmit }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    // Передаем данные формы во внешний обработчик
    onSubmit(formData);
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="phone">Телефон:</label>
        <input className='modal-form-field' type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
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
