// ConfirmationForm.js
import React, { useState } from 'react';
import axios from 'axios';

function ConfirmationForm({ phone, closeModal }) {
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        phone: phone,
        confirmationCode: confirmationCode
      };
      const response = await axios.post('http://localhost:3000/auth/confirm', data);
      console.log('Response from server:', response);
      closeModal(); // Close the modal after successful confirmation
    } catch (error) {
      console.error('Error while sending data:', error);
    }
  };

  return (
    <div>
      <form className="confirmation-form" onSubmit={handleSubmit}>
        <h2>Phone Confirmation</h2>
        <p>An SMS with confirmation code has been sent to {phone}. Enter the code below:</p>
        <input type="text" value={confirmationCode} onChange={handleChange} placeholder="Confirmation Code" />
        <button className="btn modal-btn-reg" type="submit">Confirm</button>
      </form>
    </div>
  );
}

export default ConfirmationForm;
