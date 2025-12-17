import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ language, setLanguage, t }) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <img 
                  src="/logo.png" 
                  alt="TMC Tamil Nadu Logo" 
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div>
                <h3 className={`footer-logo-title ${language === 'ta' ? 'tamil-text' : ''}`}>TMC Tamil Nadu</h3>
                <p className={`footer-logo-subtitle ${language === 'ta' ? 'tamil-text' : ''}`}>
                  {language === 'ta' ? 'மக்களுக்காக' : 'For the People'}
                </p>
              </div>
            </div>
            <p className={`footer-text ${language === 'ta' ? 'tamil-text' : ''}`} style={{ marginTop: '20px' }}>
              {language === 'ta' 
                ? 'தமிழ்நாட்டின் முன்னேற்றத்திற்கும், சமூக நீதிக்கும் அர்ப்பணிக்கப்பட்ட அரசியல் இயக்கம்.'
                : 'A political movement dedicated to Tamil Nadu\'s progress and social justice.'}
            </p>
          </div>
          <div>
            <h4 className={`footer-heading ${language === 'ta' ? 'tamil-text' : ''}`}>
              {language === 'ta' ? 'விரைவு இணைப்புகள்' : 'Quick Links'}
            </h4>
            <ul className="footer-list">
              {t.nav.slice(1, 5).map((item) => (
                <li key={item.id}>
                  <Link to={item.path} className={`footer-link ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" className={`footer-link ${language === 'ta' ? 'tamil-text' : ''}`}>
                  {t.nav.find(n => n.id === 'contact').label}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={`footer-heading ${language === 'ta' ? 'tamil-text' : ''}`}>
              {language === 'ta' ? 'சட்டப்பூர்வம்' : 'Legal'}
            </h4>
            <ul className="footer-list">
              <li><Link to="/privacy" className={`footer-link ${language === 'ta' ? 'tamil-text' : ''}`}>
                {language === 'ta' ? 'தனியுரிமைக் கொள்கை' : 'Privacy Policy'}
              </Link></li>
              <li><Link to="/terms" className={`footer-link ${language === 'ta' ? 'tamil-text' : ''}`}>
                {language === 'ta' ? 'சேவை விதிமுறைகள்' : 'Terms of Service'}
              </Link></li>
              <li><Link to="/disclaimer" className={`footer-link ${language === 'ta' ? 'tamil-text' : ''}`}>
                {language === 'ta' ? 'மறுப்பு' : 'Disclaimer'}
              </Link></li>
            </ul>
          </div>
          <div>
            <h4 className={`footer-heading ${language === 'ta' ? 'tamil-text' : ''}`}>
              {language === 'ta' ? 'செய்திமடல்' : 'Newsletter'}
            </h4>
            <p className={`footer-text ${language === 'ta' ? 'tamil-text' : ''}`}>
              {language === 'ta' ? 'எங்கள் பணியுடன் தொடர்புடையே இருங்கள்' : 'Stay updated with our work'}
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder={language === 'ta' ? 'உங்கள் மின்னஞ்சல்' : 'Your email'} 
                className="newsletter-input"
                aria-label={language === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email address'}
              />
              <button className={`newsletter-button ${language === 'ta' ? 'tamil-text' : ''}`}>
                {language === 'ta' ? 'சந்தா' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className={`footer-copyright ${language === 'ta' ? 'tamil-text' : ''}`}>
            © 2025 Trinamool Congress Tamil Nadu. {
              language === 'ta' ? 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' : 'All rights reserved.'
            }
          </p>
          <p className="footer-language-note">
            <span style={{ marginRight: '10px' }}>
              {language === 'ta' ? 'மொழி: தமிழ்' : 'Language: English'}
            </span>
            <button 
              onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
              className="footer-language-toggle"
            >
              {language === 'ta' ? 'Switch to English' : 'தமிழுக்கு மாற்றுக'}
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;