import React, { useState } from 'react';
import Modal from 'react-modal';
import './HomePage.css'; // Импортируем файл стилей
import RegistrationForm from './RegistrationForm'; // Импортируем компонент формы регистрации

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRegistrationSuccess = () => {
    setIsModalOpen(false);
  };


  const logoImage = images['logo.png'] || '';
  const backgroundImage = images['background.jpg'] || '';


  return (
    <div className="home-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <img className="logo" src={logoImage} alt="Логотип" />
      <div className="content">
        <h1>Добро пожаловать!</h1>
        <div className="button-container">
          <button onClick={openModal} className="btn registration-btn">РЕГИСТРАЦИЯ</button>
          <a href="/login" className="btn login-btn">АВТОРИЗАЦИЯ</a>
        </div>
      </div>
      <div className='ReactModalPortal'>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="modal-content"
            overlayClassName="modal-overlay"
            contentLabel="Регистрация"
        >
            <h2 className="modal-title">Заполните поля регистрации</h2>
            <RegistrationForm onSuccess={handleRegistrationSuccess} closeModal={closeModal} />
            <div className="button-container">
                <button className="btn modal-btn-close" onClick={closeModal}>Закрыть</button>
            </div>
        </Modal>
      </div>
    </div>
  );
}

export default HomePage;
