import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DoctorsList from './components/DoctorsList/DoctorsList';
// import Profile from './components/Profile/Profile';
import './App.css';


const App: React.FC = () => {
  return (
    <div className="App">
      <DoctorsList />
      {/* <Profile /> */}
    </div>
  );
};

export default App;
