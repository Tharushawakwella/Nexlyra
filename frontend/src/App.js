import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages Import
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard'; // 1. මේක Import කරන්න

// Components Import
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar එක හැම Page එකකම උඩින් තියෙනවා */}
        <Navbar />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes (Log වුණාම විතරක් යන්න පුළුවන් ඒවා) */}
          <Route path="/profile" element={<Profile />} />
          
          {/* Admin Route (AdminDashboard එකට පාර) */}
          <Route path="/admin" element={<AdminDashboard />} /> {/* 2. මේ පේළිය එකතු කරන්න */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;