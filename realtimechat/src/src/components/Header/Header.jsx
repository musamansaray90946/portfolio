import React, { useState } from 'react';
import './Header.css';

const Header = ({ darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <a href="#home">Musa<span>M</span></a>
          </div>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>

            <a
              href="/Musa-new-resume-1.pdf"
              download
              className="btn btn-outline resume-btn"
            >
              Download CV
            </a>

            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;