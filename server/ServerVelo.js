const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { louerVelo, rendreVelo, checkUserCurrentLocation } = require('../locavelo/src/fonction');
const connection = require('../locavelo/src/database.js'); 
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route de connexion
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM Admin WHERE pseudo = ? AND MDP = ?';
    connection.query(query, [username, password], (error, results) => {
        if (error) {
            console.error('Erreur lors de la vérification des informations d\'identification :', error);
            res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la connexion' });
            return;
        }

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Identifiants incorrects' });
        }
    });
});

// Fonction pour vérifier la disponibilité du vélo
const checkVeloAvailability = (veloId, callback) => {
    const sql = 'SELECT * FROM Location WHERE VeloID = ?'; 
    connection.query(sql, [veloId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de la disponibilité du vélo :', err);
            callback(err, null);
        } else {
            if (result.length > 0) {
                // Si le résultat est trouvé, le vélo est déjà associé à un utilisateur (déjà loué)
                callback(null, false);
            } else {
                // Si le résultat est vide, le vélo est disponible
                callback(null, true);
            }
        }
    });
};

// Route pour vérifier l'état du vélo
app.get('/checkVelo/:idVelo', (req, res) => {
    const idVelo = req.params.idVelo;
    checkVeloAvailability(idVelo, (err, isAvailable) => {
        if (err) {
            res.status(500).send({ error: 'Erreur lors de la vérification du vélo' });
        } else {
            res.send({ isAvailable });
        }
    });
});

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
