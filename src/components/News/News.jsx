import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './News.css';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import { 
  Calendar,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const News = () => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('tmc-tn-language');
    return savedLanguage || 'en';
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const newsPerPage = 6;

  // Content translations
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
      title: 'News Gallery',
      subtitle: 'Latest updates from Trinamool Congress Tamil Nadu',
      showing: 'Showing',
      of: 'of',
      results: 'results',
      prev: 'Previous',
      next: 'Next',
      date: 'Date',
      location: 'Location'
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
      title: 'செய்தி கேலரி',
      subtitle: 'திரிணமூல் காங்கிரஸ் தமிழ்நாட்டின் சமீபத்திய புதுப்பிப்புகள்',
      showing: 'காண்பிக்கப்படுகிறது',
      of: 'இல்',
      results: 'முடிவுகள்',
      prev: 'முந்தைய',
      next: 'அடுத்த',
      date: 'தேதி',
      location: 'இடம்'
    }
  };

  const t = content[language];

  // Sample news data - Simple image cards with description
  const newsData = [
    {
      id: 1,
      title: language === 'ta' ? 'சென்னை பொதுக்கூட்டம்' : 'Chennai Public Meeting',
      description: language === 'ta' ? 'சென்னை மெரினா கடற்கரையில் 10,000 பேருக்கு மேல் கலந்த பொதுக்கூட்டம்' : 'Public meeting at Marina Beach Chennai with 10,000+ attendance',
      image: '/news/chennai-meeting.jpg',
      date: '2024-12-15',
      location: language === 'ta' ? 'சென்னை' : 'Chennai',
      category: 'meetings',
    },
    {
      id: 2,
      title: language === 'ta' ? 'விவசாயிகள் பிரசாரம்' : 'Farmers Campaign',
      description: language === 'ta' ? 'விவசாயிகள் கடன் தள்ளுபடி பிரசாரம் தொடக்கம்' : 'Launch of farmers loan waiver campaign',
      image: '/news/farmers-campaign.jpg',
      date: '2024-12-10',
      location: language === 'ta' ? 'மதுரை' : 'Madurai',
      category: 'campaigns',
    },
    {
      id: 3,
      title: language === 'ta' ? 'இளைஞர் பயிற்சி முகாம்' : 'Youth Training Camp',
      description: language === 'ta' ? 'இளைஞர்களுக்கான தொழில் திறன் பயிற்சி முகாம்' : 'Vocational skill training camp for youth',
      image: '/news/youth-camp.jpg',
      date: '2024-12-05',
      location: language === 'ta' ? 'கோயம்புத்தூர்' : 'Coimbatore',
      category: 'social',
    },
    {
      id: 4,
      title: language === 'ta' ? 'மருத்துவ முகாம்' : 'Medical Camp',
      description: language === 'ta' ? 'இலவச மருத்துவ பரிசோதனை மற்றும் மருந்துகள்' : 'Free medical checkup and medicines distribution',
      image: '/news/medical-camp.jpg',
      date: '2024-12-01',
      location: language === 'ta' ? 'மதுரை' : 'Madurai',
      category: 'social',
    },
    {
      id: 5,
      title: language === 'ta' ? 'சுற்றுச்சூழல் பிரசாரம்' : 'Environment Campaign',
      description: language === 'ta' ? 'மரங்கள் நடுதல் மற்றும் கடற்கரை சுத்தம் பிரசாரம்' : 'Tree plantation and beach cleaning campaign',
      image: '/news/environment-rally.jpg',
      date: '2024-11-28',
      location: language === 'ta' ? 'சென்னை' : 'Chennai',
      category: 'campaigns',
    },
    {
      id: 6,
      title: language === 'ta' ? 'பெண்கள் தொழில் பயிற்சி' : 'Women Entrepreneurship',
      description: language === 'ta' ? 'பெண்கள் தொழில் தொடக்க பயிற்சித் திட்டம்' : 'Women entrepreneurship training program',
      image: '/news/women-entrepreneurs.jpg',
      date: '2024-11-25',
      location: language === 'ta' ? 'சேலம்' : 'Salem',
      category: 'development',
    },
    {
      id: 7,
      title: language === 'ta' ? 'பொருளாதார மாநாடு' : 'Economic Conference',
      description: language === 'ta' ? 'தமிழ்நாடு பொருளாதார வளர்ச்சி மாநாடு' : 'Tamil Nadu economic development conference',
      image: '/news/progress-conference.jpg',
      date: '2024-11-20',
      location: language === 'ta' ? 'திருச்சி' : 'Trichy',
      category: 'development',
    },
    {
      id: 8,
      title: language === 'ta' ? 'சட்ட உதவி முகாம்' : 'Legal Aid Camp',
      description: language === 'ta' ? 'ஏழை எளியவர்களுக்கு இலவச சட்ட ஆலோசனை' : 'Free legal consultation for underprivileged',
      image: '/news/legal-aid.jpg',
      date: '2024-11-15',
      location: language === 'ta' ? 'தஞ்சாவூர்' : 'Thanjavur',
      category: 'social',
    },
    {
      id: 9,
      title: language === 'ta' ? 'புதிய அலுவலக திறப்பு' : 'New Office Inauguration',
      description: language === 'ta' ? 'புதிய கட்சி அலுவலகம் திறப்பு விழா' : 'New party office inauguration ceremony',
      image: '/news/party-office.jpg',
      date: '2024-11-10',
      location: language === 'ta' ? 'கோயம்புத்தூர்' : 'Coimbatore',
      category: 'announcements',
    },
    {
      id: 10,
      title: language === 'ta' ? 'கிராம வளர்ச்சித் திட்டம்' : 'Village Development',
      description: language === 'ta' ? 'மாதிரி கிராம வளர்ச்சித் திட்டம் தொடக்கம்' : 'Model village development scheme launch',
      image: '/news/village-development.jpg',
      date: '2024-11-05',
      location: language === 'ta' ? 'நாமக்கல்' : 'Namakkal',
      category: 'development',
    },
    {
      id: 11,
      title: language === 'ta' ? 'கல்வி சீர்திருத்த கூட்டம்' : 'Education Reform Meeting',
      description: language === 'ta' ? 'கல்வி சீர்திருத்தங்கள் குறித்து ஆலோசனைக் கூட்டம்' : 'Consultation meeting on education reforms',
      image: '/news/education-meeting.jpg',
      date: '2024-11-01',
      location: language === 'ta' ? 'சென்னை' : 'Chennai',
      category: 'meetings',
    },
    {
      id: 12,
      title: language === 'ta' ? 'வேலைவாய்ப்பு அறிவிப்பு' : 'Employment Announcement',
      description: language === 'ta' ? '5,000 புதிய வேலைவாய்ப்புகள் உருவாக்கும் திட்டம்' : 'Plan to create 5,000 new employment opportunities',
      image: '/news/employment-announcement.jpg',
      date: '2024-10-28',
      location: language === 'ta' ? 'கோயம்புத்தூர்' : 'Coimbatore',
      category: 'announcements',
    }
  ];

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

  // Calculate pagination
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = newsData.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(newsData.length / newsPerPage);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="news-container">
      <Navbar 
        scrolled={scrolled}
        language={language}
        setLanguage={handleLanguageChange}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        t={t}
      />
      
      {/* Hero Section */}
      <section className="news-hero">
        <div className="news-container-inner">
          <div className="news-hero-content">
            <h1 className={`news-hero-title ${language === 'ta' ? 'news-tamil-text' : ''}`}>
              {t.title}
            </h1>
            <p className={`news-hero-subtitle ${language === 'ta' ? 'news-tamil-text' : ''}`}>
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Results Info */}
      <section className="news-controls">
        <div className="news-container-inner">
          <div className="news-results-info">
            <p className={`${language === 'ta' ? 'news-tamil-text' : ''}`}>
              {t.showing} <strong>{newsData.length}</strong> {t.results}
            </p>
          </div>
        </div>
      </section>

      {/* News Gallery */}
      <section className="news-gallery">
        <div className="news-container-inner">
          <div className="news-grid">
            {currentNews.map((news) => (
              <div key={news.id} className="news-card">
                {/* News Image */}
                <div className="news-card-image">
                  <div 
                    className="news-image"
                    style={{
                      backgroundImage: `url(${news.image})`,
                      backgroundColor: '#138808'
                    }}
                  >
                    {/* Fallback for missing image */}
                    {!news.image && (
                      <div className="news-image-fallback">
                        {news.title.charAt(0)}
                      </div>
                    )}
                  </div>
                 
                </div>

                {/* News Content */}
                <div className="news-card-content">
                  <h3 className={`news-card-title ${language === 'ta' ? 'news-tamil-text' : ''}`}>
                    {news.title}
                  </h3>
                  <p className={`news-card-description ${language === 'ta' ? 'news-tamil-text' : ''}`}>
                    {news.description}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="news-card-meta">
                    <div className="news-meta-item">
                      <Calendar size={14} />
                      <span>{formatDate(news.date)}</span>
                    </div>
                    <div className="news-meta-item">
                      <MapPin size={14} />
                      <span>{news.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {newsData.length > newsPerPage && (
            <div className="news-pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="news-pagination-button"
              >
                <ChevronLeft size={16} />
                <span>{t.prev}</span>
              </button>

              <div className="news-page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`news-page-number ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="news-pagination-button"
              >
                <span>{t.next}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
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

export default News;