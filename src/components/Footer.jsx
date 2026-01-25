import React from 'react';
import './Footer.css';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Column 1: Company Info */}
                <div className="footer-section about">
                    <h2 className="footer-logo">Nexlyra<span>Digital</span></h2>
                    <p>
                        Engineering the next era of digital excellence. 
                        We build high-performance web applications and 
                        data-driven solutions for modern businesses.
                    </p>
                    <div className="socials">
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Linkedin size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#portfolio">Portfolio</a></li>
                        <li><a href="/login">Sign In</a></li>
                    </ul>
                </div>

                {/* Column 3: Contact Info */}
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <div className="contact-item">
                        <Phone size={18} className="contact-icon" />
                        <span>+94 77 123 4567</span>
                    </div>
                    <div className="contact-item">
                        <Mail size={18} className="contact-icon" />
                        <span>hello@nexlyra.com</span>
                    </div>
                    <div className="contact-item">
                        <MapPin size={18} className="contact-icon" />
                        <span>Colombo, Sri Lanka</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Nexlyra Digital. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;