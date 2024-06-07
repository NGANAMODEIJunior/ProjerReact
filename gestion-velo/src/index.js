import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root'); // Assurez-vous que l'ID est correct et que cet élément existe
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("L'élément root est introuvable dans le DOM.");
}
