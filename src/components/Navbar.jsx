import React from 'react';
import { Link } from 'react-router-dom'; // Link import කරන්න ඕනේ
import './Navbar.css';
import { Code2 } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Code2 className="logo-icon" color="#ec4899" size={28} />
                <span>Nexlyra Digital</span>
            </div>
            <div className="nav-links">
                {/* href වෙනුවට Link භාවිතා කරන්න */}
                <Link to="/">Home</Link>
                <a href="/#services">Web Services</a>
                <a href="/#data-science">Data Science</a>
                <a href="/#portfolio">Portfolio</a>
                
                {/* Sign In පිටුවට යන Button එක */}
                <Link to="/login">
                    <button className="btn-nav-cta">Sign In</button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;