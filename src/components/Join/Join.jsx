import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Home/Navbar'; // Reusing Navbar
import Footer from '../Home/Footer'; // Reusing Footer
import { content } from '../../data/content'; // Importing shared content
import './Join.css';
import { Check, UserPlus, Heart, Users, MapPin, Mail, Phone } from 'lucide-react';

const Join = () => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('tmc-tn-language') || 'en';
    });

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        district: '',

        address: '',
        membershipType: 'volunteer',
        message: ''
    });

    const t = content[language];

    // Update local storage when language changes
    useEffect(() => {
        localStorage.setItem('tmc-tn-language', language);
    }, [language]);

    // Scroll handler
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSuccess(true);
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const districts = [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
        "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri",
        "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur",
        "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
        "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur",
        "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram",
        "Virudhunagar"
    ];

    return (
        <div className="join-page">
            <Navbar
                scrolled={scrolled}
                language={language}
                setLanguage={setLanguage}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                t={t}
            />

            {/* Hero Section */}
            <section className="join-hero">
                <div className="join-hero-content">
                    <div className="join-hero-decoration">
                        <div className="join-hero-tricolor-line"></div>
                    </div>
                    <h1 className={`join-title ${language === 'ta' ? 'tamil-text' : ''}`}>
                        {t.join.title}
                    </h1>
                    <p className={`join-subtitle ${language === 'ta' ? 'tamil-text' : ''}`}>
                        {t.join.subtitle}
                    </p>
                </div>
            </section>

            <div className="join-container">
                {/* Information Side */}
                <div className="join-info slide-up">
                    <h3 className={language === 'ta' ? 'tamil-text' : ''}>
                        {language === 'ta' ? 'ஏன் இணைய வேண்டும்?' : 'Why Join Us?'}
                    </h3>

                    <ul className="join-benefits">
                        <li>
                            <Check className="check-icon" size={20} />
                            <span className={language === 'ta' ? 'tamil-text' : ''}>
                                {language === 'ta' ? 'மாற்றத்தின் ஒரு பகுதியாக இருங்கள்' : 'Be a part of the change'}
                            </span>
                        </li>
                        <li>
                            <Check className="check-icon" size={20} />
                            <span className={language === 'ta' ? 'tamil-text' : ''}>
                                {language === 'ta' ? 'சமூக சேவையில் ஈடுபடுங்கள்' : 'Engage in community service'}
                            </span>
                        </li>
                        <li>
                            <Check className="check-icon" size={20} />
                            <span className={language === 'ta' ? 'tamil-text' : ''}>
                                {language === 'ta' ? 'எதிர்கால தலைவர்களை உருவாக்குங்கள்' : 'Build future leaders'}
                            </span>
                        </li>
                        <li>
                            <Check className="check-icon" size={20} />
                            <span className={language === 'ta' ? 'tamil-text' : ''}>
                                {language === 'ta' ? 'மக்களுக்காக குரல் கொடுங்கள்' : 'Voice for the people'}
                            </span>
                        </li>
                    </ul>

                    <div style={{ marginTop: '40px' }}>
                        <h3 className={language === 'ta' ? 'tamil-text' : ''}>
                            {language === 'ta' ? 'தொடர்புக்கு' : 'Contact Support'}
                        </h3>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center' }}>
                            <Mail size={20} color="#138808" />
                            <span>info@tmctamilnadu.org</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Phone size={20} color="#138808" />
                            <span>+91 44 1234 5678</span>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="join-form-card slide-up" style={{ animationDelay: '0.2s' }}>
                    {isSuccess ? (
                        <div className="success-message">
                            <div className="success-icon">
                                <Check size={40} color="#138808" />
                            </div>
                            <h2 className={language === 'ta' ? 'tamil-text' : ''}>
                                {language === 'ta' ? 'நன்றி!' : 'Thank You!'}
                            </h2>
                            <p className={language === 'ta' ? 'tamil-text' : ''}>
                                {language === 'ta'
                                    ? 'உங்கள் பதிவு வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது. விரைவில் உங்களை தொடர்பு கொள்வோம்.'
                                    : 'Your registration has been submitted successfully. We will contact you soon.'}
                            </p>
                            <button
                                className="secondary-button"
                                style={{ marginTop: '20px', borderColor: '#138808', color: '#138808' }}
                                onClick={() => {
                                    setIsSuccess(false);
                                    setFormData({
                                        firstName: '', lastName: '', email: '', phone: '',
                                        district: '', address: '',
                                        membershipType: 'volunteer', message: ''
                                    });
                                }}
                            >
                                {language === 'ta' ? 'மற்றொரு பதிவு' : 'Register Another'}
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="form-header">
                                <h2 className={language === 'ta' ? 'tamil-text' : ''}>
                                    {language === 'ta' ? 'பதிவு படிவம்' : 'Registration Form'}
                                </h2>
                                <p style={{ color: '#6b7280' }}>
                                    {language === 'ta' ? 'கீழுள்ள படிவத்தை பூர்த்தி செய்யவும்' : 'Please fill out the form below'}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className={`form-label ${language === 'ta' ? 'tamil-text' : ''}`}>
                                            {language === 'ta' ? 'முதல் பெயர்' : 'First Name'} *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            className="form-input"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className={`form-label ${language === 'ta' ? 'tamil-text' : ''}`}>
                                            {language === 'ta' ? 'கடைசி பெயர்' : 'Last Name'} *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            className="form-input"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className={`form-label ${language === 'ta' ? 'tamil-text' : ''}`}>
                                            {t.join.form.email} *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="form-input"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className={`form-label ${language === 'ta' ? 'tamil-text' : ''}`}>
                                            {t.join.form.phone} *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            className="form-input"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <label className={`form-label ${language === 'ta' ? 'tamil-text' : ''}`}>
                                        {t.join.form.district} *
                                    </label>
                                    <select
                                        name="district"
                                        required
                                        className="form-select"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select District</option>
                                        {districts.map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label className={`form-label ${language === 'ta' ? 'tamil-text' : ''}`}>
                                        {language === 'ta' ? 'முகவரி' : 'Address'}
                                    </label>
                                    <textarea
                                        name="address"
                                        className="form-textarea"
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Membership Type</label>
                                    <div className="form-checkbox-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="radio"
                                                name="membershipType"
                                                value="volunteer"
                                                checked={formData.membershipType === 'volunteer'}
                                                onChange={handleInputChange}
                                            />
                                            <span className={language === 'ta' ? 'tamil-text' : ''}>
                                                {t.join.form.volunteer}
                                            </span>
                                        </label>
                                        <label className="checkbox-label">
                                            <input
                                                type="radio"
                                                name="membershipType"
                                                value="member"
                                                checked={formData.membershipType === 'member'}
                                                onChange={handleInputChange}
                                            />
                                            <span className={language === 'ta' ? 'tamil-text' : ''}>
                                                {t.join.form.member}
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`submit-btn ${language === 'ta' ? 'tamil-text' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? (language === 'ta' ? 'காத்திருக்கவும்...' : 'Processing...')
                                        : t.join.form.submit}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>

            <Footer language={language} setLanguage={setLanguage} t={t} />
        </div>
    );
};

export default Join;
