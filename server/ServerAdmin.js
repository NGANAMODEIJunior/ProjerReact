const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { isAdmin } = require('../admin/src/AdminUtils');

const app = express();
const port = 3004;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route pour la vérification des identifiants administrateurs
app.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const isAdminUser = await isAdmin(username, password);
    if (isAdminUser) {
      res.status(200).json({ message: 'Identifiants administrateurs valides' });
    } else {
      res.status(401).json({ error: 'Identifiants administrateurs invalides' });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des identifiants administrateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la vérification des identifiants administrateurs' });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
