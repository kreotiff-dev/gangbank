import React from 'react';
import './HomePage.css'; // Импортируем файл стилей

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

function HomePage() {
  const logoImage = images['logo.png'] || '';
  const backgroundImage = images['background.jpg'] || '';

  return (
    <div className="home-page" style={{ backgroundImage: `url(${backgroundImage})`}}>
        <img className="logo" src={logoImage} alt="Логотип" />
      <div className="content" >
        <h1>Добро пожаловать!</h1>
        <div className="button-container">
          <a href="/registration" className="btn registration-btn">РЕГИСТРАЦИЯ</a>
          <a href="/login" className="btn login-btn">АВТОРИЗАЦИЯ</a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
