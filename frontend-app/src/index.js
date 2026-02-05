import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';  // Подключаем наши стили
import App from './App';  // Главный компонент приложения

// Создаем корневой элемент React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
