// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${window.location.protocol}//${window.location.hostname}:3001/login`, { username, password });
      if (response.data.success) {
        navigate('/map'); // Rediriger vers /map
      } else {
        alert('Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
      alert('Une erreur est survenue lors de la connexion');
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default LoginForm;
