// AdminDashboard.js
import React, { useState } from 'react';
import Map from './Map'; // Importez votre composant Map
import axios from 'axios';

const AdminDashboard = () => {
  const [userData, setUserData] = useState(null); // Pour stocker les données utilisateur

  const handleMarkerClick = (veloId) => {
    // Lorsqu'un marqueur est cliqué, récupérez les informations de l'utilisateur associé à ce vélo
    axios.get(`http://localhost:3001/user/${veloId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
      });
  };

  return (
    <div>
      <h2>Tableau de bord Administrateur</h2>
      <Map onMarkerClick={handleMarkerClick} />
      {userData && (
        <div>
          <h3>Informations Utilisateur</h3>
          <p>Nom: {userData.nom}</p>
          <p>Prénom: {userData.prenom}</p>
          <p>Téléphone: {userData.telephone}</p>
          {/* Autres informations utilisateur à afficher */}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
