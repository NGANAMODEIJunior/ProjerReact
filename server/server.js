const net = require('net');
const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors());
const dataStore = require('../tp3/src/dataStore');

const server = net.createServer(socket => {
  console.log('Client connecté');
  app.use(cors());
  socket.on('data', data => {
    const newData = data.toString();
    console.log('Données reçues :', newData);
  
    // Décryptage des données GPS avec heure
    const regex = /Heure: (\d{2}:\d{2}:\d{2}), Latitude: ([\d.-]+), Longitude: ([\d.-]+)/;
    const match = newData.match(regex);
  
    console.log('Match array:', match); // Ajout de cette ligne
  
    if (match && match.length === 4) {
      const time = match[1];
      const latitude = parseFloat(match[2]);
      const longitude = parseFloat(match[3]);
  
      // Stockage des données GPS avec heure
      const gpsData = { time, latitude, longitude };
      dataStore.setReceivedData(JSON.stringify(gpsData));
  
      console.log('Données GPS décryptées :', gpsData);
  
      // Ajout de ces lignes pour afficher les données stockées dans dataStore
      console.log('Données stockées dans dataStore :', dataStore.getReceivedData());
    } else {
      console.log('Format de trame GPS non reconnu');
    }
  });

  socket.on('end', () => {
    console.log('Client déconnecté');
  });

});

server.listen(3010, () => {
  console.log('Serveur TCP démarré sur le port 3010');
});
