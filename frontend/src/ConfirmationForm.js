import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

function ConfirmationForm({ phone, onSubmit }) {
    const [confirmationCode, setConfirmationCode] = useState('');
  
    const handleChange = (e) => {
      setConfirmationCode(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(confirmationCode);
    };
  
    return (
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Подтверждение номера телефона</h2>
        <p>На номер {phone} отправлено SMS с кодом подтверждения. Введите полученный код ниже:</p>
        <div className="form-group">
          <label htmlFor="confirmationCode">Код подтверждения:</label>
          <input
            className='modal-form-field'
            type="text"
            id="confirmationCode"
            name="confirmationCode"
            value={confirmationCode}
            onChange={handleChange}
          />
        </div>
        <button className="btn modal-btn-reg" type="submit">Подтвердить</button>
      </form>
    );
  }
  
  export default ConfirmationForm;