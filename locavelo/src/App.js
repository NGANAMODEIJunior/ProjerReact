import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LouerVeloForm from './LouerVeloForm';
import ReturnVelo from './ReturnVelo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LouerVeloForm />} />
        <Route path="/louerVelo/:idVelo" element={<LouerVeloForm />} />
        <Route path="/return" element={<ReturnVelo />} />
      </Routes>
    </div>
  );
}

export default App;
