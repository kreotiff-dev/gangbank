import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './HomePage';
import reportWebVitals from './reportWebVitals';

// Получаем ссылку на корневой элемент в DOM
const rootElement = document.getElementById('root');

// Рендерим компонент HomePage в корневом элементе
ReactDOM.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
