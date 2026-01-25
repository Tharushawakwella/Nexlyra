import React, { useState } from 'react';
import './Login.css';
import Navbar from '../components/Navbar'; // Navbar එක උඩින් පෙන්වන්න

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Attempt:", email, password);
        // මෙතනට පස්සේ කාලෙක Backend එක සම්බන්ධ කරන්න පුළුවන්
    };

    return (
        <>
            {/* Navbar එක අනිවාර්යයෙන්ම ඕනේ */}
            <div className="login-container">
                {/* පසුබිමේ තියෙන දිලිසෙන රවුම */}
                <div className="login-bg-glow"></div>

                <div className="login-card">
                    <div className="login-header">
                        <h2>Welcome Back</h2>
                        <p>Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Email Address</label>
                            <input 
                                type="email" 
                                className="input-field" 
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <input 
                                type="password" 
                                className="input-field" 
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>

                        <button type="submit" className="btn-login">Sign In</button>
                    </form>

                    <div className="login-footer">
                        Don't have an account? <a href="#" className="link-highlight">Sign up</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;