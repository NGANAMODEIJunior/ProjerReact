import React, { useState } from 'react';

const ChildComponent = () => {
  // State to manage color change
  const [color] = useState('green');

  return (
    <div style={{ backgroundColor: color, padding: '10px' }}>
      <p>Le login et le mot de passe sont renseignés!!</p>
    </div>
  );
};

export default ChildComponent;
