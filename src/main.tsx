import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia a react-dom/client
import './index.css';
import App from './App';

// Crea el root
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Asegúrate de que el elemento no sea null

// Renderiza la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
