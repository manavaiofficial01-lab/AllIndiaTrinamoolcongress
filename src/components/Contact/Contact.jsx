import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Contact.css';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Youtube
} from 'lucide-react';

const Contact = () => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('tmc-tn-language');
    return savedLanguage || 'en';
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  // Content translations with social media links
  const content = {
    en: {
      nav: [
        { id: 'home', label: 'Home', path: '/' },
        { id: 'about', label: 'About', path: '/about' },
        { id: 'leadership', label: 'Leadership', path: '/leadership' },
        { id: 'vision', label: 'Vision', path: '/vision' },
        { id: 'initiatives', label: 'Initiatives', path: '/initiatives' },
        { id: 'news', label: 'News', path: '/news' },
        { id: 'join', label: 'Join Us', path: '/join' },
        { id: 'contact', label: 'Contact', path: '/contact' }
      ],
      title: 'Contact Us',
      subtitle: 'Get in touch with Trinamool Congress Tamil Nadu',
      getInTouch: 'Get In Touch',
      contactForm: 'Send us a message',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      subject: 'Subject',
      message: 'Your Message',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      messageSent: 'Message sent successfully!',
      errorOccurred: 'An error occurred. Please try again.',
      required: 'Required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      contactInfo: 'Contact Information',
      headquarters: 'State Headquarters',
      officeHours: 'Office Hours',
      followUs: 'Follow Us',
      findUs: 'Find Us Here',
      address: 'TMC Tamil Nadu Office, 123 Anna Salai, Chennai - 600002',
      phoneNumber: '+91 744 849 8888',
      emailAddress: 'vettritmctn@gmail.com',
      hoursWeekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
      hoursWeekends: 'Saturday: 10:00 AM - 4:00 PM',
      hoursHoliday: 'Sunday: Closed',
      socialMedia: 'Connect with us on social media',
      quickLinks: 'Quick Links',
      socialLinks: [
        {
          name: 'Facebook',
          url: 'https://www.facebook.com/AITCofficial/',
          icon: 'Facebook'
        },
        {
          name: 'Twitter/X',
          url: 'https://x.com/AITCofficial/',
          icon: 'Twitter'
        },
        {
          name: 'YouTube',
          url: 'https://www.youtube.com/channel/UCFXQHOWfhkFSUvKgaV2ZSRw',
          icon: 'Youtube'
        }
      ]
    },
    ta: {
      nav: [
        { id: 'home', label: 'முகப்பு', path: '/' },
        { id: 'about', label: 'எங்களைப் பற்றி', path: '/about' },
        { id: 'leadership', label: 'தலைமை', path: '/leadership' },
        { id: 'vision', label: 'பார்வை', path: '/vision' },
        { id: 'initiatives', label: 'செயல்பாடுகள்', path: '/initiatives' },
        { id: 'news', label: 'செய்திகள்', path: '/news' },
        { id: 'join', label: 'இணையுங்கள்', path: '/join' },
        { id: 'contact', label: 'தொடர்பு', path: '/contact' }
      ],
      title: 'தொடர்பு கொள்ளுங்கள்',
      subtitle: 'திரிணமூல் காங்கிரஸ் தமிழ்நாட்டுடன் தொடர்பு கொள்ளுங்கள்',
      getInTouch: 'தொடர்பு கொள்ளுங்கள்',
      contactForm: 'எங்களுக்கு செய்தி அனுப்புங்கள்',
      name: 'முழுப் பெயர்',
      email: 'மின்னஞ்சல் முகவரி',
      phone: 'தொலைபேசி எண்',
      subject: 'தலைப்பு',
      message: 'உங்கள் செய்தி',
      sendMessage: 'செய்தியை அனுப்பு',
      sending: 'அனுப்பப்படுகிறது...',
      messageSent: 'செய்தி வெற்றிகரமாக அனுப்பப்பட்டது!',
      errorOccurred: 'பிழை ஏற்பட்டது. தயவு செய்து மீண்டும் முயற்சிக்கவும்.',
      required: 'தேவையானது',
      invalidEmail: 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்',
      invalidPhone: 'சரியான தொலைபேசி எண்ணை உள்ளிடவும்',
      contactInfo: 'தொடர்பு தகவல்',
      headquarters: 'மாநில தலைமையகம்',
      officeHours: 'அலுவலக நேரங்கள்',
      followUs: 'எங்களைப் பின்தொடருங்கள்',
      findUs: 'எங்களை இங்கே கண்டறியவும்',
      address: 'டி.எம்.சி தமிழ்நாடு அலுவலகம், 123 அண்ணா சாலை, சென்னை - 600002',
      phoneNumber: '+91 744 849 8888',
      emailAddress: 'vettritmctn@gmail.com',
      hoursWeekdays: 'திங்கள் - வெள்ளி: காலை 9:00 - மாலை 6:00',
      hoursWeekends: 'சனிக்கிழமை: காலை 10:00 - மாலை 4:00',
      hoursHoliday: 'ஞாயிற்றுக்கிழமை: மூடப்பட்டது',
      socialMedia: 'சமூக ஊடகங்களில் எங்களுடன் இணைக்கவும்',
      quickLinks: 'விரைவு இணைப்புகள்',
      socialLinks: [
        {
          name: 'Facebook',
          url: 'https://www.facebook.com/AITCofficial/',
          icon: 'Facebook'
        },
        {
          name: 'Twitter/X',
          url: 'https://x.com/AITCofficial/',
          icon: 'Twitter'
        },
        {
          name: 'YouTube',
          url: 'https://www.youtube.com/channel/UCFXQHOWfhkFSUvKgaV2ZSRw',
          icon: 'Youtube'
        }
      ]
    }
  };

  const t = content[language];

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tmc-tn-language', language);
  }, [language]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: language === 'ta' ? 'அனைத்து தேவையான தகவல்களையும் நிரப்பவும்' : 'Please fill all required fields'
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: t.invalidEmail
      });
      return;
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: t.invalidPhone
      });
      return;
    }

    setFormStatus({ submitting: true, submitted: false, error: null });

    // WhatsApp Integration
    const phoneNumber = '+917448498888';
    const whatsappMessage = `*New Contact Message from TMC TN Website*
    
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || 'N/A'}
*Subject:* ${formData.subject}
*Message:* ${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

    // Construct the WhatsApp link and open it
    window.open(whatsappUrl, '_blank');

    // Simulate API call and success state
    setTimeout(() => {
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitting: false, submitted: false, error: null });
      }, 5000);
    }, 1500);
  };

  // Render social media icon based on name
  const renderSocialIcon = (iconName) => {
    switch (iconName) {
      case 'Facebook':
        return <Facebook size={20} />;
      case 'Twitter':
        return <Twitter size={20} />;
      case 'Youtube':
        return <Youtube size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="contact-container">
      <Navbar
        scrolled={scrolled}
        language={language}
        setLanguage={handleLanguageChange}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        t={t}
      />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-container-inner">
          <div className="contact-hero-content">
            <div className="contact-hero-decoration">
              <div className="contact-hero-tricolor-line"></div>
            </div>
            <h1 className={`contact-hero-title ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
              {t.title}
            </h1>
            <p className={`contact-hero-subtitle ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="contact-container-inner">
          <div className="contact-grid">
            {/* Contact Form Section */}
            <div className="contact-form-section">
              <div className="contact-form-header">
                <h2 className={`contact-section-title ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                  {t.contactForm}
                </h2>
                <p className={`contact-section-subtitle ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                  {language === 'ta'
                    ? 'உங்கள் கருத்துகள் மற்றும் கேள்விகளை எங்களுக்கு அனுப்புங்கள்'
                    : 'Send us your feedback, questions, or inquiries'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                {/* Form Status Messages */}
                {formStatus.error && (
                  <div className="contact-form-error">
                    <AlertCircle size={18} />
                    <span>{formStatus.error}</span>
                  </div>
                )}

                {formStatus.submitted && (
                  <div className="contact-form-success">
                    <CheckCircle size={18} />
                    <span>{t.messageSent}</span>
                  </div>
                )}

                <div className="contact-form-grid">
                  {/* Name */}
                  <div className="contact-form-group">
                    <label className="contact-form-label">
                      {t.name} <span className="contact-required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="contact-form-input"
                      placeholder={language === 'ta' ? 'உங்கள் முழுப் பெயர்' : 'Enter your full name'}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="contact-form-group">
                    <label className="contact-form-label">
                      {t.email} <span className="contact-required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="contact-form-input"
                      placeholder={language === 'ta' ? 'உங்கள் மின்னஞ்சல் முகவரி' : 'Enter your email address'}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="contact-form-group">
                    <label className="contact-form-label">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="contact-form-input"
                      placeholder={language === 'ta' ? 'உங்கள் தொலைபேசி எண்' : 'Enter your phone number'}
                    />
                  </div>

                  {/* Subject */}
                  <div className="contact-form-group">
                    <label className="contact-form-label">
                      {t.subject} <span className="contact-required">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="contact-form-input"
                      placeholder={language === 'ta' ? 'செய்தியின் தலைப்பு' : 'Enter message subject'}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="contact-form-group contact-form-group-full">
                    <label className="contact-form-label">
                      {t.message} <span className="contact-required">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="contact-form-textarea"
                      rows="6"
                      placeholder={language === 'ta' ? 'உங்கள் செய்தியை இங்கே எழுதுங்கள்...' : 'Write your message here...'}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="contact-form-submit">
                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="contact-submit-button"
                  >
                    {formStatus.submitting ? (
                      <>
                        <span className="contact-submit-spinner"></span>
                        {t.sending}
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        {t.sendMessage}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info Section */}
            <div className="contact-info-section">
              <div className="contact-info-header">
                <h2 className={`contact-section-title ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                  {t.contactInfo}
                </h2>
                <p className={`contact-section-subtitle ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                  {language === 'ta'
                    ? 'எங்களை எப்படி தொடர்பு கொள்வது'
                    : 'How to reach us'}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="contact-info-cards">
                {/* Address Card */}
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="contact-info-content">
                    <h3 className={`contact-info-title ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                      {t.headquarters}
                    </h3>
                    <p className={`contact-info-text ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                      {t.address}
                    </p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <Phone size={24} />
                  </div>
                  <div className="contact-info-content">
                    <h3 className={`contact-info-title ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                      {language === 'ta' ? 'தொலைபேசி எண்' : 'Phone'}
                    </h3>
                    <p className={`contact-info-text ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                      {t.phoneNumber || '+91 744 849 8888'}
                    </p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <Mail size={24} />
                  </div>
                  <div className="contact-info-content">
                    <h3 className={`contact-info-title ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                      {language === 'ta' ? 'மின்னஞ்சல்' : 'Email'}
                    </h3>
                    <p className={`contact-info-text ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                      {t.emailAddress}
                    </p>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <Clock size={24} />
                  </div>
                  <div className="contact-info-content">
                    <h3 className={`contact-info-title ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                      {t.officeHours}
                    </h3>
                    <div className="contact-hours-list">
                      <div className="contact-hours-item">
                        <span>{t.hoursWeekdays}</span>
                      </div>
                      <div className="contact-hours-item">
                        <span>{t.hoursWeekends}</span>
                      </div>
                      <div className="contact-hours-item">
                        <span>{t.hoursHoliday}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="contact-social-section">
                <h3 className={`contact-section-title ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                  {t.followUs}
                </h3>
                <p className={`contact-section-subtitle ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                  {t.socialMedia}
                </p>
                <div className="contact-social-links">
                  {t.socialLinks && t.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link"
                      aria-label={link.name}
                    >
                      {renderSocialIcon(link.icon)}
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Section */}
              <div className="contact-map-section">
                <h3 className={`contact-section-title ${language === 'ta' ? 'contact-tamil-text' : ''}`}>
                  {t.findUs}
                </h3>
                <div className="contact-map-container">
                  {/* Map Placeholder - In real implementation, use Google Maps or similar */}
                  {/* Google Map */}
                  <div className="contact-map-placeholder" style={{ background: '#f8f9fa' }}>
                    <iframe
                      src="https://maps.google.com/maps?q=9.938148,78.075050&z=15&output=embed"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      aria-hidden="false"
                      tabIndex="0"
                      title="TMC Tamil Nadu Office Location"
                    ></iframe>
                  </div>
                  <p className="contact-map-note">
                    {language === 'ta'
                      ? 'நாங்கள் இங்கே இருக்கிறோம்! எங்களை சந்திக்க வாருங்கள்'
                      : 'We are here! Come visit us at our headquarters'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer
        language={language}
        setLanguage={handleLanguageChange}
        t={t}
      />
    </div>
  );
};

export default Contact;