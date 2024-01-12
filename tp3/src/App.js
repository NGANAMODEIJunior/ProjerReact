// App.js
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3010');
        const result = await response.json();
        console.log('Données GPS reçues :', result);

        updateMap(result.latitude, result.longitude);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  const updateMap = (latitude, longitude) => {
    const map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);
  };

  return (
    <div className="App">
      <h1>Données reçues depuis le serveur :</h1>
      <div id="map" style={{ height: '400px' }}></div>
    </div>
  );
}

export default App;
