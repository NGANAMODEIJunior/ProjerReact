const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { louerVelo, rendreVelo, checkUserCurrentLocation } = require('../locavelo/src/fonction');
const connection = require('../locavelo/src/database.js');
const expressWs = require('express-ws');

// Initialisation de l'application express
const app = express();
expressWs(app); // Initialisation de express-ws avec l'application express

// Utilisation des middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Définition du port
const port = 3001;

// Tableau pour stocker les coordonnées des vélos
let bikesCoordinates = [];

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
            callback(null, result.length === 0);
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

// Route pour vérifier la location actuelle d'un utilisateur
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

// Route pour louer un vélo
app.post('/louerVelo', (req, res) => {
    const { nom, prenom, telephone, idVelo, codeRetour } = req.body;
    louerVelo(nom, prenom, telephone, idVelo, codeRetour, (err, result) => {
        if (err) {
            if (err.message === 'Le vélo est déjà loué par une autre personne' || err.message === 'Vous avez déjà une location en cours') {
                res.status(400).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'Erreur lors de la location du vélo' });
            }
        } else {
            res.status(200).json({ message: 'Location enregistrée avec succès' });
        }
    });
});

// Route pour rendre un vélo
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

function updateBikeCoordinatesFromLocationTable() {
    let sql = 'SELECT Velo.ID, Velo.latitude, Velo.longitude FROM Velo JOIN Location ON Velo.ID = Location.VeloID';

    connection.query(sql, (err, result) => {
        if (err) throw err;

        result.forEach(row => {
            let bikeIndex = bikesCoordinates.findIndex(bike => bike.VeloID === row.ID);

            if (bikeIndex === -1) {
                bikesCoordinates.push({
                    VeloID: row.ID,
                    history: [{
                        latitude: row.latitude,
                        longitude: row.longitude
                    }]
                });
            } else {
                bikesCoordinates[bikeIndex].history.push({
                    latitude: row.latitude,
                    longitude: row.longitude
                });

                if (bikesCoordinates[bikeIndex].history.length > 3) {
                    bikesCoordinates[bikeIndex].history.shift();
                }
            }
        });

        console.log('État du tableau bikesCoordinates après la mise à jour depuis la table Location :', bikesCoordinates);
    });
}

setInterval(updateBikeCoordinatesFromLocationTable, 6000);

app.get('/SelectUser', (req, res) => {
    console.log('Requête GET reçue : /SelectUser');
    let sql = 'SELECT * FROM User';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/Proprietaire', (req, res) => {
    let sql = 'SELECT DISTINCT Velo.latitude, Velo.longitude, Velo.ID AS VeloID, Location.UserID AS UserID, User.Nom, User.Prenom FROM Velo LEFT JOIN Location ON Velo.ID = Location.VeloID JOIN User ON Location.UserID = User.ID WHERE Location.UserID IS NOT NULL UNION SELECT DISTINCT Velo.latitude, Velo.longitude, Velo.ID AS VeloID, NULL AS UserID, NULL AS Nom, NULL AS Prenom FROM Velo LEFT JOIN Location ON Velo.ID = Location.VeloID WHERE Location.VeloID IS NULL ORDER BY VeloID ASC;';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/updateBikePosition', (req, res) => {
    const bikeData = req.body;

    if (!bikeData.VeloID || !bikeData.latitude || !bikeData.longitude) {
        console.log('Données invalides ou incomplètes pour la mise à jour de la position du vélo :', bikeData);
        res.json({ success: false });
        return;
    }

    console.log('Mise à jour de la position du vélo :', bikeData);

    let bikeIndex = bikesCoordinates.findIndex(bike => bike.VeloID === bikeData.VeloID);

    console.log('État du tableau bikesCoordinates avant la mise à jour :', bikesCoordinates);

    if (bikeIndex === -1) {
        bikesCoordinates.push({
            VeloID: bikeData.VeloID,
            history: [{
                latitude: bikeData.latitude,
                longitude: bikeData.longitude
            }]
        });
    } else {
        bikesCoordinates[bikeIndex].history.push({
            latitude: bikeData.latitude,
            longitude: bikeData.longitude
        });

        if (bikesCoordinates[bikeIndex].history.length > 3) {
            bikesCoordinates[bikeIndex].history.shift();
        }
    }

    console.log('État du tableau bikesCoordinates après la mise à jour :', bikesCoordinates);
    console.log('Adresse mémoire de bikesCoordinates dans /updateBikePosition :', JSON.stringify(bikesCoordinates));

    res.json({ success: true });
});
// Route pour obtenir les positions des vélos
app.get('/bikePositions', (req, res) => {
    let sql = 'SELECT ID AS VeloID, latitude, longitude FROM Velo';
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des positions des vélos :', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des positions des vélos' });
        } else {
            res.json(result);
        }
    });
});


app.get('/getBikeHistory/:VeloID', (req, res) => {
    const bikeID = parseInt(req.params.VeloID, 10); // convertir la chaîne de caractères en un nombre
    const bike = bikesCoordinates.find(bike => bike.VeloID === bikeID);

    if (!bike) {
        console.log(`Aucun historique de position trouvé pour le vélo avec l'ID ${bikeID}`);
        res.json([]);
        return;
    }

    console.log(`Historique de position pour le vélo avec l'ID ${bikeID} :`, bike.history);
    res.json(bike.history);
});

// Démarrage du serveur
app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
