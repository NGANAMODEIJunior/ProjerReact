import React, { useState } from 'react';
import './App.css';
import TexteHover from './TexteHover';
import ConditionalComponent from './Condition'


function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    // Ajoute d'autres champs selon tes besoins
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tu peux traiter les données du formulaire ici
    console.log(formData);

    
  };

  return (
    <div className="App">
      <header className="App-header">
        <TexteHover />
        <ConditionalComponent/>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          {/* Ajoute d'autres champs ici avec le même modèle */}
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}
   
export default App;
