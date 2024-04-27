import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import HomePage from './pages/HomePage';
import PersonalCabinet from './pages/PersonalCabinet';
import reportWebVitals from './reportWebVitals';

// Получаем ссылку на корневой элемент в DOM
const rootElement = document.getElementById('root');

// Рендерим компоненты в корневом элементе с использованием маршрутизации
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/personal-cabinet" element={<PersonalCabinet />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
