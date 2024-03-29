import connection from './database.js';

const verifyAdminCredentials = (username, password, callback) => {
    const sql = 'SELECT * FROM Admin WHERE pseudo = ? AND MDP = ?';
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

export default verifyAdminCredentials;

