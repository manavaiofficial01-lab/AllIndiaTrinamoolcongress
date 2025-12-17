import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ 
  scrolled, 
  language, 
  setLanguage, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  t
}) => {
  const location = useLocation();
  
  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo-section">
              <Link to="/" className="logo-link">
                <div className="logo-image-wrapper">
                  <img 
                    src="/logo.png" 
                    alt="Trinamool Congress Tamil Nadu" 
                    className="logo-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div style="color: #138808; font-weight: bold; font-size: 20px;">
                          Trinamool Congress
                          <div style="font-size: 14px; color: #FF9933;">Tamil Nadu</div>
                        </div>
                      `;
                    }}
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="nav-links">
              {t.nav.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`nav-link ${language === 'ta' ? 'tamil-text' : ''} ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
              <button 
                onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
                className="lang-button"
                aria-label={language === 'ta' ? 'Switch to English' : 'Switch to Tamil'}
              >
                {language === 'ta' ? 'EN' : 'த'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-button"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        role="presentation"
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <aside className={`mobile-menu-panel ${mobileMenuOpen ? 'active' : ''} ${language === 'ta' ? 'tamil-menu' : ''}`} aria-label="Mobile menu">
        <div className="mobile-menu-header">
          <div className={`mobile-menu-title ${language === 'ta' ? 'tamil-text' : ''}`}>
            {language === 'ta' ? 'மெனு' : 'Menu'}
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-menu-close"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        
        <nav className="mobile-menu-links">
          {t.nav.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`mobile-menu-link ${language === 'ta' ? 'tamil-text' : ''} ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button 
            onClick={() => {
              setLanguage(language === 'ta' ? 'en' : 'ta');
              setMobileMenuOpen(false);
            }}
            className={`mobile-menu-link language-switch ${language === 'ta' ? 'tamil-text' : ''}`}
          >
            {language === 'ta' ? 'Switch to English' : 'தமிழுக்கு மாற்றுக'}
          </button>
        </nav>
        
       
      </aside>
    </>
  );
};

export default Navbar;