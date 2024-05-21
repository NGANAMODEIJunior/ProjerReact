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
            if (err === 'Le vélo est déjà loué par une autre personne') {
                res.status(400).json({ error: err });
            } else if (err === 'Vous avez déjà une location en cours') {
                res.status(400).json({ error: err });
            } else {
                res.status(500).json({ error: 'Erreur lors de la location du vélo' });
            }
        } else {
            res.status(200).json({ message: 'Location enregistrée avec succès' });
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
