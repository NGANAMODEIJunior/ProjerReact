import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    // Effectue une requête GET vers le serveur Node.js pour récupérer les données
    axios.get('http://192.168.65.208:3000/data')
      .then(response => {
        setData(response.data); // Met à jour les données dans l'état du composant
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  return (
    <div>
      <h1>Données reçues depuis le serveur :</h1>
      <p>{data}</p>
    </div>
  );
};

export default App;

