// server.js
const net = require('net');
const dataStore = require('./dataStore');

const server = net.createServer(socket => {
  console.log('Client connecté');

  socket.on('data', data => {
    const newData = data.toString();
    console.log('Données reçues :', newData);
    dataStore.setReceivedData(newData);
  });

  socket.on('end', () => {
    console.log('Client déconnecté');
  });
});

server.listen(3010, () => {
  console.log('Serveur TCP démarré sur le port 3010');
});
