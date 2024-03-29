import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

function App() {
  const [formData, setFormData] = useState({
    idVelo: '',
    nom: '',
    prenom: '',
    telephone: '',
    codeRetour: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/louerVelo', formData);
      console.log(response.data);
      setSuccessMessage('Location enregistrée avec succès');
      // Réinitialisez le formulaire après la soumission réussie
      setFormData({
        idVelo: '',
        nom: '',
        prenom: '',
        telephone: '',
        codeRetour: ''
      });
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
      setErrorMessage('Erreur lors de la location du vélo');
    }
  };

  return (
    <Router>
      <div className="login-container">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit} onReset={() => setSuccessMessage('')}>
          <label htmlFor="idVelo">ID Vélo :</label>
          <input
            type="text"
            id="idVelo"
            name="idVelo"
            value={formData.idVelo}
            onChange={handleChange}
            required
          />
          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <label htmlFor="prenom">Prénom :</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
          <label htmlFor="telephone">Téléphone :</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
          />
          <label htmlFor="codeRetour">Code de Retour :</label>
          <input
            type="int"
            id="codeRetour"
            name="codeRetour"
            value={formData.codeRetour}
            onChange={handleChange}
            required
          />
          <button type="submit">Louer le vélo</button>
          <button type="reset">Effacer</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </form>
        <div className="App">
          <h1>Interface principale</h1>
          <Link to="/AdminLogin" className="admin-login-link">Se connecter en tant qu'administrateur</Link>
          <Switch>
            <Route path="/AdminLogin" component={AdminLogin} />
            <Route path="/AdminDashboard" component={AdminDashboard} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
