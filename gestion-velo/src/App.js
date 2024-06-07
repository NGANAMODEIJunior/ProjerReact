// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import Map from './MapPage'; // Importer le composant Map

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
