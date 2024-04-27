import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/HomePage.css';
import RegistrationForm from '../components/RegistrationForm';
import ConfirmationForm from '../components/ConfirmationForm';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

function HomePage() {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const openRegistrationModal = () => {
    setIsRegistrationModalOpen(true);
  };

  const closeRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };


  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };


  const logoImage = process.env.PUBLIC_URL + '/logo.png' || '';
  const backgroundImage = process.env.PUBLIC_URL + '/background.jpg' || '';
  
  return (
    <div className="home-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <img className="logo" src={logoImage} alt="Логотип" />
      <div className="content">
        <h1>Добро пожаловать!</h1>
        <div className="button-container">
          <button onClick={openRegistrationModal} className="btn registration-btn">РЕГИСТРАЦИЯ</button>
          <a href="/login" className="btn login-btn">АВТОРИЗАЦИЯ</a>
        </div>
      </div>
      <div className='ReactModalPortal'>
        <Modal
          isOpen={isRegistrationModalOpen}
          className="modal-content"
          overlayClassName="modal-overlay"
          contentLabel="Регистрация"
        >
          {isConfirmationModalOpen ? (
            <>
              <h2 className="modal-title">Подтвердите регистрацию по SMS</h2>
              <ConfirmationForm closeModal={closeConfirmationModal} />
            </>
          ) : (
            <>
              <h2 className="modal-title">Заполните поля регистрации</h2>
              <RegistrationForm closeModal={closeRegistrationModal} />
            </>
          )}
          <div className="button-container">
            <button className="btn modal-btn-close" onClick={closeRegistrationModal}>Закрыть</button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default HomePage;