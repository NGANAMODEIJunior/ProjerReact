const connection = require('./dataBase');

const isAdmin = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Admins WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], (err, results) => {
      if (err) {
        console.error('Erreur lors de la vérification des identifiants administrateurs :', err);
        reject(err);
      } else {
        if (results.length > 0) {
          resolve(true); // L'utilisateur est administrateur
        } else {
          resolve(false); // L'utilisateur n'est pas administrateur
        }
      }
    });
  });
};

module.exports = { isAdmin };
