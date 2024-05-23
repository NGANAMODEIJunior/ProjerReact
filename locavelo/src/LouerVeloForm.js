import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function LouerVeloForm() {
  const { idVelo } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idVelo: idVelo || '',
    nom: '',
    prenom: '',
    telephone: '',
    codeRetour: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà une location en cours
    const checkCurrentLocation = async () => {
      try {
        const response = await axios.get(`http://192.168.65.107:3001/checkLocation`, {
          params: {
            idVelo: idVelo,
            nom: formData.nom,
            prenom: formData.prenom,
            telephone: formData.telephone
          }
        });
        if (response.data.hasLocation) {
          navigate(`/return?idVelo=${idVelo}`);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la location en cours', error);
      }
    };

    if (formData.nom && formData.prenom && formData.telephone) {
      checkCurrentLocation();
    }
  }, [formData.nom, formData.prenom, formData.telephone, idVelo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://192.168.65.107:3001/louerVelo', formData);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
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
      <form onSubmit={handleSubmit}>
        <input type="text" id="idVelo" name="idVelo" value={formData.idVelo} onChange={handleChange} placeholder="ID du vélo" required readOnly />
        <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
        <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
        <input type="text" id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" required />
        <input type="text" id="codeRetour" name="codeRetour" value={formData.codeRetour} onChange={handleChange} placeholder="Code de retour" required />
        <button type="submit">Louer le vélo</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default LouerVeloForm;
