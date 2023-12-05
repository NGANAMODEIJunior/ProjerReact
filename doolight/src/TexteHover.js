import React, { useState } from 'react';
import './App.css'; 

const TexteHover = () => {
  const [hovered, setHovered] = useState(false);

  const toggleHover = () => {
    setHovered(!hovered);
  };

  const getRandomColor = () => {
    const colors = ['red', 'blue', 'green', 'orange', 'purple', 'gray','yellow','white']; 
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const textStyle = {
    color: hovered ? getRandomColor() : 'black', // Couleur aléatoire lors du survol
    transition: 'color 0.3s ease', // Animation de transition
  };

  return (
    <div className="texte-hover" onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={textStyle}>
      Hello! je change de couleur quand tu me touches
    </div>
  );
};

export default TexteHover;
