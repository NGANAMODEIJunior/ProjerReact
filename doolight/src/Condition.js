import React from 'react';

import './App.css'; 

const ConditionalComponent = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? <p>Bonjour !</p> : <p>Veuillez vous connecter.</p>}
    </div>
  );
};

export default ConditionalComponent;

