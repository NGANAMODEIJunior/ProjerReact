import React, { useState } from 'react';
import './App.css';

function App() {
  // State pour stocker les valeurs du formulaire
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [idVelo, setIdVelo] = useState('');
  const [codeRetour, setCodeRetour] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoi des données du formulaire au serveur pour la location du vélo
    // (à implémenter)
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Formulaire de location de vélo</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom :</label>
          <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required /><br />

          <label htmlFor="prenom">Prénom :</label>
          <input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required /><br />

          <label htmlFor="telephone">Téléphone :</label>
          <input type="text" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required /><br />

          <label htmlFor="idVelo">ID du vélo :</label>
          <input type="text" id="idVelo" value={idVelo} onChange={(e) => setIdVelo(e.target.value)} required /><br />

          <label htmlFor="codeRetour">Code de retour :</label>
          <input type="text" id="codeRetour" value={codeRetour} onChange={(e) => setCodeRetour(e.target.value)} required /><br />

          <button type="submit">Louer le vélo</button>
        </form>
      </header>
    </div>
  );
}

export default App;
