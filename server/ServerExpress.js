const express = require('express');
const cors = require('cors');
const dataStore = require('../tp3/src/dataStore');
const app = express();
const port = 3005;

app.use(cors());

app.get('/', (req, res) => {
  const rawData = dataStore.getReceivedData();
  const gpsDataArray = [];

  if (rawData) {
    const dataList = JSON.parse(rawData);
    
    // Ajouter l'heure aux données GPS
    dataList.forEach(entry => {
      const gpsDataWithTime = {
        time: entry.time,
        latitude: entry.latitude,
        longitude: entry.longitude,
      };
      gpsDataArray.push(gpsDataWithTime);
    });
  }

  res.json({ gpsData: gpsDataArray });
});

app.listen(port, () => {
  console.log(`Serveur IHM démarré sur http://localhost:${port}`);
});
