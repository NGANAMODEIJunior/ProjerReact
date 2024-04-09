import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

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
        setSuccessMessage(response.data.message); // Afficher le message de succès renvoyé par le serveur
        setErrorMessage(''); // Réinitialiser le message d'erreur
        setFormData({
            idVelo: '',
            nom: '',
            prenom: '',
            telephone: '',
            codeRetour: ''
        });
    } catch (error) {
        console.error('Erreur lors de la requête POST:', error);
        if (error.response && error.response.data && error.response.data.error) {
            setErrorMessage(error.response.data.error); // Afficher le message d'erreur renvoyé par le serveur
        } else {
            setErrorMessage('Erreur lors de la requête POST');
        }
        setSuccessMessage(''); // Réinitialiser le message de succès
    }
};


  return (
    <div className="App">
      <div className="login-container">
        <h2>Location</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" id="idVelo" name="idVelo" value={formData.idVelo} onChange={handleChange} placeholder="ID du vélo" required/>
          <input type="text" id="nom" name="nom"  value={formData.nom}  onChange={handleChange}  placeholder="Nom"  required/>
          <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required/>
          <input type="text"  id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" required/>
          <input type="text" id="codeRetour" name="codeRetour"  value={formData.codeRetour}  onChange={handleChange}  placeholder="Code de retour"  required/>
          <button type="submit">Louer le vélo</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
}

export default App;
