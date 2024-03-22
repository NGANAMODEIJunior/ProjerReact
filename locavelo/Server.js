// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { saveLocation } = require('./module-de-test/src/database');

const app = express();
const port = 3000;

// Middleware pour parser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour gérer les données du formulaire
app.post('/louerVelo', (req, res) => {
    const { nom, prenom, telephone, idVelo, codeRetour } = req.body;
    saveLocation(nom, prenom, telephone, idVelo, codeRetour);
    res.send('Location enregistrée avec succès !');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
