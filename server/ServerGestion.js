const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Configuration de la connexion à la base de données MySQL
const connection = mysql.createConnection({
    host: '192.168.64.210',
    user: 'root',
    password: 'root',
    database: 'Projet_Velo',
});

connection.connect(error => {
    if (error) {
        console.error('Erreur de connexion à la base de données :', error);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

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
            // L'utilisateur existe dans la base de données et les informations d'identification sont correctes
            res.json({ success: true });
        } else {
            // L'utilisateur n'existe pas ou les informations d'identification sont incorrectes
            res.status(401).json({ success: false, message: 'Identifiants incorrects' });
        }
    });
});

app.listen(port, () => {
    console.log(`Serveur backend démarré sur le port ${port}`);
});
