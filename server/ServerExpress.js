const express = require('express');
const cors = require('cors');
const dataStore = require('../tp3/src/dataStore');
const app = express();
const port = 3005;

app.use(cors());

app.get('/', (req, res) => {
  const data = dataStore.getReceivedData() || 'Aucune donnée reçue';
  res.json({ gpsData: data });
});

app.listen(port, () => {
  console.log(`Serveur IHM démarré sur http://localhost:${port}`);
});
