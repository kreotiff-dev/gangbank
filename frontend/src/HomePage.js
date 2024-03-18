import React, { useState } from 'react';
import Modal from 'react-modal';
import './HomePage.css'; // Импортируем файл стилей
import RegistrationForm from './RegistrationForm'; // Импортируем компонент формы регистрации
import ConfirmationForm from './ConfirmationForm'; // Предположим, что у вас есть компонент ConfirmationForm для формы подтверждения

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
  
    const openConfirmationModal = () => {
      setIsConfirmationModalOpen(true);
    };
  
    const closeConfirmationModal = () => {
      setIsConfirmationModalOpen(false);
    };
  
    const handleRegistrationSuccess = () => {
      closeRegistrationModal();
      openConfirmationModal(); // Открываем модальное окно формы подтверждения
    };


  const logoImage = images['logo.png'] || '';
  const backgroundImage = images['background.jpg'] || '';


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
            onRequestClose={closeRegistrationModal}
            className="modal-content"
            overlayClassName="modal-overlay"
            contentLabel="Регистрация"
        >
            <h2 className="modal-title">Заполните поля регистрации</h2>
            <RegistrationForm onSubmit={handleRegistrationSuccess} />
            <div className="button-container">
                <button className="btn modal-btn-close" onClick={closeRegistrationModal}>Закрыть</button>
            </div>
        </Modal>
        <Modal
            isOpen={isConfirmationModalOpen}
            onRequestClose={closeConfirmationModal}
            className="modal-content"
            overlayClassName="modal-overlay"
            contentLabel="Подтверждение"
        >
            <h2 className="modal-title">Подтвердите регистрацию по SMS</h2>
            <ConfirmationForm /> {/* Ваш компонент формы подтверждения по SMS */}
            <div className="button-container">
                <button className="btn modal-btn-close" onClick={closeConfirmationModal}>Закрыть</button>
            </div>
        </Modal>
      </div>
    </div>
  );
}

export default HomePage;
