import React, { useState } from 'react';
import './Login.css';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   
    const handleAuth = async (e) => {
        e.preventDefault();
        
        const endpoint = isLogin ? "login" : "signup";
        const url = `https://nexlyra.onrender.com/api/auth/${endpoint}`;

        console.log("Sending data to:", url);

        try {
            const response = await axios.post(url, formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true 
            });
            
            
            if (isLogin) {
                
                if (response.data.message === "Login Successful!") {
                    
                    
                    localStorage.setItem('isAuthenticated', 'true');
                    
                    
                    localStorage.setItem('userEmail', response.data.email);

                   
                    localStorage.setItem('userRole', response.data.role);

                    alert("Welcome Back! Redirecting to Home...");
                    navigate('/'); 
                    
                   
                    window.location.reload(); 
                } else {
                
                    alert(response.data.message || "Login Failed"); 
                }
            } else {
                
                if (response.data === "User registered successfully!") {
                    alert("Registration Successful! Please Sign In.");
                    setIsLogin(true); 
                    setFormData({ ...formData, password: '' });
                } else {
                    alert(response.data);
                }
            }
            // -------------------------------------------

        } catch (error) {
            console.error("Error Details:", error);
            
            if (error.response && error.response.data) {
                alert(error.response.data); 
            } else {
                alert("Connection Failed! Check console for details.");
            }
        }
    };

    // Animation Variants
    const formVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="login-container">
            <div className="login-bg-visual"><div className="login-blob"></div></div>

            <motion.div className="auth-card" initial="hidden" animate="visible" variants={formVariants}>
                <div className="auth-header">
                    <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
                    <p>{isLogin ? 'Please sign in to continue.' : 'Start your journey with Nexlyra.'}</p>
                </div>

                <form className="auth-form" onSubmit={handleAuth}>
                    {!isLogin && (
                        <div className="input-group">
                            <User size={20} className="input-icon" />
                            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                        </div>
                    )}
                    <div className="input-group">
                        <Mail size={20} className="input-icon" />
                        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <Lock size={20} className="input-icon" />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} className="btn-auth" type="submit">
                        {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} />
                    </motion.button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Sign In'}</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;