// database.js

const mysql = require('mysql');

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
    host: '192.168.64.210',
    user: 'root',
    password: 'root',
    database: 'Projet_Velo',
});

// Connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connexion à la base de données réussie');
    }
});

module.exports = connection;
