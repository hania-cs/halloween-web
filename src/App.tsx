import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Houses from './pages/Houses';
import Pumpkins from './pages/Pumpkins';
import Games from './pages/Games';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen text-orange-500 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/pumpkins" element={<Pumpkins />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;