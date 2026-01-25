import React, { useState } from 'react';
import './Home.css';
import { 
    Layout, Server, Database, LineChart, Code, ShieldCheck, 
    ExternalLink, Github, Mail, Phone, MapPin, Send 
} from 'lucide-react';

const Home = () => {
    // 1. Ripple Effect State
    const [ripples, setRipples] = useState([]);

    // --- DATA: Services List ---
    const servicesList = [
        {
            icon: <Layout size={30} />,
            title: "Full-Stack Web Apps",
            description: "Building powerful web applications like 'Vehix' using React and Spring Boot."
        },
        {
            icon: <Server size={30} />,
            title: "Enterprise Backend",
            description: "Scalable backend systems designed with Java Spring Boot for secure data management."
        },
        {
            icon: <LineChart size={30} />,
            title: "Data Science",
            description: "Transforming raw data into actionable insights with predictive modeling and analysis."
        },
        {
            icon: <Database size={30} />,
            title: "Database Architecture",
            description: "Optimized SQL/NoSQL database design for secure and fast data retrieval."
        },
        {
            icon: <Code size={30} />,
            title: "API Development",
            description: "Fast RESTful APIs to connect mobile apps and third-party services."
        },
        {
            icon: <ShieldCheck size={30} />,
            title: "System Security",
            description: "Implementing JWT auth and RBAC to keep your enterprise apps safe."
        }
    ];

    // --- DATA: Portfolio Projects ---
    const projects = [
        {
            title: "Vehix - Service System",
            category: "Full Stack Development",
            image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600",
            description: "A comprehensive vehicle service management platform built with React and Spring Boot. Features appointment scheduling and admin dashboards."
        },
        {
            title: "E-Commerce Analytics",
            category: "Data Science",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
            description: "An intelligent dashboard for dropshipping businesses to analyze sales trends and optimize inventory using Python & R."
        },
        {
            title: "AI Terminal Companion",
            category: "Artificial Intelligence",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600",
            description: "A Linux-based terminal assistant leveraging local LLMs (Ollama) to automate shell scripting and system tasks."
        }
    ];

    // --- FUNCTION: Ripple Effect ---
    const createRipple = (e) => {
        if(e.target.closest('.service-card') || e.target.closest('.project-card') || e.target.closest('input') || e.target.closest('textarea')) return; 

        const container = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - container.left;
        const y = e.clientY - container.top;
        const newRipple = { x, y, id: Date.now() };
        setRipples([...ripples, newRipple]);
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 800);
    };

    return (
        <div className="home-container" onClick={createRipple}>
            
            {/* --- 1. HERO SECTION --- */}
            <header className="hero-section" id="home">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Premium Web <br/>
                        Engineering & <br/>
                        <span style={{color: '#a855f7'}}>Data Insights.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Specializing in high-performance full-stack development with 
                        <strong> React & Spring Boot</strong>, and turning complex datasets 
                        into actionable business intelligence.
                    </p>
                    <div className="hero-buttons">
                        <a href="#portfolio"><button className="btn-get-started">View Our Work</button></a>
                        <a href="#contact"><button className="btn-outline">Contact Us</button></a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="glowing-path"></div>
                    <div className="coin"></div>
                </div>
            </header>

            {/* --- 2. ABOUT SECTION --- */}
            <section className="section about-section" id="about">
                <div className="about-content">
                    <div className="about-text">
                        <h2>Who We <span style={{color: '#a855f7'}}>Are</span></h2>
                        <p>
                            Nexlyra Digital is a forward-thinking tech agency founded by a passionate Data Science undergraduate. 
                            We bridge the gap between <strong>complex data analysis</strong> and <strong>modern web engineering</strong>.
                        </p>
                        <p>
                            Whether you need a high-performance Enterprise Application or a smart algorithm to predict your next business move, 
                            we have the technical expertise to make it happen.
                        </p>
                    </div>
                    <div className="about-stats">
                        <div className="stat-box">
                            <h3>3+</h3>
                            <p>Years Coding</p>
                        </div>
                        <div className="stat-box">
                            <h3>10+</h3>
                            <p>Projects Done</p>
                        </div>
                        <div className="stat-box">
                            <h3>100%</h3>
                            <p>Client Satisfaction</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. SERVICES SECTION --- */}
            <section className="section services-section" id="services">
                <div className="section-header">
                    <h2>Our <span style={{color: '#ec4899'}}>Services</span></h2>
                    <p>Comprehensive digital solutions tailored to elevate your business.</p>
                </div>
                <div className="services-grid">
                    {servicesList.map((service, index) => (
                        <div className="service-card" key={index}>
                            <div className="icon-box">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 4. PORTFOLIO SECTION --- */}
            <section className="section portfolio-section" id="portfolio">
                <div className="section-header">
                    <h2>Featured <span style={{color: '#a855f7'}}>Projects</span></h2>
                    <p>A glimpse into our recent technical endeavors.</p>
                </div>
                <div className="portfolio-grid">
                    {projects.map((project, index) => (
                        <div className="project-card" key={index}>
                            <div className="project-image" style={{backgroundImage: `url(${project.image})`}}></div>
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

            {/* --- 5. CONTACT SECTION --- */}
            <section className="section contact-section" id="contact">
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <h2>Let's Build Something <br/> <span style={{color: '#ec4899'}}>Great Together.</span></h2>
                        <p>Have a project in mind? Reach out to us for a consultation.</p>
                        
                        <div className="info-item">
                            <Mail className="c-icon" /> <span>hello@nexlyra.com</span>
                        </div>
                        <div className="info-item">
                            <Phone className="c-icon" /> <span>+94 77 123 4567</span>
                        </div>
                        <div className="info-item">
                            <MapPin className="c-icon" /> <span>Colombo, Sri Lanka</span>
                        </div>
                    </div>

                    <form className="contact-form">
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea rows="4" placeholder="Tell us about your project..."></textarea>
                        </div>
                        <button type="submit" className="btn-submit"><Send size={18}/> Send Message</button>
                    </form>
                </div>
            </section>

            {/* Ripples Rendering */}
            {ripples.map((ripple) => (
                <span key={ripple.id} className="ripple-effect" style={{ left: ripple.x, top: ripple.y }}></span>
            ))}
        </div>
    );
};

export default Home;