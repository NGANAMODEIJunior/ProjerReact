import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [gpsData, setGpsData] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005');
        const data = await response.json();
  
        // Modification pour traiter le cas où gpsData est un tableau
        const firstCoordinate = data.gpsData && data.gpsData[0];
  
        if (firstCoordinate) {
          console.log('Data from API:', data);
          setGpsData(firstCoordinate);
        } else {
          console.warn('Empty or invalid GPS data received:', data);
        }
      } catch (error) {
        console.error('Error fetching GPS data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  // Vérification des coordonnées GPS valides
  const isValidGPS = !isNaN(gpsData.latitude) && !isNaN(gpsData.longitude);
  
  // Ajout de logs pour déboguer
  console.log('Latitude:', gpsData.latitude, 'Longitude:', gpsData.longitude);
  console.log('isValidGPS:', isValidGPS);
  return (
    <div>
      <h1>Données GPS</h1>
      {isValidGPS ? (
        <>
          <p>Latitude: {gpsData.latitude}</p>
          <p>Longitude: {gpsData.longitude}</p>
          <MapContainer
            center={[gpsData.latitude, gpsData.longitude]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[gpsData.latitude, gpsData.longitude]}>
              <Popup>
                Latitude: {gpsData.latitude} <br />
                Longitude: {gpsData.longitude}
              </Popup>
            </Marker>
          </MapContainer>
        </>
      ) : (
        <p>Coordonnées GPS non valides</p>
      )}
    </div>
  );
};

export default App;
