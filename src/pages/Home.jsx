import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { 
    Layout, Server, Database, LineChart, Code, ShieldCheck, 
    ExternalLink, Github, Mail, Phone, MapPin, Send 
} from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const [ripples, setRipples] = useState([]);

    // --- 1. DEFAULT DATA ---
    const defaultServices = [
        { iconName: "Layout", title: "Full-Stack Web Apps", description: "Building powerful web applications like 'Vehix' using React and Spring Boot." },
        { iconName: "Server", title: "Enterprise Backend", description: "Scalable backend systems designed with Java Spring Boot for secure data management." },
        { iconName: "LineChart", title: "Data Science", description: "Transforming raw data into actionable insights with predictive modeling and analysis." },
        { iconName: "Database", title: "Database Architecture", description: "Optimized SQL/NoSQL database design for secure and fast data retrieval." },
        { iconName: "Code", title: "API Development", description: "Fast RESTful APIs to connect mobile apps and third-party services." },
        { iconName: "ShieldCheck", title: "System Security", description: "Implementing JWT auth and RBAC to keep your enterprise apps safe." }
    ];

    const defaultProjects = [
        { title: "Vehix - Service System", category: "Full Stack Development", imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600", description: "A comprehensive vehicle service management platform built with React and Spring Boot." },
        { title: "E-Commerce Analytics", category: "Data Science", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600", description: "An intelligent dashboard for dropshipping businesses to analyze sales trends." },
        { title: "AI Terminal Companion", category: "Artificial Intelligence", imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600", description: "A Linux-based terminal assistant leveraging local LLMs (Ollama)." }
    ];

    // --- 2. STATES ---
    const [services, setServices] = useState(defaultServices);
    const [projects, setProjects] = useState(defaultProjects);
    
    // --- NEW: Footer State (අලුතින් එකතු කළා) ---
    const [footerText, setFooterText] = useState("© 2026 Nexlyra Digital. All rights reserved.");

    // Contact Form State
    const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

    // --- 3. DATA FETCHING ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Services 
                const srvRes = await axios.get("https://nexlyra.onrender.com/api/admin/services");
                if (srvRes.data.length > 0) {
                    setServices(srvRes.data); 
                }

                // Projects 
                const prjRes = await axios.get("https://nexlyra.onrender.com/api/admin/projects");
                if (prjRes.data.length > 0) {
                    setProjects(prjRes.data);
                }

                // --- NEW: Fetch Footer Data (අලුතින් එකතු කළා) ---
                const footRes = await axios.get("https://nexlyra.onrender.com/api/footer/get");
                if (footRes.data && footRes.data.text) {
                    setFooterText(footRes.data.text);
                }

            } catch (error) {
                console.log("Using default data (Backend might be offline or empty).");
            }
        };
        fetchData();
    }, []);

    // --- HELPER: ICON MAPPER ---
    const getIcon = (iconName) => {
        const icons = { Layout, Server, Database, LineChart, Code, ShieldCheck };
        const IconComponent = icons[iconName] || Layout; // Default Icon
        return <IconComponent size={30} />;
    };

    // --- CONTACT FORM LOGIC ---
    const handleContactChange = (e) => {
        setContactData({ ...contactData, [e.target.name]: e.target.value });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const isLoggedIn = localStorage.getItem('isAuthenticated');
        if (isLoggedIn !== 'true') {
            alert("Please Sign In to send a message.");
            navigate('/login');
            return;
        }

        try {
            await axios.post("https://nexlyra.onrender.com/api/contact/send", contactData);
            alert("Message Sent Successfully!");
            setContactData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        }
    };

    const handleContactClick = () => {
        const isLoggedIn = localStorage.getItem('isAuthenticated');
        if (isLoggedIn === 'true') {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Please Sign In to contact us!");
            navigate('/login');
        }
    };

    const createRipple = (e) => {
        if(e.target.closest('.service-card') || e.target.closest('.project-card') || e.target.closest('input') || e.target.closest('textarea') || e.target.closest('button')) return; 
        const container = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - container.left;
        const y = e.clientY - container.top;
        const newRipple = { x, y, id: Date.now() };
        setRipples([...ripples, newRipple]);
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 800);
    };

    return (
        <div className="home-container" onClick={createRipple}>
            
            {/* HERO SECTION */}
            <header className="hero-section" id="home">
                <div className="hero-content">
                    <h1 className="hero-title">Premium Web <br/> Engineering & <br/> <span style={{color: '#a855f7'}}>Data Insights.</span></h1>
                    <p className="hero-subtitle">Specializing in high-performance full-stack development with <strong> React & Spring Boot</strong>, and turning complex datasets into actionable business intelligence.</p>
                    <div className="hero-buttons">
                        <a href="#portfolio"><button className="btn-get-started">View Our Work</button></a>
                        <button className="btn-outline" onClick={handleContactClick}>Contact Us</button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="glowing-path"></div>
                    <div className="coin"></div>
                </div>
            </header>

            {/* ABOUT SECTION */}
            <section className="section about-section" id="about">
                <div className="about-content">
                    <div className="about-text">
                        <h2>Who We <span style={{color: '#a855f7'}}>Are</span></h2>
                        <p>Nexlyra Digital is a forward-thinking tech agency founded by a passionate Data Science undergraduate. We bridge the gap between <strong>complex data analysis</strong> and <strong>modern web engineering</strong>.</p>
                        <p>Whether you need a high-performance Enterprise Application or a smart algorithm to predict your next business move, we have the technical expertise to make it happen.</p>
                    </div>
                    <div className="about-stats">
                        <div className="stat-box"><h3>3+</h3><p>Years Coding</p></div>
                        <div className="stat-box"><h3>10+</h3><p>Projects Done</p></div>
                        <div className="stat-box"><h3>100%</h3><p>Client Satisfaction</p></div>
                    </div>
                </div>
            </section>

            {/* SERVICES SECTION */}
            <section className="section services-section" id="services">
                <div className="section-header"><h2>Our <span style={{color: '#ec4899'}}>Services</span></h2><p>Comprehensive digital solutions tailored to elevate your business.</p></div>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div className="service-card" key={service.id || index}>
                            <div className="icon-box">
                                {service.icon || getIcon(service.iconName)}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PORTFOLIO SECTION */}
            <section className="section portfolio-section" id="portfolio">
                <div className="section-header"><h2>Featured <span style={{color: '#a855f7'}}>Projects</span></h2><p>A glimpse into our recent technical endeavors.</p></div>
                <div className="portfolio-grid">
                    {projects.map((project, index) => (
                        <div className="project-card" key={project.id || index}>
                            <div className="project-image" style={{backgroundImage: `url(${project.imageUrl || project.image})`}}></div>
                            <div className="project-info">
                                <span className="category">{project.category}</span>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-links">
                                    <button className="btn-sm"><Github size={16}/> Code</button>
                                    <button className="btn-sm"><ExternalLink size={16}/> Live Demo</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="section contact-section" id="contact">
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <h2>Let's Build Something <br/> <span style={{color: '#ec4899'}}>Great Together.</span></h2>
                        <p>Have a project in mind? Reach out to us for a consultation.</p>
                        <div className="info-item"><Mail className="c-icon" /> <span>hello@nexlyra.com</span></div>
                        <div className="info-item"><Phone className="c-icon" /> <span>+94 77 123 4567</span></div>
                        <div className="info-item"><MapPin className="c-icon" /> <span>Colombo, Sri Lanka</span></div>
                    </div>

                    <form className="contact-form" onSubmit={handleSendMessage}>
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" name="name" placeholder="John Doe" value={contactData.name} onChange={handleContactChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" placeholder="john@example.com" value={contactData.email} onChange={handleContactChange} required />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea name="message" rows="4" placeholder="Tell us about your project..." value={contactData.message} onChange={handleContactChange} required ></textarea>
                        </div>
                        <button type="submit" className="btn-submit"><Send size={18}/> Send Message</button>
                    </form>
                </div>
            </section>

            {/* --- NEW: DYNAMIC FOOTER (අලුතින් එකතු කළා) --- */}
            <footer style={{textAlign: 'center', padding: '20px', background: '#0f172a', color: '#94a3b8', borderTop: '1px solid #1e293b'}}>
                <p>{footerText}</p>
            </footer>

            {ripples.map((ripple) => (
                <span key={ripple.id} className="ripple-effect" style={{ left: ripple.x, top: ripple.y }}></span>
            ))}
        </div>
    );
};

export default Home;