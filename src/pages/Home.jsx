import React from 'react';
// CSS එක අනිවාර්යයෙන්ම import කරන්න
import './Home.css';
// Icons සඳහා (install කර නැතිනම්: npm install lucide-react)
import { Code2 } from 'lucide-react'; 

const Home = () => {
    return (
        <div className="home-container">
        

            {/* Hero Section - ඔබේ විස්තර පමණයි */}
            <header className="hero-section">
                <div className="hero-content">
                    {/* ප්‍රධාන මාතෘකාව - ඔබේ සේවාවන් ගැන */}
                    <h1 className="hero-title">
                        Premium Web <br/>
                        Engineering & <br/>
                        <span style={{color: '#a855f7'}}>Data Insights.</span>
                    </h1>
                    
                    {/* උප මාතෘකාව - ඔබ භාවිතා කරන තාක්ෂණයන් */}
                    <p className="hero-subtitle">
                        Specializing in high-performance full-stack development with 
                        <strong> React & Spring Boot</strong>, and turning complex datasets 
                        into actionable business intelligence.
                    </p>
                    
                    {/* Button එක */}
                    <button className="btn-get-started">See Our Work</button>
                </div>

                {/* ඇනිමේෂන් කොටස (CSS මගින් පාලනය වේ) */}
                <div className="hero-visual">
                    {/* පසුබිමේ දිලිසෙන එළිය */}
                    <div className="glowing-path"></div>
                    {/* පාවී යන රන් කාසිය */}
                    <div className="coin"></div>
                </div>
            </header>
        </div>
    );
};

export default Home;