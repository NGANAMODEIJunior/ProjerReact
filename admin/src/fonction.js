const axios = require('axios');

const loginUser = async (username, password) => {
  try {
    // Faire une requête POST pour vérifier les identifiants dans la base de données
    const response = await axios.post('http://localhost:3004/admin-login', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = { loginUser };
