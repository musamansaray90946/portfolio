import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Musa Mansaray</span>
            </h1>
            <h2 className="hero-subtitle">
              Full Stack Developer & Problem Solver
            </h2>
            <p className="hero-description">
              I build exceptional digital experiences that are fast, accessible, 
              visually appealing, and responsive. Passionate about creating 
              efficient solutions and learning new technologies.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn">
                View Projects
              </a>
              <a href="#contact" className="btn btn-outline">
                Contact Me
              </a>
            </div>
            <div className="hero-social">
              <a href="https://github.com/musamansaray90946" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="mailto:your.email@example.com">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-wrapper">
              <img src="/profile.jpg" alt="Musa Mansaray" />
              <div className="image-bg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;