import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const query = useQuery();
  const [formData, setFormData] = useState({
    idVelo: '',
    nom: '',
    prenom: '',
    telephone: '',
    codeRetour: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // useEffect hook to handle the URL parameter
  useEffect(() => {
    const idVelo = query.get('idVelo');
    console.log('idVelo from URL:', idVelo); // Debug log
    if (idVelo) {
      setFormData(prevFormData => ({
        ...prevFormData,
        idVelo
      }));
    }
  }, [query]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://192.168.65.107:3001/louerVelo', formData);
      console.log(response.data);
      setSuccessMessage(response.data.message);
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
        setErrorMessage(error.response.data.error);
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
          <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required/>
          <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required/>
          <input type="text" id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" required/>
          <input type="text" id="codeRetour" name="codeRetour" value={formData.codeRetour} onChange={handleChange} placeholder="Code de retour" required/>
          <button type="submit">Louer le vélo</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
}

export default App;
