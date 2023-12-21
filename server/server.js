const net = require('net');

const server = net.createServer(socket => {
  console.log('Client connecté');

  socket.on('data', data => {
    console.log(`Données reçues du client : ${data}`);
  });

  socket.on('end', () => {
    console.log('Client déconnecté');
  });

  socket.write('Bienvenue ! Connexion établie avec succès au serveur.');
});

const PORT_TCP = 8080;

server.listen(PORT_TCP, () => {
  console.log(`Serveur TCP démarré sur le port ${PORT_TCP}`);
});
