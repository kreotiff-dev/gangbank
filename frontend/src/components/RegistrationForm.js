// RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import ConfirmationForm from './ConfirmationForm';
import '../styles/RegistrationForm.css'

function RegistrationForm({ closeModal }) {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    showConfirmationForm: false
  });

  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    // Очистка сообщений об ошибки после заполнения поля
    if (name === 'phone') {
      setPhoneError('');
    }
    if (name === 'email') {
        setEmailError('');
    }
    if (name === 'password' || name === 'confirmPassword') {
        setErrorMessage('');
    }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Проверяем, что пароли совпадают
        if (formData.password !== formData.confirmPassword) {
        throw new Error('Пароли не совпадают');
        }
        // Проверяем условия пароля
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
        throw new Error('Пароль должен содержать минимум 8 символов, хотя бы одну заглавную и одну строчную буквы');
        }

    // Создаем объект с данными для отправки на сервер, исключая поле confirmPassword
    const { confirmPassword, showConfirmationForm, ...requestData } = formData;

      const response = await axios.post('http://localhost:3000/auth/register', requestData);
      console.log('Response from server:', response);
      setFormData(prevData => ({
        ...prevData,
        showConfirmationForm: true,
      }));
    } catch (error) {
      console.error('Error while sending data:', error);
      setErrorMessage(error.message); // Устанавливаем сообщение об ошибке
    }
  };

  
  const handlePhoneFocus = () => {
      setIsPhoneFocused(true);
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    // Удаляем пробелы, скобки и дефисы из значения телефона
    const cleanedValue = value.replace(/[ ()-]/g, '');
    setFormData((prevData) => ({
      ...prevData,
      phone: cleanedValue,
    }));
    // Проверка корректности ввода номера телефона на лету
    const phoneRegex = /^\+\d{11}$/;
    if (!phoneRegex.test(cleanedValue)) {
        setPhoneError('Некорректный номер телефона');
    } else {
        setPhoneError(''); // Сброс сообщения об ошибке, если номер телефона введен правильно
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      email: value,
    }));
    // Проверка корректности ввода почтового адреса
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Некорректный адрес электронной почты');
    } else {
      setEmailError('');
    }
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
        setEmailError('Некорректный адрес электронной почты');
    } else {
        setEmailError('');
    }
    setIsEmailFocused(false); // Сбрасываем флаг фокуса после проверки
};




  return (
    <div>
      {formData.showConfirmationForm ? (
        <ConfirmationForm phone={formData.phone} closeModal={closeModal} />
      ) : (
        <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="phone">Телефон:</label>
                <InputMask 
                    mask="+7 (999) 999-99-99"
                    maskChar={null}
                    name="phone" 
                    value={formData.phone} 
                    onChange={handlePhoneChange} 
                    onFocus={handlePhoneFocus}
                    placeholder="+7 (999) 111-22-33"     
                    className={`${phoneError && !isPhoneFocused ? 'error-input' : ''}`}              
                />
                {phoneError && !isPhoneFocused && <div className="error-message">{phoneError}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="text" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleEmailChange} 
                    onBlur={handleEmailBlur} // Используем onBlur вместо onChange
                    onFocus={() => setIsEmailFocused(true)} // Устанавливаем фокус при фокусировке на поле
                    placeholder="example@example.com" 
                    className={`${emailError && !isEmailFocused ? 'error-input' : ''}`}
                />
                {emailError && !isEmailFocused && <div className="error-message">{emailError}</div>}

            </div>
            <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Введите пароль" 
                    className={` ${errorMessage ? 'error-input' : ''}`}
                />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Подтвердите пароль:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Подтвердите пароль"
                    className={` ${errorMessage ? 'error-input' : ''}`}
                />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
          <button className="btn modal-btn-reg" type="submit">Регистрация</button>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;
