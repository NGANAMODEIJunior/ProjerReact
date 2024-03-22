// fonction.js

const connection = require('./database.js'); 

const getUserId = (nom, prenom, telephone, callback) => {
    const sql = 'SELECT ID FROM User WHERE Nom = ? AND Prenom = ? AND Telephone = ?';
    const values = [nom, prenom, telephone];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', err);
            callback(err, null);
        } else {
            if (result.length > 0) {
                const userId = result[0].ID;
                callback(null, userId);
            } else {
                const sqlInsert = 'INSERT INTO User (Nom, Prenom, Telephone) VALUES (?, ?, ?)';
                connection.query(sqlInsert, values, (err, result) => {
                    if (err) {
                        console.error('Erreur lors de la création de l\'utilisateur :', err);
                        callback(err, null);
                    } else {
                        const userId = result.insertId;
                        callback(null, userId);
                    }
                });
            }
        }
    });
};

const getVeloId = (idVelo, callback) => {
    const sql = 'SELECT ID FROM Velo WHERE ID = ?'; // Utiliser le nom de la colonne correct
    connection.query(sql, [idVelo], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'ID du vélo :', err);
            callback(err, null);
        } else {
            if (result.length > 0) {
                const veloId = result[0].ID; // Utiliser le nom de la colonne correct
                callback(null, veloId);
            } else {
                console.error('ID du vélo introuvable');
                callback('ID du vélo introuvable', null);
            }
        }
    });
};

const louerVelo = (nom, prenom, telephone, idVelo, codeRetour, callback) => {
    getUserId(nom, prenom, telephone, (err, userId) => {
        if (err) {
            callback(err, null);
        } else {
            getVeloId(idVelo, (err, veloId) => {
                if (err) {
                    callback(err, null);
                } else {
                    const dateEmprunt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format de date sans les millisecondes
                    const sql = 'INSERT INTO Location (UserID, VeloID, DateEmprunt, CodeRetour) VALUES (?, ?, ?, ?)';
                    const values = [userId, veloId, dateEmprunt, parseInt(codeRetour)]; // Conversion de codeRetour en entier
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
