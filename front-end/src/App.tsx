import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorsList from './components/DoctorsList/DoctorsList';
import Profile from './components/Profile/Profile';
import './App.css';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorsList/>} />
        <Route path="/doctor/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
