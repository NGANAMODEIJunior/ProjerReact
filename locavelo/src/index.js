import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import LouerVeloForm from './LouerVeloForm';
import ReturnVelo from './ReturnVelo';
import './index.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/louerVelo/:idVelo" element={<LouerVeloForm />} />
      <Route path="/return" element={<ReturnVelo />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
