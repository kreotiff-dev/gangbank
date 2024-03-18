// RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import ConfirmationForm from './ConfirmationForm';

function RegistrationForm({ closeModal }) {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    showConfirmationForm: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', formData);
      console.log('Response from server:', response);
      setFormData(prevData => ({
        ...prevData,
        showConfirmationForm: true,
      }));
    } catch (error) {
      console.error('Error while sending data:', error);
    }
  };

  return (
    <div>
      {formData.showConfirmationForm ? (
        <ConfirmationForm phone={formData.phone} closeModal={closeModal} />
      ) : (
        <form className="registration-form" onSubmit={handleSubmit}>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          <button className="btn modal-btn-reg" type="submit">Register</button>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;
