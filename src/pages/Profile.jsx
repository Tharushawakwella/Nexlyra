import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield } from 'lucide-react';
import './Home.css'; // Home එකේ Style ම ගමු (Dark Theme එකට)

const Profile = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Log වෙලා නැත්නම් එළියට දානවා
        const auth = localStorage.getItem('isAuthenticated');
        if (!auth) {
            navigate('/login');
        } else {
            // Save කරපු Email එක ගන්නවා
            setEmail(localStorage.getItem('userEmail') || 'User');
        }
    }, [navigate]);

    return (
        <div className="home-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '80px' }}>
            
            {/* Background Visuals */}
            <div className="hero-visual" style={{ position: 'absolute', zIndex: 0, opacity: 0.5 }}>
                <div className="glowing-path"></div>
            </div>

            {/* Profile Card */}
            <div className="auth-card" style={{ zIndex: 10, textAlign: 'center', padding: '3rem', minWidth: '400px' }}>
                <div style={{ 
                    width: '100px', height: '100px', background: '#a855f7', 
                    borderRadius: '50%', margin: '0 auto 20px', display: 'flex', 
                    justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)'
                }}>
                    <User size={50} color="white" />
                </div>

                <h2 style={{ color: 'white', marginBottom: '10px' }}>Welcome Back!</h2>
                <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Member of Nexlyra Digital</p>

                <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', color: '#e2e8f0' }}>
                        <Mail color="#a855f7" /> 
                        <span>{email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#e2e8f0' }}>
                        <Shield color="#ec4899" /> 
                        <span>Standard User Access</span>
                    </div>
                </div>

                <button 
                    onClick={() => navigate('/')}
                    className="btn-outline" 
                    style={{ marginTop: '30px', width: '100%', borderColor: '#a855f7', color: 'white' }}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Profile;