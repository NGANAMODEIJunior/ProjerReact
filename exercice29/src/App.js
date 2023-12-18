import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';


function App() {

  const [credentials, setCredentials] = useState({ login: '', mdp: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // traitement des informations 
    console.log('Login:', credentials.login);
    console.log('Mot de passe:', credentials.mdp);
    // Réinitialiser les champs après la soumission
    setCredentials({ login: '', mdp: '' });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        <b>Exercice 29</b>
        </p>
       
        <r>Formulaire</r>

        <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login">login:</label>
        <input type="text" id="login" name="login" value={credentials.login} onChange={handleInputChange}  />
      </div>
      <div>
        <label htmlFor="mdp">mdp:</label>
        <input type="password" id="mdp" name="mdp" value={credentials.mdp} onChange={handleInputChange}/>
      </div>
      <button type="submit">Se connecter</button>
    </form>
      </header>
      
    </div>
  );
}

export default App;
