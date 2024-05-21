const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
  host: '192.168.64.210',
  user: 'root',
  password: 'root',
  database: 'Projet_Velo',
});

const generateQRCode = async (veloId) => {
  try {
    const url = `http://192.168.65.107:3000/louerVelo?idVelo=${veloId}`; // URL du site de location avec l'ID du vélo
    const filePath = path.join(__dirname, 'qrcodes', `velo_${veloId}.png`);

    // Vérifier si le dossier qrcodes existe, sinon le créer
    if (!fs.existsSync(path.join(__dirname, 'qrcodes'))) {
      fs.mkdirSync(path.join(__dirname, 'qrcodes'));
    }

    await QRCode.toFile(filePath, url, {
      color: {
        dark: '#000', // Code couleur pour le QR code
        light: '#FFF' // Code couleur pour le fond
      }
    });
    console.log(`QR Code généré pour le vélo ID: ${veloId}`);
  } catch (err) {
    console.error(err);
  }
};

// Récupérer tous les vélos de la base de données
const getAllVeloIds = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id FROM Velo';
    connection.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.map(row => row.id));
    });
  });
};

// Générer les QR codes pour tous les vélos
const generateQRCodesForAllVelos = async () => {
  try {
    const veloIds = await getAllVeloIds();
    for (const id of veloIds) {
      await generateQRCode(id);
    }
    console.log('Tous les QR Codes ont été générés');
  } catch (err) {
    console.error('Erreur lors de la génération des QR codes:', err);
  } finally {
    connection.end();
  }
};

generateQRCodesForAllVelos();
