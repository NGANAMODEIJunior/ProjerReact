import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AdminLoginForm from './AdminLoginForm';

function App() {
  const [formData, setFormData] = useState({
    idVelo: '7',
    nom: '',
    prenom: '',
    telephone: '',
    codeRetour: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/louerVelo', formData);
      console.log(response.data);
      // Redirection vers la page d'accueil après la soumission du formulaire
      window.location.href = '/accueil';
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
    }
  };

  return (
    <Router>
      <div className="login-container">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" id="idVelo" name="idVelo" value={formData.idVelo} onChange={handleChange} required/>
          <input type="text" id="nom" name="nom"  value={formData.nom}  onChange={handleChange}  required/>
          <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required/>
          <input type="text"  id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} required/>
          <input type="int" id="codeRetour" name="codeRetour"  value={formData.codeRetour}  onChange={handleChange}  require/>
          <button type="submit">Louer le vélo</button>
        </form>
      </div>

      <div className="App">
        <h1>Interface principale</h1>
        <Link to="/admin-login" className="admin-login-link">Se connecter en tant qu'administrateur</Link>
        <Switch>
          <Route path="/admin-login" component={AdminLoginForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
