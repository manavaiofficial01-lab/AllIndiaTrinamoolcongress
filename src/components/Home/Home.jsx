import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import Navbar from './Navbar';
import Footer from './Footer';
import {
  User,
  Calendar,
  MapPin,
  Users,
  BookOpen,
  Briefcase,
  Shield,
  Sprout,
  Check,
  ArrowUp,
  GraduationCap,
  Target,
  HeartHandshake,
  Scale,
  HandHeart,
  Trees,
  Scale3d,
  Building2,
  Phone,
  Mail,
  Clock
} from 'lucide-react';
import { content } from '../../data/content';

const Home = () => {
  const navigate = useNavigate();

  // Load language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('tmc-tn-language');
    return savedLanguage || 'en';
  });
  const [scrolled, setScrolled] = useState(false);
  const [activeGallery, setActiveGallery] = useState('photos');
  const [counter, setCounter] = useState({
    volunteers: 0,
    events: 0,
    districts: 0,
    beneficiaries: 0
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    district: '',
    interest: 'volunteer'
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Background images for carousel
  // Background images for carousel
  const carouselImages = [
    {
      id: 1,
      image: '/mamta-banerjee-for-tn-1.webp',
      alt: 'Mamata Banerjee addressing the people of Tamil Nadu'
    },
    {
      id: 2,
      image: '/mamta-banerjee-for-tn-2.webp',
      alt: 'Mamata Banerjee visit to Tamil Nadu'
    },
    {
      id: 3,
      image: '/mamata-banerjee-for-tn-4.jpg',
      alt: 'Mamata Banerjee engaging with the community'
    },
    {
      id: 4,
      image: '/mamata-bannerjee-profile.jpg',
      alt: 'Mamata Banerjee Leadership Profile'
    },
    {
      id: 5,
      image: '/mamata-banerjee-for-tn-2.jpg',
      alt: 'AITC Tamil Nadu Vision'
    }
  ];

  // Gallery data (keeping but not using in navigation)
  const galleryData = {
    photos: [
      { id: 1, title: 'Public Meeting - Chennai', category: 'Events' },
      { id: 2, title: 'Medical Camp - Madurai', category: 'Health' },
      { id: 3, title: 'Youth Conference - Coimbatore', category: 'Youth' },
      { id: 4, title: 'Farmers Meet - Trichy', category: 'Agriculture' },
      { id: 5, title: 'Women Empowerment Rally', category: 'Women' },
      { id: 6, title: 'Education Fair - Salem', category: 'Education' },
    ],
    videos: [
      { id: 1, title: 'Vision 2030 Speech', duration: '5:30' },
      { id: 2, title: 'Women Empowerment Program', duration: '3:45' },
      { id: 3, title: 'Community Service Highlights', duration: '4:20' },
      { id: 4, title: 'Farmer Support Initiative', duration: '6:15' },
    ]
  };

  const carouselIntervalRef = useRef(null);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated counter effect
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounter({
        volunteers: Math.floor((10000 / steps) * step),
        events: Math.floor((250 / steps) * step),
        districts: Math.floor((38 / steps) * step),
        beneficiaries: Math.floor((250000 / steps) * step)
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Carousel auto-slide
  useEffect(() => {
    carouselIntervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, [carouselImages.length]);

  const resetCarouselInterval = () => {
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    carouselIntervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselImages.length);
    }, 5000);
  };

  const handleCarouselClick = (index) => {
    setCurrentSlide(index);
    resetCarouselInterval();
  };



  const t = content[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // WhatsApp Integration
    const tmcPhone = '+917448498888';
    const whatsappMessage = `*New Lead from TMC TN Website Home Page*
    
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*District:* ${formData.district}
*Interest:* ${formData.interest}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${tmcPhone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    console.log('Form submitted:', formData);
    alert(language === 'ta' ? 'விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! எங்கள் குழு விரைவில் உங்களை தொடர்பு கொள்ளும்.' : 'Application submitted successfully! Our team will contact you soon.');

    setFormData({
      name: '',
      email: '',
      phone: '',
      district: '',
      interest: 'volunteer'
    });
    setIsSubmitting(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleHeroButtonClick = (buttonType) => {
    if (buttonType === 'join') {
      navigate('/join');
    } else if (buttonType === 'vision') {
      navigate('/vision');
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="home-container">
      {/* Navigation */}
      <Navbar
        scrolled={scrolled}
        language={language}
        setLanguage={handleLanguageChange}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        t={t}
      />

      {/* Hero Section with Image Carousel */}
      <section className="hero" aria-label="Hero section">
        {/* Background Image Carousel */}
        <div className="hero-carousel" role="region" aria-label="Image carousel">
          {carouselImages.map((image, index) => (
            <div
              key={image.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${image.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              aria-label={image.alt}
              aria-hidden={index !== currentSlide}
            >
              <div className="carousel-overlay"></div>
            </div>
          ))}

          {/* Carousel Indicators Only - Removed Arrows */}
          <div className="carousel-indicators" role="tablist" aria-label="Carousel navigation">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleCarouselClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={index === currentSlide}
                role="tab"
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="container">
          <div className="hero-content animate-fadeIn">
            <h2 className={`hero-title ${language === 'ta' ? 'tamil-text' : ''}`}>
              {t.hero.slogan}
            </h2>
            <p className={`hero-subtitle ${language === 'ta' ? 'tamil-text' : ''}`}>
              {t.hero.vision}
            </p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={() => handleHeroButtonClick('join')}>
                {t.hero.cta1}
              </button>
              <button className="secondary-button" onClick={() => handleHeroButtonClick('vision')}>
                {t.hero.cta2}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" aria-label="Statistics">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card animate-slide-up">
              <div className="stat-icon">
                <Users size={32} />
              </div>
              <div className="stat-number volunteers">{counter.volunteers.toLocaleString()}+</div>
              <div className={`stat-label ${language === 'ta' ? 'tamil-text' : ''}`}>{t.stats.volunteers}</div>
            </div>
            <div className="stat-card animate-slide-up delay-100">
              <div className="stat-icon">
                <Calendar size={32} />
              </div>
              <div className="stat-number events">{counter.events}+</div>
              <div className={`stat-label ${language === 'ta' ? 'tamil-text' : ''}`}>{t.stats.events}</div>
            </div>
            <div className="stat-card animate-slide-up delay-200">
              <div className="stat-icon">
                <MapPin size={32} />
              </div>
              <div className="stat-number districts">{counter.districts}</div>
              <div className={`stat-label ${language === 'ta' ? 'tamil-text' : ''}`}>{t.stats.districts}</div>
            </div>
            <div className="stat-card animate-slide-up delay-300">
              <div className="stat-icon">
                <User size={32} />
              </div>
              <div className="stat-number beneficiaries">{counter.beneficiaries.toLocaleString()}+</div>
              <div className={`stat-label ${language === 'ta' ? 'tamil-text' : ''}`}>{t.stats.beneficiaries}</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className={`section-title ${language === 'ta' ? 'tamil-text' : ''}`}>{t.about.title}</h2>
          <div className="about-grid">
            <div>
              <p className={`about-text ${language === 'ta' ? 'tamil-text' : ''}`}>{t.about.history}</p>
            </div>
            <div className="values-grid">
              {t.about.values.map((value, idx) => (
                <div key={idx} className={`value-card animate-slide-up delay-${(idx + 1) * 100}`}>
                  <div className="value-icon">
                    {idx === 0 && <Scale size={32} />}
                    {idx === 1 && <Shield size={32} />}
                    {idx === 2 && <Users size={32} />}
                    {idx === 3 && <BookOpen size={32} />}
                  </div>
                  <h3 className={`value-title ${language === 'ta' ? 'tamil-text' : ''}`}>{value.title}</h3>
                  <p className={`value-desc ${language === 'ta' ? 'tamil-text' : ''}`}>{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Vision Preview Section */}
      <section className="vision-section">
        <div className="container">
          <h2 className={`section-title ${language === 'ta' ? 'tamil-text' : ''}`}>{t.vision.title}</h2>
          <p className={`section-subtitle ${language === 'ta' ? 'tamil-text' : ''}`}>{t.vision.subtitle}</p>
          <div className="vision-grid">
            {t.vision.pillars.slice(0, 2).map((pillar, idx) => (
              <article key={idx} className={`pillar-card animate-slide-up delay-${(idx + 1) * 200}`}>
                <div className="pillar-header">
                  <div className="pillar-icon">
                    {pillar.icon === 'education' && <GraduationCap size={40} />}
                    {pillar.icon === 'job' && <Briefcase size={40} />}
                    {pillar.icon === 'women' && <Shield size={40} />}
                    {pillar.icon === 'farmers' && <Sprout size={40} />}
                  </div>
                  <h3 className={`pillar-title ${language === 'ta' ? 'tamil-text' : ''}`}>{pillar.title}</h3>
                </div>
                <p className={`pillar-desc ${language === 'ta' ? 'tamil-text' : ''}`}>{pillar.desc.substring(0, 120)}...</p>
                <ul className="pillar-goals">
                  {pillar.goals?.slice(0, 2).map((goal, gIdx) => (
                    <li key={gIdx} className="pillar-goal">
                      <span className="checkmark" aria-hidden="true">
                        <Check size={20} />
                      </span>
                      <span className={language === 'ta' ? 'tamil-text' : ''}>{goal}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Preview Section */}
      <section className="initiatives-section">
        <div className="container">
          <h2 className={`section-title ${language === 'ta' ? 'tamil-text' : ''}`}>{t.initiatives.title}</h2>
          <div className="initiatives-grid">
            {t.initiatives.list.slice(0, 4).map((initiative, idx) => (
              <article key={idx} className={`initiative-card animate-slide-up delay-${(idx + 1) * 100}`}>
                <div className="initiative-number">{idx + 1}</div>
                <h3 className={`initiative-title ${language === 'ta' ? 'tamil-text' : ''}`}>{initiative.title}</h3>
                <p className={`initiative-desc ${language === 'ta' ? 'tamil-text' : ''}`}>{initiative.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Join Call to Action */}
      <section className="join-cta-section">
        <div className="container">
          <div className="join-cta-card animate-scale-in">
            <div className="join-cta-icon">
              <HandHeart size={56} />
            </div>
            <h2 className={`join-cta-title ${language === 'ta' ? 'tamil-text' : ''}`}>
              {language === 'ta' ? 'தமிழ்நாட்டின் எதிர்காலத்தை உருவாக்குங்கள்' : 'Shape the Future of Tamil Nadu'}
            </h2>
            <p className={`join-cta-subtitle ${language === 'ta' ? 'tamil-text' : ''}`}>
              {language === 'ta' ? 'இந்த மக்கள் இயக்கத்தில் இணையுங்கள். ஒவ்வொரு குரலும் முக்கியம்!' : 'Join this people\'s movement. Every voice matters!'}
            </p>
            <Link to="/join" className="primary-button large-button">
              {language === 'ta' ? 'இப்போதே இணையுங்கள்' : 'Join Now'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        language={language}
        setLanguage={handleLanguageChange}
        t={t}
      />

      {/* Scroll to Top Button */}
      <button
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default Home;