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
    console.error('Erreur lors de la connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = connection;
