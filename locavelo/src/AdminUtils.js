// adminUtils.js

const connection = require('./database.js');

// Fonction pour vérifier les identifiants administrateurs dans la base de données
const verifyAdminCredentials = (username, password, callback) => {
    const sql = 'SELECT * FROM Admins WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification des identifiants administrateurs :', err);
            callback(err, null);
        } else {
            if (result.length > 0) {
                callback(null, true); // Les identifiants sont valides
            } else {
                callback(null, false); // Les identifiants ne sont pas valides
            }
        }
    });
};

module.exports = { verifyAdminCredentials };
