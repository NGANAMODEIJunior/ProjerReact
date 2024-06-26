import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Assurez-vous que useNavigate est appelé à l'intérieur du corps du composant

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/admin-login', formData);
      console.log(response.data);
      navigate('/admin-dashboard'); // Utilisez navigate à l'intérieur de handleSubmit pour rediriger après une connexion réussie
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
      setErrorMessage('Identifiants administrateurs incorrects');
    }
  };

  return (
    <div>
      <h2>Connexion administrateur</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nom d'utilisateur :</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Se connecter</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default AdminLoginForm;
