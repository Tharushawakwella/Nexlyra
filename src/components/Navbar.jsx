import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, LayoutDashboard } from 'lucide-react'; // Admin Icon එකට LayoutDashboard ගත්තා

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(''); // 1. Role එක තියාගන්න State එකක්

    // Page එක Load වෙද්දී User සහ Role එක බලනවා
    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        const role = localStorage.getItem('userRole'); // 2. LocalStorage එකෙන් Role එක ගන්නවා

        if (authStatus === 'true') {
            setIsLoggedIn(true);
            setUserRole(role); // State එක Update කරනවා
        }
    }, []);

    // Logout Function
    const handleLogout = () => {
        if(window.confirm("Do you want to logout?")) {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userRole'); // Role එකත් Clear කරනවා
            
            setIsLoggedIn(false);
            setUserRole('');
            navigate('/login');
        }
    };

    // Contact Button Logic
    const handleContactClick = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Please Sign In to contact us!");
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <div className="logo">Nexlyra<span>Digital</span></div>
            
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contact" onClick={handleContactClick}>Contact</a></li>
            </ul>
            
            <div className="nav-buttons">
                {isLoggedIn ? (
                    // --- Log වෙලා නම් පෙන්වන Menu එක ---
                    <div className="logged-in-menu">
                        
                        {/* 3. මෙන්න Admin Logic එක: Role එක ADMIN නම් විතරක් මේ බටන් එක පෙන්වනවා */}
                        {userRole === 'ADMIN' && (
                            <Link to="/admin" className="profile-link" style={{ color: '#ec4899', fontWeight: 'bold', marginRight: '10px' }}>
                                <LayoutDashboard size={18} /> <span>Admin Board</span>
                            </Link>
                        )}

                        <Link to="/profile" className="profile-link">
                            <User size={18} /> <span>Profile</span>
                        </Link>
                        
                        <button onClick={handleLogout} className="btn-logout" title="Logout">
                            <LogOut size={18} />
                        </button>
                    </div>
                ) : (
                    // --- Log වෙලා නැත්නම් ---
                    <Link to="/login">
                        <button className="btn-nav-cta">Sign In</button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;