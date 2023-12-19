// Importer le module HTTP
const http = require('http');

// Définir le port sur lequel le serveur écoutera les requêtes
const port = 3000;

// Créer le serveur
const server = http.createServer((req, res) => {
    // Code pour gérer les requêtes
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bonjour ! Ceci est un serveur Node.js.');
});

// Écouter les requêtes sur le port spécifié
server.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});
