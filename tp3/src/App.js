import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [gpsData, setGpsData] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    // Fetch GPS data from your server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005');
        const data = await response.json(); // Assuming your server returns JSON
        setGpsData(data);
      } catch (error) {
        console.error('Error fetching GPS data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Données GPS</h1>
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
    </div>
  );
};

export default App;
