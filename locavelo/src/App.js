import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LouerVeloForm from './LouerVeloForm';
import ReturnVelo from './ReturnVelo';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LouerVeloForm />} />
          <Route path="/louerVelo/:idVelo" element={<LouerVeloForm />} />
          <Route path="/return/:idVelo" element={<ReturnVelo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
