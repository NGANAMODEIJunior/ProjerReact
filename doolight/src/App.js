import React from 'react';
import './App.css';
import TexteHover from './TexteHover'; // Importe le composant TexteHover depuis son emplacement

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Utilise le composant TexteHover ici */}
        <TexteHover />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
