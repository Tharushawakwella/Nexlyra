import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Footer එක අලුතින් import කළා
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar එක හැම පිටුවකම උඩින් පෙන්වන්න */}
        <Navbar />
        
        <Routes>
          {/* ප්‍රධාන පිටුව (Home Page) */}
          <Route path="/" element={<Home />} />
          
          {/* Sign In පිටුව (Login Page) */}
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* Footer එක හැම පිටුවකම යටින් පෙන්වන්න */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;