
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './News.css';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import { supabase } from '../../../supabase';
import {
  Calendar,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

const News = () => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('tmc-tn-language');
    return savedLanguage || 'en';
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For gallery modal
  const location = useLocation();
  const newsPerPage = 6; // Adjusted for gallery grid

  // Content translations (Kept same as before)
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
      location: 'Location',
      readMore: 'Show Images',
      share: 'Share',
      prevPost: 'Previous Post',
      nextPost: 'Next Post',
      leaveReply: 'Leave a Reply'
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
      location: 'இடம்',
      readMore: 'மேலும் பார்க்க',
      share: 'பகிர்க',
      prevPost: 'முந்தைய செய்தி',
      nextPost: 'அடுத்த செய்தி',
      leaveReply: 'கருத்துகப் பதிவு செய்யவும்'
    }
  };

  const t = content[language];

  // Fetch News from Supabase and Group them
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Fetch ALL news items regardless of language
        const { data, error } = await supabase
          .from('news_items')
          .select('*')
          .order('event_date', { ascending: false }) // Prioritize event date
          .order('created_at', { ascending: false });

        if (error) throw error;

        const transformedData = data.map(item => {
          // Determine which language content to show
          // 1. New Bilingual Columns
          const titleTa = item.title_ta;
          const descTa = item.description_ta;
          const titleEn = item.title_en;
          const descEn = item.description_en;

          // 2. Legacy Columns
          const legacyTitle = item.title;
          const legacyDesc = item.description;
          const legacyLang = item.lang;

          // 3. Selection Logic
          let displayTitle = '';
          let displayDesc = '';

          if (language === 'ta') {
            // Prefer Tamil specific, then fallback to Legacy if legacy was Tamil, else fallback to English, else Legacy
            displayTitle = titleTa || (legacyLang === 'ta' ? legacyTitle : '') || titleEn || legacyTitle;
            displayDesc = descTa || (legacyLang === 'ta' ? legacyDesc : '') || descEn || legacyDesc;
          } else {
            // Prefer English specific, then fallback to Legacy if legacy was English, else fallback to Tamil, else Legacy
            displayTitle = titleEn || (legacyLang === 'en' ? legacyTitle : '') || titleTa || legacyTitle;
            displayDesc = descEn || (legacyLang === 'en' ? legacyDesc : '') || descTa || legacyDesc;
          }

          // Filter out items that are completely irrelevant? 
          // e.g. if I am viewing English and there is ONLY Tamil content (Legacy Tamil), maybe I shouldn't see it?
          // For now, I will show everything to be safe, as "Untranslated News" is better than "No News".

          return {
            id: item.id,
            title: displayTitle,
            description: displayDesc,

            date: item.event_date || item.date_str || new Date(item.created_at).toLocaleDateString(),
            event_date: item.event_date,
            location: language === 'ta' ? 'தமிழ்நாடு' : 'Tamil Nadu',
            images: (item.image_urls && item.image_urls.length > 0)
              ? item.image_urls
              : (item.image_url ? [item.image_url] : ['https://via.placeholder.com/600x400?text=TMC+News'])
          };
        });

        setNewsData(transformedData);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [language]);


  const openModal = (news) => {
    setSelectedNews(news);
    setCurrentImageIndex(0);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedNews && selectedNews.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedNews.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedNews && selectedNews.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedNews.images.length) % selectedNews.images.length);
    }
  };

  // Pagination logic
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = newsData.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(newsData.length / newsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save language
  useEffect(() => {
    localStorage.setItem('tmc-tn-language', language);
  }, [language]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="news-container">
      <Navbar
        scrolled={scrolled}
        language={language}
        setLanguage={setLanguage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        t={t}
      />

      {/* Hero Section */}
      <section className="news-hero">
        <div className="news-container-inner">
          <div className="news-hero-content">
            <div className="news-hero-decoration">
              <div className="news-hero-tricolor-line"></div>
            </div>
            <h1 className={`news-hero-title ${language === 'ta' ? 'news-tamil-text' : ''}`}>
              {t.title}
            </h1>
            <p className={`news-hero-subtitle ${language === 'ta' ? 'news-tamil-text' : ''}`}>
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="news-main-container">
        <div className="news-container-inner news-layout">

          {/* Left Column: News Feed */}
          <div className="news-feed">
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center' }}>Loading news...</div>
            ) : currentNews.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center' }}>No news found.</div>
            ) : (
              currentNews.map((news) => (
                <article key={news.id} className="news-article">

                  {/* Featured Image GRID Style */}
                  <div className="news-gallery-grid" onClick={() => openModal(news)} style={{ cursor: 'pointer', marginBottom: '1rem' }}>
                    {/* 
                            Display logic: 
                            If 1 image -> full width
                            If 2 images -> 50/50
                            If 3+ -> 1 big, 2 small using CSS grid or simple flex hacks 
                            For now, restoring the "Gallery" look by showing just the first few 
                        */}
                    <div className="gallery-preview-container" style={{ display: 'grid', gridTemplateColumns: news.images.length > 1 ? 'repeat(2, 1fr)' : '1fr', gap: '4px' }}>
                      {news.images.slice(0, 4).map((img, idx) => (
                        <img key={idx} src={img} alt="" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
                      ))}
                      {/* Overlay if more than 4 images? Not needed for chunks of 4 */}
                    </div>
                  </div>

                  <div className="news-article-body">


                    {/* Date Box */}
                    <div className="news-date-box">
                      <span className="news-date-month">
                        {new Date(news.date).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { month: 'short' })}
                      </span>
                      <span className="news-date-day">
                        {new Date(news.date).getDate()}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="news-article-content">
                      <h2 className={`news-article-title ${language === 'ta' ? 'news-tamil-text' : ''}`}>
                        {news.title}
                      </h2>

                      <div className="news-article-meta">
                        <span className="news-category-link">
                          {language === 'ta' ? 'செய்திகள்' : 'News'}
                        </span>
                        <span className="news-meta-divider">/</span>
                        <span className="news-location">
                          {news.location}
                        </span>
                      </div>

                      <p className={`news-article-excerpt ${language === 'ta' ? 'news-tamil-text' : ''}`}>
                        {news.description && news.description.substring(0, 150)}...
                      </p>

                      <button
                        className="news-read-more-btn"
                        onClick={() => openModal(news)}
                      >
                        {t.readMore}
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}

            {/* Pagination */}
            {!loading && newsData.length > newsPerPage && (
              <div className="news-pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="news-pagination-button"
                >
                  <ChevronLeft size={16} />
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
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <aside className="news-sidebar">
            {/* Search Widget */}
            <div className="sidebar-widget search-widget">
              <div className="search-form">
                <input
                  type="text"
                  placeholder={language === 'ta' ? 'தேடுக...' : 'Search...'}
                  className={`search-input ${language === 'ta' ? 'news-tamil-text' : ''}`}
                />
                <button className="search-submit">
                  {language === 'ta' ? 'தேடு' : 'Search'}
                </button>
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="sidebar-widget recent-posts-widget">
              <h3 className={`widget-title ${language === 'ta' ? 'news-tamil-text' : ''}`}>
                {language === 'ta' ? 'சமீபத்திய செய்திகள்' : 'Recent News'}
              </h3>
              <div className="widget-content">
                {newsData.slice(0, 5).map((post) => (
                  <div key={post.id} className="sidebar-post">
                    <div
                      className="sidebar-post-thumbnail"
                      style={{ backgroundImage: `url(${post.images[0]})` }}
                    ></div>
                    <div className="sidebar-post-info">
                      <h4 className={`sidebar-post-title ${language === 'ta' ? 'news-tamil-text' : ''}`}>
                        {post.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Detailed News Modal with Gallery Slider */}
      {modalOpen && selectedNews && (
        <div className="news-modal-overlay" onClick={closeModal}>
          <div className="news-modal-container" onClick={(e) => e.stopPropagation()}>

            <div className="news-modal-header-controls">
              <button className="news-modal-close-btn" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="news-modal-scroll-content">
              <div className="news-detail-logo-header">
                <h2 className="news-detail-logo-text">AITMC TAMIL NADU</h2>
              </div>

              <div className="news-detail-breadcrumbs">
                <span>{language === 'ta' ? 'முகப்பு' : 'Home'}</span>
                <span className="separator">/</span>
                <span>{language === 'ta' ? 'செய்திகள்' : 'News'}</span>
                <span className="separator">/</span>
                <span className="current">{selectedNews.title}</span>
              </div>

              <h1 className={`news-detail-title ${language === 'ta' ? 'news-tamil-text' : ''}`}>
                {selectedNews.title}
              </h1>


              <div className="news-detail-meta">
                <span className="news-detail-author">
                  {language === 'ta' ? 'AITMC IT பிரிவு' : 'By AITMC IT WING'}
                </span>
                <span className="meta-pipe">|</span>
                <span className="news-detail-date">{selectedNews.date}</span>
              </div>

              {/* Gallery Slider Logic */}
              <div className="news-detail-featured-image" style={{ position: 'relative' }}>
                <img src={selectedNews.images[currentImageIndex]} alt={selectedNews.title} />

                {selectedNews.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="gallery-nav-btn prev" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '50%' }}>
                      <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextImage} className="gallery-nav-btn next" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '50%' }}>
                      <ChevronRight size={24} />
                    </button>
                    <div className="gallery-dots" style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                      {selectedNews.images.map((_, idx) => (
                        <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx === currentImageIndex ? '#138808' : 'white', cursor: 'pointer' }} onClick={() => setCurrentImageIndex(idx)}></div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className={`news-detail-content ${language === 'ta' ? 'news-tamil-text' : ''}`}>
                <p className="lead-paragraph">{selectedNews.description}</p>
              </div>

              <div className="news-detail-footer">
                <div className="news-share-buttons">
                  <span>{t.share}:</span>
                  <button className="share-btn fb">Facebook</button>
                  <button className="share-btn tw">X (Twitter)</button>
                  <button className="share-btn wa">WhatsApp</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <Footer
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
    </div>
  );
};

export default News;