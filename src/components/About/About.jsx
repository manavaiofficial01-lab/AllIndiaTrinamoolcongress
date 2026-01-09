import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './About.css';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';
import {
  Sprout,
  Flag,
  TrendingUp,
  Globe,
  Users,
  Heart,
  Handshake,
  Sparkles,
  Scale,
  Target,
  Check,
  Calendar,
  Award,
  MapPin,
  Building2,
  Vote,
  Crown,
  BarChart3,
  Shield,
  CheckCircle,
  BookOpen
} from 'lucide-react';

const About = () => {
  const [activeTimeline, setActiveTimeline] = useState('all');
  const [animateStats, setAnimateStats] = useState(false);
  const [countedStats, setCountedStats] = useState({
    yearsActive: 0,
    statesPresence: 0,
    electionsWon: 0,
    milestones: 0
  });
  const aboutRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const animationRef = useRef({});
  const observerRef = useRef(null);

  // Load language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('tmc-tn-language');
    return savedLanguage || 'en';
  });

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

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Content for About page
  const aboutContent = {
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
      title: 'Our Journey',
      subtitle: 'From Grassroots Movement to National Force',
      intro: 'Born from a people\'s movement in 1998, the All India Trinamool Congress (AITC) represents a commitment to secularism, social justice, and empowering common citizens. Our symbol — two green shoots emerging from grass — embodies unity, harmony, and new growth.',
      sections: {
        founding: {
          title: 'Founding & Identity',
          icon: 'foundation',
          items: [
            'Founded on January 1, 1998 by Mamata Banerjee',
            'Created as an independent platform distinct from the Indian National Congress',
            'Official symbol: Two green shoots (designed by Mamata Banerjee)',
            'Symbol approved by Election Commission with 6% vote requirement for recognition'
          ]
        },
        struggles: {
          title: 'Struggles & Movements',
          icon: 'struggles',
          items: [
            '2001: Became principal opposition in West Bengal with 60 seats',
            '2006-07 (Nandigram): Led resistance against forced land acquisition',
            '2006-08 (Singur): Successfully opposed land takeover, eventually returning land to farmers',
            'People-centered movements highlighting social justice issues'
          ]
        },
        rise: {
          title: 'Rise to Power',
          icon: 'rise',
          items: [
            '2009: Won 19 Lok Sabha seats from West Bengal',
            '2011: Ended 34-year Left rule in Bengal, Mamata Banerjee became first woman CM',
            '2014: Secured 34 of 42 Lok Sabha seats in Bengal',
            '2016: Won 211 Assembly seats',
            '2019: 22 Lok Sabha seats',
            '2021: Historic win with 215 Assembly seats',
            '2024: 29 Lok Sabha seats'
          ]
        },
        expansion: {
          title: 'National Expansion',
          icon: 'expansion',
          items: [
            'Strong presence beyond Bengal: Assam, Meghalaya, Goa',
            'Positioned as voice for regional aspirations on national stage',
            'Growing influence in multiple Indian states'
          ]
        },
        modern: {
          title: 'Modern Status',
          icon: 'modern',
          items: [
            'Recognized as one of India\'s major political parties',
            'Rooted in secularism and social justice',
            'Focus on grassroots mobilization',
            'Political empowerment of common citizens'
          ]
        }
      },
      stats: {
        yearsActive: 'Years Active',
        statesPresence: 'States Presence',
        electionsWon: 'Major Elections Won',
        milestones: 'Key Milestones'
      },
      values: {
        title: 'Core Philosophy',
        items: [
          {
            title: 'People First',
            desc: 'Every policy and movement centers on citizen welfare',
            icon: 'heart'
          },
          {
            title: 'Grassroots Democracy',
            desc: 'Power flows from the people, not top-down structures',
            icon: 'handshake'
          },
          {
            title: 'Secular Harmony',
            desc: 'Unity across all religions, castes, and communities',
            icon: 'sparkles'
          },
          {
            title: 'Social Justice',
            desc: 'Fighting inequality and empowering marginalized groups',
            icon: 'scale'
          }
        ]
      },
      symbolTitle: 'Party Symbol',
      symbolDesc: 'Our official party symbol — two green shoots emerging from grass — personally designed by Mamata Banerjee, represents unity, harmony, secularism, and new growth. Approved by the Election Commission with the condition that the party must earn at least 6% of votes to maintain recognition.',
      fullTimeline: 'Full Timeline',
      completeTimeline: 'Complete Timeline',
      viewMessage: 'View key events in our journey on the timeline. Click category buttons to examine each phase.'
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
      title: 'எங்கள் பயணம்',
      subtitle: 'அடித்தள இயக்கத்திலிருந்து தேசிய சக்திக்கு',
      intro: '1998-இல் மக்கள் இயக்கத்திலிருந்து உருவான அகில இந்திய திரிணமூல் காங்கிரஸ் (ஏஐடிசி) மதச்சார்பற்ற தன்மை, சமூக நீதி மற்றும் பொதுமக்களின் அதிகாரமளிப்புக்கான அர்ப்பணிப்பைக் குறிக்கிறது. புல்வெளியிலிருந்து வெளிவரும் இரண்டு பச்சைத் தளிர்கள் என்ற எங்கள் சின்னம் ஒற்றுமை, நல்லிணக்கம் மற்றும் புதிய வளர்ச்சியை உருவகப்படுத்துகிறது.',
      sections: {
        founding: {
          title: 'நிறுவனம் & அடையாளம்',
          icon: 'foundation',
          items: [
            'ஜனவரி 1, 1998-இல் மம்தா பானர்ஜியால் நிறுவப்பட்டது',
            'இந்திய தேசிய காங்கிரஸிலிருந்து வேறுபட்ட சுயாதீன தளமாக உருவாக்கப்பட்டது',
            'அதிகாரப்பூர்வ சின்னம்: இரண்டு பச்சைத் தளிர்கள் (மம்தா பானர்ஜி வடிவமைப்பு)',
            'தேர்தல் ஆணையத்தால் அங்கீகரிக்கப்பட்டது, அங்கீகாரத்திற்கு 6% வாக்கு தேவை'
          ]
        },
        struggles: {
          title: 'போராட்டங்கள் & இயக்கங்கள்',
          icon: 'struggles',
          items: [
            '2001: மேற்கு வங்கத்தில் 60 இருக்கைகளுடன் முக்கிய எதிர்க்கட்சியானது',
            '2006-07 (நந்திகிராம்): கட்டாய நில கையகப்படுத்துதலுக்கு எதிரான எதிர்ப்பை வழிநடத்தியது',
            '2006-08 (சிங்கூர்): நில கையகப்படுத்துதலுக்கு வெற்றிகரமாக எதிர்ப்பு, இறுதியில் விவசாயிகளுக்கு நிலத்தை திரும்பக் கொடுத்தது',
            'சமூக நீதி சிக்கல்களை முன்னிலைப்படுத்தும் மக்கள் மைய இயக்கங்கள்'
          ]
        },
        rise: {
          title: 'அதிகாரத்திற்கு உயர்வு',
          icon: 'rise',
          items: [
            '2009: மேற்கு வங்கத்தில் இருந்து 19 லோக்சபா இருக்கைகளை வென்றது',
            '2011: வங்கத்தில் 34-ஆண்டு இடது ஆட்சியை முடிவுக்கு கொண்டுவந்தது, மம்தா பானர்ஜி முதல் பெண் முதல்வர் ஆனார்',
            '2014: வங்கத்தில் 42-ல் 34 லோக்சபா இருக்கைகளைப் பெற்றது',
            '2016: 211 சட்டமன்ற இருக்கைகளை வென்றது',
            '2019: 22 லோக்சபா இருக்கைகள்',
            '2021: 215 சட்டமன்ற இருக்கைகளுடன் வரலாற்று வெற்றி',
            '2024: 29 லோக்சபா இருக்கைகள்'
          ]
        },
        expansion: {
          title: 'தேசிய விரிவாக்கம்',
          icon: 'expansion',
          items: [
            'வங்கத்தைத் தாண்டிய வலுவான இருப்பு: அசாம், மேகாலயா, கோவா',
            'தேசிய மேடையில் பிராந்திய லட்சியங்களுக்கான குரலாக அமைந்துள்ளது',
            'பல இந்திய மாநிலங்களில் வளர்ந்து வரும் செல்வாக்கு'
          ]
        },
        modern: {
          title: 'நவீன நிலை',
          icon: 'modern',
          items: [
            'இந்தியாவின் முக்கிய அரசியல் கட்சிகளில் ஒன்றாக அங்கீகரிக்கப்பட்டுள்ளது',
            'மதச்சார்பற்ற தன்மை மற்றும் சமூக நீதியில் வேர் ஊன்றியுள்ளது',
            'அடித்தள இயக்கத்தில் கவனம்',
            'பொதுமக்களின் அரசியல் அதிகாரமளிப்பு'
          ]
        }
      },
      stats: {
        yearsActive: 'செயலில் உள்ள ஆண்டுகள்',
        statesPresence: 'மாநிலங்கள் இருப்பு',
        electionsWon: 'முக்கிய தேர்தல் வெற்றிகள்',
        milestones: 'முக்கிய மைல்கற்கள்'
      },
      values: {
        title: 'அடிப்படை தத்துவம்',
        items: [
          {
            title: 'மக்கள் முதல்',
            desc: 'ஒவ்வொரு கொள்கையும் இயக்கமும் குடிமகன் நலனை மையமாகக் கொண்டது',
            icon: 'heart'
          },
          {
            title: 'அடித்தள ஜனநாயகம்',
            desc: 'அதிகாரம் மக்களிடமிருந்து பாய்கிறது, மேலிருந்து கீழ் கட்டமைப்புகள் அல்ல',
            icon: 'handshake'
          },
          {
            title: 'மதச்சார்பற்ற நல்லிணக்கம்',
            desc: 'அனைத்து மதங்கள், சாதிகள் மற்றும் சமூகங்களில் ஒற்றுமை',
            icon: 'sparkles'
          },
          {
            title: 'சமூக நீதி',
            desc: 'சமத்துவமின்மையை எதிர்த்துப் போராடுதல் மற்றும் ஓதுக்கப்பட்ட குழுக்களை அதிகாரமளித்தல்',
            icon: 'scale'
          }
        ]
      },
      symbolTitle: 'கட்சி சின்னம்',
      symbolDesc: 'எங்கள் அதிகாரப்பூர்வ கட்சி சின்னம் — புல்வெளியிலிருந்து வெளிவரும் இரண்டு பச்சைத் தளிர்கள் — மம்தா பானர்ஜி தனிப்பட்ட முறையில் வடிவமைத்த சின்னம், ஒற்றுமை, நல்லிணக்கம், மதச்சார்பற்ற தன்மை மற்றும் புதிய வளர்ச்சியை குறிக்கிறது. இது தேர்தல் ஆணையத்தால் அங்கீகரிக்கப்பட்டது, கட்சி அங்கீகாரத்தைத் தக்கவைக்க குறைந்தபட்சம் 6% வாக்குகள் தேவை.',
      fullTimeline: 'முழு காலக்கோடு',
      completeTimeline: 'முழு காலக்கோடு',
      viewMessage: 'மேலே உள்ள காலக்கோட்டில் எங்கள் பயணத்தின் முக்கிய நிகழ்வுகளைப் பார்க்கவும். ஒவ்வொரு கட்டத்தையும் ஆய்வு செய்ய வகை பொத்தான்களைக் கிளிக் செய்க.'
    }
  };

  const t = aboutContent[language];

  const stats = {
    yearsActive: 26,
    statesPresence: 8,
    electionsWon: 7,
    milestones: 15
  };

  // Generate timeline events based on language
  const timelineEvents = [
    {
      year: 1998,
      title: language === 'ta' ? 'அடித்தளம்' : 'Foundation',
      desc: language === 'ta' ? 'மம்தா பானர்ஜியால் கட்சி நிறுவப்பட்டது' : 'Party founded by Mamata Banerjee',
      category: 'founding'
    },
    {
      year: 2001,
      title: language === 'ta' ? 'முக்கிய எதிர்க்கட்சி' : 'Main Opposition',
      desc: language === 'ta' ? 'வங்க சட்டமன்றத்தில் 60 இருக்கைகள்' : '60 seats in Bengal assembly',
      category: 'struggles'
    },
    {
      year: 2009,
      title: language === 'ta' ? 'லோக்சபா முன்னேற்றம்' : 'Lok Sabha Breakthrough',
      desc: language === 'ta' ? 'நாடாளுமன்றத்தில் 19 இருக்கைகள்' : '19 seats in Parliament',
      category: 'rise'
    },
    {
      year: 2011,
      title: language === 'ta' ? 'வரலாற்று வெற்றி' : 'Historic Victory',
      desc: language === 'ta' ? '34-ஆண்டு இடது ஆட்சியை முடிவுக்கு கொண்டுவந்தது' : 'Ended 34-year Left rule',
      category: 'rise'
    },
    {
      year: 2014,
      title: language === 'ta' ? 'ஆதிக்க செயல்திறன்' : 'Dominant Performance',
      desc: language === 'ta' ? 'வங்கத்தில் 42-ல் 34 இருக்கைகள்' : '34 of 42 seats in Bengal',
      category: 'rise'
    },
    {
      year: 2016,
      title: language === 'ta' ? 'சட்டமன்ற பெரும்பானமை' : 'Assembly Supermajority',
      desc: language === 'ta' ? 'வங்கத்தில் 211 இருக்கைகள்' : '211 seats in Bengal',
      category: 'rise'
    },
    {
      year: 2021,
      title: language === 'ta' ? 'சாதனை வெற்றி' : 'Record Win',
      desc: language === 'ta' ? 'சட்டமன்றத்தில் 215 இருக்கைகள்' : '215 seats in Assembly',
      category: 'rise'
    },
    {
      year: 2024,
      title: language === 'ta' ? 'லோக்சபா வெற்றி' : 'Lok Sabha Success',
      desc: language === 'ta' ? 'நாடாளுமன்றத்தில் 29 இருக்கைகள்' : '29 seats in Parliament',
      category: 'expansion'
    }
  ];

  // Initialize when component mounts and when language changes
  useEffect(() => {
    // Reset states when language changes
    setAnimateStats(false);
    setCountedStats({
      yearsActive: 0,
      statesPresence: 0,
      electionsWon: 0,
      milestones: 0
    });

    // Clean up any existing animations
    Object.keys(animationRef.current).forEach(key => {
      if (animationRef.current[key]) {
        cancelAnimationFrame(animationRef.current[key]);
      }
    });
    animationRef.current = {};

    // Disconnect existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // Set up new observer
    const setupObserver = () => {
      if (!aboutRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setAnimateStats(true);
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '100px'
        }
      );

      observer.observe(aboutRef.current);
      observerRef.current = observer;
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(setupObserver, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      // Clean up animations
      Object.keys(animationRef.current).forEach(key => {
        if (animationRef.current[key]) {
          cancelAnimationFrame(animationRef.current[key]);
        }
      });
    };
  }, [language]);

  // Animated counter effect - improved version
  useEffect(() => {
    if (animateStats) {
      const animateCounter = (key, startValue, endValue, duration) => {
        let startTime = null;

        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

          setCountedStats(prev => ({
            ...prev,
            [key]: currentValue
          }));

          if (progress < 1) {
            animationRef.current[key] = requestAnimationFrame(animate);
          } else {
            // Ensure we end at the exact value
            setCountedStats(prev => ({ ...prev, [key]: endValue }));
          }
        };

        animationRef.current[key] = requestAnimationFrame(animate);
      };

      // Animate each stat with staggered delays
      Object.keys(stats).forEach((key, index) => {
        const delay = index * 300; // Stagger the animations
        setTimeout(() => {
          animateCounter(key, 0, stats[key], 1500);
        }, delay);
      });
    } else {
      // Reset to 0 when animation is not active
      setCountedStats({
        yearsActive: 0,
        statesPresence: 0,
        electionsWon: 0,
        milestones: 0
      });
    }

    return () => {
      // Clean up all animation frames
      Object.keys(animationRef.current).forEach(key => {
        if (animationRef.current[key]) {
          cancelAnimationFrame(animationRef.current[key]);
        }
      });
    };
  }, [animateStats]);

  // Handle language change
  const handleLanguageChange = useCallback((newLanguage) => {
    setLanguage(newLanguage);
  }, []);

  // Function to get icon component
  const getIconComponent = (iconName, size = 24) => {
    switch (iconName) {
      case 'foundation':
        return <Sprout size={size} />;
      case 'struggles':
        return <Flag size={size} />;
      case 'rise':
        return <TrendingUp size={size} />;
      case 'expansion':
        return <Globe size={size} />;
      case 'modern':
        return <Users size={size} />;
      case 'heart':
        return <Heart size={size} />;
      case 'handshake':
        return <Handshake size={size} />;
      case 'sparkles':
        return <Sparkles size={size} />;
      case 'scale':
        return <Scale size={size} />;
      case 'all':
        return <BookOpen size={size} />;
      default:
        return <Target size={size} />;
    }
  };

  const filteredTimeline = timelineEvents.filter(event =>
    activeTimeline === 'all' || event.category === activeTimeline
  );

  return (
    <>
      <div className="about-container">
        <Navbar
          scrolled={scrolled}
          language={language}
          setLanguage={handleLanguageChange}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          t={t}
        />

        <section className="about-hero">
          <div className="content-wrapper">
            <div className="about-hero-content">
              <div className="about-hero-tricolor-line"></div>
              <h1 className={`about-hero-title ${language === 'ta' ? 'about-tamil-text' : ''}`}>
                {t.title}
              </h1>
              <p className={`about-hero-subtitle ${language === 'ta' ? 'about-tamil-text' : ''}`}>
                {t.subtitle}
              </p>
              <div className="about-hero-description">
                <p className={`${language === 'ta' ? 'about-tamil-text' : ''}`}>
                  {t.intro}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section" ref={aboutRef}>
          <div className="content-wrapper">
            {/* Stats Grid */}
            <div className="about-stats-grid">
              <div className="about-stat-card">
                <div className="about-stat-number">
                  {countedStats.yearsActive}+
                </div>
                <div className={`about-stat-label ${language === 'ta' ? 'about-tamil-text' : ''}`}>
                  {t.stats.yearsActive}
                </div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-number">
                  {countedStats.statesPresence}+
                </div>
                <div className={`about-stat-label ${language === 'ta' ? 'about-tamil-text' : ''}`}>
                  {t.stats.statesPresence}
                </div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-number">
                  {countedStats.electionsWon}+
                </div>
                <div className={`about-stat-label ${language === 'ta' ? 'about-tamil-text' : ''}`}>
                  {t.stats.electionsWon}
                </div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-number">
                  {countedStats.milestones}+
                </div>
                <div className={`about-stat-label ${language === 'ta' ? 'about-tamil-text' : ''}`}>
                  {t.stats.milestones}
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="about-main-grid">
              {/* Sidebar Nav */}
              <aside className="about-timeline-nav">
                <div className="about-nav-card">
                  <h3 className={`about-nav-title ${language === 'ta' ? 'about-tamil-text' : ''}`}>
                    {language === 'ta' ? 'பயணத் தேடல்' : 'Explore Journey'}
                  </h3>
                  <div className="about-nav-buttons">
                    <button
                      onClick={() => setActiveTimeline('all')}
                      className={`about-nav-button ${activeTimeline === 'all' ? 'active-all' : ''} ${language === 'ta' ? 'about-tamil-text' : ''}`}
                    >
                      <span className="about-nav-icon"><BookOpen size={20} /></span>
                      {t.fullTimeline}
                    </button>
                    {Object.entries(t.sections).map(([key, section]) => (
                      <button
                        key={key}
                        onClick={() => setActiveTimeline(key)}
                        className={`about-nav-button ${activeTimeline === key ? 'active-section' : ''} ${language === 'ta' ? 'about-tamil-text' : ''}`}
                      >
                        <span className="about-nav-icon">{getIconComponent(section.icon, 20)}</span>
                        {section.title}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Center Timeline */}
              <div className="about-timeline-container">
                <div className="about-timeline-wrapper">
                  <div className="about-timeline-line"></div>
                  {filteredTimeline.map((event, idx) => (
                    <div
                      key={idx}
                      className={`about-timeline-item ${idx % 2 === 0 ? 'item-left' : 'item-right'}`}
                    >
                      <div className="about-timeline-content">
                        <div className="about-timeline-side">
                          <div className="about-event-card">
                            <span className="about-event-year">{event.year}</span>
                            <h4 className={`about-event-title ${language === 'ta' ? 'about-tamil-text' : ''}`}>{event.title}</h4>
                            <p className={`about-event-desc ${language === 'ta' ? 'about-tamil-text' : ''}`}>{event.desc}</p>
                          </div>
                        </div>
                        <div className="about-timeline-dot-container">
                          <div className="about-timeline-dot"></div>
                        </div>
                        <div className="about-timeline-spacer"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Details Sidebar */}
              <aside className="about-details-sidebar">
                <div className="about-details-card">
                  <div className="about-details-header">
                    {activeTimeline === 'all' ? <BookOpen size={28} /> : getIconComponent(t.sections[activeTimeline]?.icon, 28)}
                    <h3 className={`about-details-title ${language === 'ta' ? 'about-tamil-text' : ''}`}>
                      {activeTimeline === 'all' ? t.completeTimeline : t.sections[activeTimeline]?.title}
                    </h3>
                  </div>
                  {activeTimeline === 'all' ? (
                    <p className={`about-details-message ${language === 'ta' ? 'about-tamil-text' : ''}`}>{t.viewMessage}</p>
                  ) : (
                    <ul className="about-details-list">
                      {t.sections[activeTimeline]?.items.map((item, idx) => (
                        <li key={idx} className="about-details-item">
                          <CheckCircle size={18} className="about-item-check" />
                          <span className={`about-item-text ${language === 'ta' ? 'about-tamil-text' : ''}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </aside>
            </div>

            {/* Values Section */}
            <div className="about-values-section">
              <h2 className={`about-values-title ${language === 'ta' ? 'about-tamil-text' : ''}`}>{t.values.title}</h2>
              <div className="about-values-grid">
                {t.values.items.map((value, idx) => (
                  <div key={idx} className="about-value-card">
                    <div className="about-value-icon-wrapper">
                      {getIconComponent(value.icon, 36)}
                    </div>
                    <h3 className={`about-value-title ${language === 'ta' ? 'about-tamil-text' : ''}`}>{value.title}</h3>
                    <p className={`about-value-desc ${language === 'ta' ? 'about-tamil-text' : ''}`}>{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Party Symbol Section */}
            <div className="about-symbol-section">
              <div className="about-symbol-grid">
                <div className="about-symbol-visual">
                  <div className="about-symbol-logo-container">
                    <img src="/logo.png" alt="Party Symbol" className="about-party-logo" />
                  </div>
                </div>
                <div className="about-symbol-info">
                  <h2 className={`about-symbol-title ${language === 'ta' ? 'about-tamil-text' : ''}`}>{t.symbolTitle}</h2>
                  <p className={`about-symbol-desc ${language === 'ta' ? 'about-tamil-text' : ''}`}>{t.symbolDesc}</p>
                  <div className="about-symbol-features">
                    <div className="about-symbol-feature">
                      <Check size={24} />
                      <span className={language === 'ta' ? 'about-tamil-text' : ''}>
                        {language === 'ta' ? 'மம்தா பானர்ஜி வடிவமைப்பு' : 'Designed by Mamata Banerjee'}
                      </span>
                    </div>
                    <div className="about-symbol-feature">
                      <Check size={24} />
                      <span className={language === 'ta' ? 'about-tamil-text' : ''}>
                        {language === 'ta' ? 'தேர்தல் ஆணையம் அங்கீகாரம்' : 'Election Commission Approved'}
                      </span>
                    </div>
                    <div className="about-symbol-feature">
                      <Check size={24} />
                      <span className={language === 'ta' ? 'about-tamil-text' : ''}>
                        {language === 'ta' ? '6% வாக்கு தேவை' : '6% Vote Requirement'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer language={language} setLanguage={handleLanguageChange} t={t} />
      </div>
    </>
  );
};

export default About;