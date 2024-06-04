import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ReturnVelo() {
  const query = useQuery();
  const [formData, setFormData] = useState({
    idVelo: query.get('idVelo') || '',
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
      const response = await axios.post('http://192.168.65.107:3001/rendreVelo', formData);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setFormData({
        idVelo: '',
        codeRetour: ''
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Erreur lors de la requête POST');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <h2>Retourner le vélo</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" id="idVelo" name="idVelo" value={formData.idVelo} onChange={handleChange} placeholder="ID du vélo" required readOnly />
          <input type="text" id="codeRetour" name="codeRetour" value={formData.codeRetour} onChange={handleChange} placeholder="Code de retour(4 chiffres)" required  maxLength={4} minLength={4}/>
          <button type="submit">Rendre le vélo</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
}

export default ReturnVelo;
