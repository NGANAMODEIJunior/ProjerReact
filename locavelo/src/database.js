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

// Fonction pour sauvegarder les informations de location dans la base de données
const saveLocation = (nom, prenom, telephone, idVelo, codeRetour) => {
    const dateEmprunt = new Date().toISOString(); // Date actuelle
    const sql = 'INSERT INTO location (nom, prenom, telephone, idVelo, codeRetour, dateEmprunt) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [nom, prenom, telephone, idVelo, codeRetour, dateEmprunt];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'enregistrement de la location :', err);
        } else {
            console.log('Location enregistrée avec succès');
        }
    });
};

module.exports = { saveLocation };
