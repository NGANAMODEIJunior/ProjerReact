const express = require('express');
const app = express();

// Endpoint pour récupérer les données GPS depuis l'application C++
app.get('/get-gps-data', (req, res) => {
    // Code pour interroger l'application C++ et récupérer les données GPS
    // Utilisez child_process ou une autre méthode pour exécuter votre code C++
    // Une fois les données récupérées, renvoyez-les en réponse à la requête React
    res.json({ latitude: 40.7128, longitude: -74.0060 }); // Exemple de données GPS
});

// Démarrer le serveur
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Serveur Node.js en écoute sur le port ${PORT}`);
});
