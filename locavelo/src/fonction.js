// functions.js

const mysql = require('mysql');

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'votre_utilisateur',
    password: 'votre_mot_de_passe',
    database: 'votre_base_de_donnees',
});

// Connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connexion à la base de données réussie');
    }
});

// Fonction pour récupérer l'ID de l'utilisateur existant ou créer un nouvel utilisateur
const getUserId = (nom, prenom, telephone, callback) => {
    const sql = 'SELECT userID FROM user WHERE nom = ? AND prenom = ? AND telephone = ?';
    const values = [nom, prenom, telephone];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', err);
            callback(err, null);
        } else {
            if (result.length > 0) {
                // L'utilisateur existe déjà, on récupère son ID
                const userId = result[0].userID;
                callback(null, userId);
            } else {
                // L'utilisateur n'existe pas, on crée un nouvel utilisateur
                const sqlInsert = 'INSERT INTO user (nom, prenom, telephone) VALUES (?, ?, ?)';
                connection.query(sqlInsert, values, (err, result) => {
                    if (err) {
                        console.error('Erreur lors de la création de l\'utilisateur :', err);
                        callback(err, null);
                    } else {
                        // On récupère l'ID de l'utilisateur créé
                        const userId = result.insertId;
                        callback(null, userId);
                    }
                });
            }
        }
    });
};

// Fonction pour récupérer l'ID du vélo
const getVeloId = (idVelo, callback) => {
    const sql = 'SELECT veloID FROM velo WHERE veloID = ?';
    connection.query(sql, [idVelo], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'ID du vélo :', err);
            callback(err, null);
        } else {
            if (result.length > 0) {
                // Le vélo existe, on récupère son ID
                const veloId = result[0].veloID;
                callback(null, veloId);
            } else {
                console.error('ID du vélo introuvable');
                callback('ID du vélo introuvable', null);
            }
        }
    });
};

// Fonction pour louer un vélo
const louerVelo = (nom, prenom, telephone, idVelo, codeRetour, callback) => {
    getUserId(nom, prenom, telephone, (err, userId) => {
        if (err) {
            callback(err, null);
        } else {
            getVeloId(idVelo, (err, veloId) => {
                if (err) {
                    callback(err, null);
                } else {
                    const dateEmprunt = new Date().toISOString(); // Date actuelle
                    const sql = 'INSERT INTO location (userID, veloID, dateEmprunt, codeRetour) VALUES (?, ?, ?, ?)';
                    const values = [userId, veloId, dateEmprunt, codeRetour];
                    connection.query(sql, values, (err, result) => {
                        if (err) {
                            console.error('Erreur lors de la location du vélo :', err);
                            callback(err, null);
                        } else {
                            console.log('Location enregistrée avec succès');
                            callback(null, 'Location enregistrée avec succès');
                        }
                    });
                }
            });
        }
    });
};

module.exports = { louerVelo };
