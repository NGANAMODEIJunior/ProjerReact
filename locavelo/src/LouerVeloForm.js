import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function LouerVeloForm() {
  const navigate = useNavigate();
  const { idVelo } = useParams();
  const [formData, setFormData] = useState({
    idVelo: idVelo || '',
    nom: '',
    prenom: '',
    telephone: '',
    codeRetour: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitted, setSubmitted] = useState(false); // Nouvel état pour gérer la soumission réussie

  const checkVeloStatus = useCallback(async (idVelo) => {
    try {
      const response = await axios.get(`http://192.168.65.107:3001/checkVelo/${idVelo}`);
      if (!response.data.isAvailable) {
        navigate(`/return?idVelo=${idVelo}`);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du vélo:', error);
    }
  }, [navigate]);

  useEffect(() => {
    if (idVelo) {
      checkVeloStatus(idVelo);
    }
  }, [idVelo, checkVeloStatus]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const userCheckResponse = await axios.get('http://192.168.65.107:3001/checkLocation', {
      params: {
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone
      }
    });

    if (userCheckResponse.data.hasLocation) {
      setErrorMessage('Vous avez déjà une location en cours.');
      setSuccessMessage('');
      setSubmitted(true); // Mettre à jour l'état de soumission réussie
      return;
    }

    const response = await axios.post('http://192.168.65.107:3001/louerVelo', formData);
    setSuccessMessage(response.data.message);
    setErrorMessage('');
    setSubmitted(true); // Mettre à jour l'état de soumission réussie
    setFormData({
      idVelo: '',
      nom: '',
      prenom: '',
      telephone: '',
      codeRetour: ''
    });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      if (error.response.data.error === 'Vous avez déjà une location en cours') {
        navigate(`/return?idVelo=${formData.idVelo}`);
      } else {
        setErrorMessage(error.response.data.error);
      }
    } else {
      setErrorMessage('Erreur lors de la requête POST');
    }
    setSuccessMessage('');
  }
};


  return (
    <div className="login-container">
      <h2>Location</h2>
      {!submitted && ( // Conditionner l'affichage du formulaire
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="idVelo"
            name="idVelo"
            value={formData.idVelo}
            onChange={handleChange}
            placeholder="ID du vélo"
            readOnly
            required
          />
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom"
            required
          />
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            required
          />
          <input
            type="text"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Téléphone"
            required
          />
          <input
            type="text"
            id="codeRetour"
            name="codeRetour"
            value={formData.codeRetour}
            onChange={handleChange}
            placeholder="Code de retour(4 chiffres)"
            required
            maxLength={4}
            minLength={4}
            pattern="[0-9]*"
          />
          <button type="submit">Louer le vélo</button>
        </form>
      )}
     
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default LouerVeloForm;
