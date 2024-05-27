//MapPage.js

import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';

function MapPage() {
    useEffect(() => {
      // Créer une instance de carte uniquement une fois lorsque le composant est monté
      const mapContainer = document.getElementById('map-container');
      console.log("Map container:", mapContainer); // Ajout du contrôle
      if (mapContainer) {
        // Vérifier si la carte est déjà initialisée dans ce conteneur
        if (!mapContainer._leaflet_id) {
          const map = L.map(mapContainer).setView([49.8941, 2.2957], 13);
  
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
          }).addTo(map);
  
          // Exemple de marquage
          L.marker([49.8941, 2.2957]).addTo(map)
            .bindPopup('Amiens, France')
            .openPopup();
        }
      }
    }, []); // Le tableau vide comme deuxième argument signifie que ce hook ne s'exécutera qu'une seule fois après le premier rendu
  
    return (
      <div id="map-container" className="map-container"></div>
    );
  }
  

export default MapPage;
