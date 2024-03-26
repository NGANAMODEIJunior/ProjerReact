// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { louerVelo } = require('../locavelo/src/fonction');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/louerVelo', (req, res) => {
    const { nom, prenom, telephone, idVelo, codeRetour } = req.body;
    louerVelo(nom, prenom, telephone, idVelo, codeRetour, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la location du vélo' });
        } else {
            res.status(200).json({ message: 'Location enregistrée avec succès' });
        }
    });
});


// Route pour vérifier les identifiants administrateurs
app.post('/admin-login', (req, res) => {
    const { username, password } = req.body;
    // Vérifiez les identifiants administrateurs dans la base de données
    verifyAdminCredentials(username, password, (err, isAdminValid) => {
        if (err) {
            console.error('Erreur lors de la vérification des identifiants administrateurs :', err);
            res.status(500).json({ error: 'Erreur lors de la vérification des identifiants administrateurs' });
        } else {
            if (isAdminValid) {
                // Si les identifiants sont valides, renvoyez une réponse positive
                res.status(200).json({ message: 'Identifiants administrateurs valides' });
            } else {
                // Sinon, renvoyez une réponse négative
                res.status(401).json({ error: 'Identifiants administrateurs invalides' });
            }
        }
    });
});


// Route pour récupérer les informations de l'utilisateur associé à un vélo spécifique
app.get('/user/:veloId', (req, res) => {
    const veloId = req.params.veloId;
    const sql = 'SELECT Nom, Prenom, Telephone FROM User WHERE VeloID = ?';
    connection.query(sql, [veloId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des informations utilisateur :', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des informations utilisateur' });
        } else {
            if (result.length > 0) {
                // Renvoyer les informations de l'utilisateur trouvé
                res.status(200).json(result[0]);
            } else {
                // Aucun utilisateur trouvé avec ce véloId
                res.status(404).json({ message: 'Aucun utilisateur trouvé avec ce véloId' });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
