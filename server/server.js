// server.js
const net = require('net');
const cors = require('cors');
const dataStore = require('../tp3/src/dataStore');

const server = net.createServer(socket => {
  console.log('Client connecté');

  socket.on('data', data => {
    const newData = data.toString();
    console.log('Données reçues :', newData);

    // Décryptage des données GPS
    const regex = /Latitude: ([\d.-]+), Longitude: ([\d.-]+)/;
    const match = newData.match(regex);

    if (match && match.length === 3) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);

      // Stockage des données GPS
      const gpsData = { latitude, longitude };
      dataStore.setReceivedData(JSON.stringify(gpsData));

      console.log('Données GPS décryptées :', gpsData);
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
