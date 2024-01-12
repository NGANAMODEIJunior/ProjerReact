// ServerExpress.js
const express = require('express');
const cors = require('cors'); // Ajoutez cette ligne
const dataStore = require('../tp3/src/dataStore');
const app = express();
const port = 3005;

app.use(cors()); // Utilisez le middleware cors pour activer CORS pour toutes les routes

app.get('/', (req, res) => {
  const data = dataStore.getReceivedData() || 'Aucune donnée reçue';
  res.send(`Données reçues : ${data}`);
});

app.listen(port, () => {
  console.log(`Serveur IHM démarré sur http://localhost:${port}`);
});
