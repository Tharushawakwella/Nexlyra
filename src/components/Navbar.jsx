import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Code2, Menu, X } from 'lucide-react'; // Menu සහ X අයිකන import කරන්න

const Navbar = () => {
    // Menu එක Open ද Close ද කියලා බලන්න State එකක්
    const [isOpen, setIsOpen] = useState(false);

    // Menu එක Open/Close කරන Function එක
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Link එකක් Click කළාම Menu එක ඉබේම වැහෙන්න ඕනේ
    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Code2 className="logo-icon" color="#ec4899" size={28} />
                <span>Nexlyra Digital</span>
            </div>

            {/* Mobile Menu Icon එක (Phone එකේදී විතරක් වැඩ) */}
            <div className="mobile-menu-icon" onClick={toggleMenu}>
                {isOpen ? <X size={30} /> : <Menu size={30} />}
            </div>

            {/* Nav Links Container */}
            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
    <a href="/#home" onClick={closeMenu}>Home</a>
    <a href="/#about" onClick={closeMenu}>About</a>
    <a href="/#services" onClick={closeMenu}>Services</a>
    <a href="/#portfolio" onClick={closeMenu}>Portfolio</a>
    <a href="/#contact" onClick={closeMenu}>Contact</a>
    
    <Link to="/login" onClick={closeMenu}>
        <button className="btn-nav-cta">Sign In</button>
    </Link>
</div>
        </nav>
    );
};

export default Navbar;