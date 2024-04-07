import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';

function ConfirmationForm({ phone, closeModal }) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!confirmationCode) {
        setError('Please enter the confirmation code.');
        return;
      }

      const data = {
        phone: phone,
        confirmationCode: confirmationCode
      };

      const response = await axios.post('http://localhost:3000/auth/confirm', data);
      if (response.status === 200) {
        console.log('Подтверждение выполнено успешно:', response);
        closeModal();
      } else {
        setError('1An error occurred while confirming. Please try again.');
      }
    } catch (error) {
      console.error('Error while sending data:', error);
      setError('2An error occurred while confirming. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="confirmation-form" onSubmit={handleSubmit}>
        <p>An SMS with confirmation code has been sent to {phone}. Enter the code below:</p>
        <InputMask 
            mask="99999"
            type="text" 
            value={confirmationCode} 
            onChange={handleChange} 
            placeholder="Confirmation Code" 
        />
        {error && <p className="error-message">{error}</p>}
        <button className="btn modal-btn-reg" type="submit" disabled={loading}>{loading ? 'Confirming...' : 'Confirm'}</button>
      </form>
    </div>
  );
}

export default ConfirmationForm;