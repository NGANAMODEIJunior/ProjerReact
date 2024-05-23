//generatQRCodes.js

const QRCode = require('qrcode'); // Importer QRCode depuis le package qrcode
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

// Génération des QR codes pour la location ou le retour du vélo
const generateQRCode = async (veloId, isRented) => {
  try {
    const url = isRented
      ? `http://192.168.65.107:3000/return?idVelo=${veloId}`  // URL pour retourner le vélo
      : `http://192.168.65.107:3000/louerVelo/${veloId}`; // URL pour louer le vélo
    const filePath = path.join(__dirname, 'qrcodes', `velo_${veloId}.png`);

    if (!fs.existsSync(path.join(__dirname, 'qrcodes'))) {
      fs.mkdirSync(path.join(__dirname, 'qrcodes'));
    }

    await QRCode.toFile(filePath, url, {
      color: {
        dark: '#000',
        light: '#FFF'
      }
    });
    console.log(`QR Code généré pour le vélo ID: ${veloId}`);
  } catch (err) {
    console.error(err);
  }
};

// Générer les QR codes pour tous les vélos
const generateQRCodesForAllVelos = async () => {
  try {
    const sql = 'SELECT id, isRented FROM Velo';
    connection.query(sql, async (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      for (const row of results) {
        await generateQRCode(row.id, row.isRented);
      }
      console.log('Tous les QR Codes ont été générés');
    });
  } catch (err) {
    console.error('Erreur lors de la génération des QR codes:', err);
  } finally {
    connection.end();
  }
};

generateQRCodesForAllVelos();
