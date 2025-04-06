import React from 'react';
import axios from 'axios';
import './App.css';

import Homepage from './pages/homepage';
import Login from './pages/login';
import Register from './pages/signup';
import Dashboard from './pages/dashboard';
import Analysis from './pages/analysis';
import Tiltcalculation from './pages/tiltcalculation';

import { AuthProvider } from './contexts/authContext';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/analysis' element={<Analysis />} />
        <Route path='/tiltcalculation' element={<Tiltcalculation />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
