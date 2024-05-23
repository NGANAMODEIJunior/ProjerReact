//ServerVelo.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const { louerVelo } = require('../locavelo/src/fonction');
const { louerVelo, rendreVelo, checkUserCurrentLocation } = require('../locavelo/src/fonction');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/checkLocation', (req, res) => {
    const { idVelo, nom, prenom, telephone } = req.query;
    checkUserCurrentLocation({ nom, prenom, telephone }, (err, hasLocation) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la vérification de la location en cours' });
        } else {
            res.status(200).json({ hasLocation });
        }
    });
});

app.post('/louerVelo', (req, res) => {
    const { nom, prenom, telephone, idVelo, codeRetour } = req.body;
    louerVelo(nom, prenom, telephone, idVelo, codeRetour, (err, result) => {
        if (err) {
            if (err.message === 'Le vélo est déjà loué par une autre personne') {
                res.status(400).json({ error: err.message });
            } else if (err.message === 'Vous avez déjà une location en cours') {
                res.status(400).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'Erreur lors de la location du vélo' });
            }
        } else {
            res.status(200).json({ message: 'Location enregistrée avec succès' });
        }
    });
});

app.post('/rendreVelo', (req, res) => {
    const { idVelo, codeRetour } = req.body;
    rendreVelo(idVelo, codeRetour, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message || 'Erreur lors du retour du vélo' });
        } else {
            res.status(200).json({ message: 'Vélo rendu avec succès' });
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
