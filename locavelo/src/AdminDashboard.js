import React, { useState } from 'react';
import Map from './Map'; // Vérifiez le chemin d'importation
import axios from 'axios';

const AdminDashboard = () => {
  const [userData, setUserData] = useState(null);

  const handleMarkerClick = (veloId) => {
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
      <Map onMarkerClick={handleMarkerClick} /> {/* Assurez-vous que Map reçoit onMarkerClick */}
      {userData && (
        <div>
          <h3>Informations Utilisateur</h3>
          <p>Nom: {userData.nom}</p>
          <p>Prénom: {userData.prenom}</p>
          <p>Téléphone: {userData.telephone}</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
