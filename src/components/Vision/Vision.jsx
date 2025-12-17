import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Vision.css';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { 
  Target, 
  Eye, 
  TrendingUp, 
  Users, 
  Heart, 
  Shield, 
  BookOpen,
  GraduationCap,
  Briefcase,
  Sprout,
  Building2,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  Home,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Lightbulb,
  Scale,
  Trees,
  Cpu,
  Check,
  X,
  Plus,
  Minus,
  Map,
  Camera,
  Video,
  Music,
  Play,
  Pause,
  StopCircle,
  FastForward,
  Rewind,
  SkipBack,
  SkipForward
} from 'lucide-react';

const Vision = () => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('tmc-tn-language');
    return savedLanguage || 'en';
  });

  const [activePillar, setActivePillar] = useState('education');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // Add animations on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.vision-section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const content = {
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
      pageTitle: 'தமிழ்நாட்டிற்கான எங்கள் பார்வை',
      pageSubtitle: '2030க்குள் வளமான, முன்னேறிய, சமத்துவமான தமிழகம்',
      hero: {
        title: 'புதிய தமிழ்நாடு, வலுவான தமிழ்நாடு',
        description: 'தமிழ்நாட்டின் எதிர்காலத்திற்கான எங்கள் திட்டம் - சமத்துவம், வளர்ச்சி, நீதி மற்றும் நவீனத்துவத்தின் அடிப்படையில் ஒரு புதிய தமிழ்நாட்டை உருவாக்குவது.'
      },
      timeline: {
        title: '2030க்கான எங்கள் பயணம்',
        years: [
          { year: '2024', title: 'அடித்தளம்', desc: 'கட்டமைப்பு மற்றும் திட்ட வடிவமைப்பு' },
          { year: '2025', title: 'தொடக்கம்', desc: 'முக்கிய திட்டங்கள் தொடங்குதல்' },
          { year: '2026', title: 'விரிவாக்கம்', desc: 'அனைத்து மாவட்டங்களுக்கும் விரிவாக்கம்' },
          { year: '2027', title: 'ஒருங்கிணைப்பு', desc: 'திட்டங்கள் ஒருங்கிணைத்தல்' },
          { year: '2028', title: 'முதிர்ச்சி', desc: 'சாதனைகள் கண்கூடாக்கம்' },
          { year: '2029', title: 'மேம்பாடு', desc: 'தொழில்நுட்ப மேம்பாடு' },
          { year: '2030', title: 'இலக்கு', desc: '2030 கண்ணோட்டம் நிறைவேற்றுதல்' }
        ]
      },
      pillars: {
        title: 'எங்கள் பார்வையின் தூண்கள்',
        subtitle: 'நான்கு அடித்தள தூண்களின் அடிப்படையில் தமிழ்நாட்டின் எதிர்காலத்தை உருவாக்குகிறோம்',
        education: 'கல்வி புரட்சி',
        economy: 'பொருளாதார வளர்ச்சி',
        governance: 'நிர்வாக மறுமுனைப்பு',
        social: 'சமூக மாற்றம்',
        items: [
          {
            id: 'education',
            title: 'கல்வி புரட்சி',
            subtitle: 'ஒவ்வொரு குழந்தைக்கும் தரமான கல்வி',
            icon: 'education',
            description: 'தரமான இலவச கல்வி, நவீன உள்கட்டமைப்பு, உலகத்தரம் வாய்ந்த பாடத்திட்டங்கள் மற்றும் ஒவ்வொரு குழந்தைக்கும் சிறந்த எதிர்காலம்.',
            goals: [
              '500+ புதிய அரசு பள்ளிகள் கட்டுமானம்',
              'அனைவருக்கும் இலவச கணினி பயிற்சி',
              'சர்வதேச தரமான கல்வி வசதிகள்',
              'ஆசிரியர் பயிற்சி மையங்கள்',
              'பொதுத்தேர்வுகளில் 100% தேர்ச்சி விகிதம்',
              'ஒவ்வொரு மாணவருக்கும் மின்னணு கற்றல் சாதனம்'
            ],
            color: '#FF9933',
            stats: [
              { label: 'புதிய பள்ளிகள்', value: '500+' },
              { label: 'மாணவர்கள்', value: '20 லட்சம்+' },
              { label: 'ஆசிரியர்கள்', value: '50,000+' },
              { label: 'பயிற்சி மையங்கள்', value: '100+' }
            ]
          },
          {
            id: 'economy',
            title: 'பொருளாதார வளர்ச்சி',
            subtitle: 'வேலைவாய்ப்பு உறுதி மற்றும் தொழில் வளர்ச்சி',
            icon: 'economy',
            description: 'திறன் மேம்பாடு, தொழில்நுட்ப பயிற்சி, தொழில் தொடக்க உதவி, உள்ளூர் தொழில் வளர்ச்சி மற்றும் இளைஞர் அதிகாரமளித்தல்.',
            goals: [
              '5 லட்சம் புதிய வேலைவாய்ப்புகள்',
              '100+ திறன் மேம்பாட்டு மையங்கள்',
              'தொழில் தொடக்க நிதி உதவி',
              'வேலை உத்திரவாத திட்டம்',
              'சிறு தொழில்களுக்கு 0% வட்டி கடன்',
              'உள்ளூர் தொழில்களுக்கு சந்தை வசதி'
            ],
            color: '#138808',
            stats: [
              { label: 'வேலைவாய்ப்புகள்', value: '5 லட்சம்' },
              { label: 'தொழில் தொடக்கங்கள்', value: '10,000+' },
              { label: 'திறன் மையங்கள்', value: '100+' },
              { label: 'பயிற்சி பெற்றவர்கள்', value: '10 லட்சம்' }
            ]
          },
          {
            id: 'governance',
            title: 'நிர்வாக மறுமுனைப்பு',
            subtitle: 'முற்போக்கான மற்றும் வெளிப்படையான ஆட்சி',
            icon: 'governance',
            description: 'முற்போக்கான கொள்கைகள், ஊழல் இல்லாத நிர்வாகம், மின்னணு ஆட்சி மற்றும் மக்கள் பங்கேற்புடன் கூடிய ஆட்சி.',
            goals: [
              'அனைத்து சேவைகளும் மின்னணு மயமாக்கல்',
              'ஊழல் இல்லாத தமிழ்நாடு',
              'உள்ளாட்சி அமைப்புகளை வலுப்படுத்துதல்',
              'தொழில்முனைவோருக்கு எளிதான தொழில் சூழல்',
              '30 நாட்களுக்குள் அனைத்து அனுமதிகளும்',
              'பொது சேவைகளுக்கு 15 நிமிட உத்தரவாதம்'
            ],
            color: '#000080',
            stats: [
              { label: 'மின்னணு சேவைகள்', value: '100+' },
              { label: 'செயலாக்க நேரம்', value: '-50%' },
              { label: 'ஊழல் குறைப்பு', value: '90%' },
              { label: 'பொது திருப்தி', value: '95%+' }
            ]
          },
          {
            id: 'social',
            title: 'சமூக மாற்றம்',
            subtitle: 'சமத்துவம், நீதி மற்றும் ஒருமைப்பாடு',
            icon: 'social',
            description: 'பெண்கள் அதிகாரமளித்தல், சமூக நீதி, சுற்றுச்சூழல் பாதுகாப்பு மற்றும் ஒருங்கிணைந்த வளர்ச்சி.',
            goals: [
              'பெண்களுக்கு 50% இட ஒதுக்கீடு',
              'சுற்றுச்சூழல் பாதுகாப்பு திட்டங்கள்',
              'அனைவருக்கும் இலவச மருத்துவ சேவைகள்',
              'எல்லாத் தரப்பினருக்கும் சம வாய்ப்புகள்',
              '10 கோடி மரங்கள் நடுதல்',
              'பிளாஸ்டிக் இல்லாத தமிழ்நாடு'
            ],
            color: '#FF66B2',
            stats: [
              { label: 'பெண்கள் பங்கேற்பு', value: '50%' },
              { label: 'மரங்கள்', value: '10 கோடி' },
              { label: 'சுகாதார மையங்கள்', value: '500+' },
              { label: 'சமூக நீதி திட்டங்கள்', value: '100+' }
            ]
          }
        ]
      },
      roadmap: {
        title: 'செயல்திட்ட வரைபடம்',
        phases: [
          {
            phase: '1',
            title: 'அடித்தள கட்டம் (2024-2025)',
            items: [
              'கட்டமைப்பு வளர்ச்சி திட்டங்கள் தொடக்கம்',
              'பயிற்சி மையங்கள் நிறுவுதல்',
              'மின்னணு ஆட்சி கட்டமைப்பு',
              'கல்வி கட்டமைப்பு மேம்பாடு'
            ]
          },
          {
            phase: '2',
            title: 'விரிவாக்க கட்டம் (2026-2027)',
            items: [
              'அனைத்து மாவட்டங்களுக்கும் திட்டங்கள் விரிவாக்கம்',
              'தொழில் வளர்ச்சி மையங்கள்',
              'பொது சேவைகள் முழுமையாக மின்னணு மயமாக்கல்',
              'சமூக நீதி திட்டங்கள் செயல்படுத்துதல்'
            ]
          },
          {
            phase: '3',
            title: 'முதிர்ச்சி கட்டம் (2028-2030)',
            items: [
              'அனைத்து இலக்குகளும் நிறைவேற்றுதல்',
              'தமிழ்நாடு சுயேட்சை மாநிலமாக உயர்த்துதல்',
              'உலக தரத்திற்கு சமமான வளர்ச்சி',
              '2030 பார்வை நிறைவேற்றுதல்'
            ]
          }
        ]
      },
      stats: {
        title: 'எங்கள் இலக்குகள் மற்றும் தாக்கம்',
        items: [
          {
            value: '5M+',
            label: 'புதிய வேலைவாய்ப்புகள்',
            icon: 'job'
          },
          {
            value: '10M',
            label: 'பயிற்சி பெற்ற இளைஞர்கள்',
            icon: 'youth'
          },
          {
            value: '500+',
            label: 'புதிய பள்ளிகள்',
            icon: 'school'
          },
          {
            value: '50%',
            label: 'பெண்கள் பங்கேற்பு',
            icon: 'women'
          },
          {
            value: '100%',
            label: 'மின்னணு ஆட்சி',
            icon: 'digital'
          },
          {
            value: '10Cr',
            label: 'மரங்கள் நடுதல்',
            icon: 'trees'
          }
        ]
      },
      cta: {
        title: 'இந்த பார்வையில் பங்கேற்கவும்',
        subtitle: 'தமிழ்நாட்டின் எதிர்காலத்தை உருவாக்க எங்களுடன் சேர்ந்து பணியாற்றுங்கள்',
        button: 'இப்போது இணையுங்கள்'
      }
    },
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
      pageTitle: 'Our Vision for Tamil Nadu',
      pageSubtitle: 'Prosperous, Progressive, Equal Tamil Nadu by 2030',
      hero: {
        title: 'New Tamil Nadu, Strong Tamil Nadu',
        description: 'Our blueprint for Tamil Nadu\'s future - Building a new Tamil Nadu based on equality, development, justice, and modernity.'
      },
      timeline: {
        title: 'Our Journey to 2030',
        years: [
          { year: '2024', title: 'Foundation', desc: 'Infrastructure and Plan Design' },
          { year: '2025', title: 'Launch', desc: 'Key Projects Initiation' },
          { year: '2026', title: 'Expansion', desc: 'Expansion to All Districts' },
          { year: '2027', title: 'Integration', desc: 'Project Integration' },
          { year: '2028', title: 'Maturity', desc: 'Achievements Realization' },
          { year: '2029', title: 'Enhancement', desc: 'Technological Advancement' },
          { year: '2030', title: 'Target', desc: '2030 Vision Fulfillment' }
        ]
      },
      pillars: {
        title: 'Pillars of Our Vision',
        subtitle: 'Building Tamil Nadu\'s future on four foundational pillars',
        education: 'Education Revolution',
        economy: 'Economic Growth',
        governance: 'Governance Reforms',
        social: 'Social Transformation',
        items: [
          {
            id: 'education',
            title: 'Education Revolution',
            subtitle: 'Quality Education for Every Child',
            icon: 'education',
            description: 'Quality free education, modern infrastructure, world-class curriculum, and a bright future for every child.',
            goals: [
              'Construction of 500+ new government schools',
              'Free computer training for all',
              'International standard education facilities',
              'Teacher training centers',
              '100% pass rate in public examinations',
              'Electronic learning device for every student'
            ],
            color: '#FF9933',
            stats: [
              { label: 'New Schools', value: '500+' },
              { label: 'Students', value: '2 Million+' },
              { label: 'Teachers', value: '50,000+' },
              { label: 'Training Centers', value: '100+' }
            ]
          },
          {
            id: 'economy',
            title: 'Economic Growth',
            subtitle: 'Employment Assurance & Industrial Development',
            icon: 'economy',
            description: 'Skill development, technical training, startup support, local industry growth, and youth empowerment.',
            goals: [
              '5 lakh new job opportunities',
              '100+ skill development centers',
              'Startup financial assistance',
              'Job guarantee program',
              '0% interest loans for small businesses',
              'Market access for local industries'
            ],
            color: '#138808',
            stats: [
              { label: 'Jobs', value: '5 Lakh' },
              { label: 'Startups', value: '10,000+' },
              { label: 'Skill Centers', value: '100+' },
              { label: 'Trained Youth', value: '1 Million' }
            ]
          },
          {
            id: 'governance',
            title: 'Governance Reforms',
            subtitle: 'Progressive and Transparent Governance',
            icon: 'governance',
            description: 'Progressive policies, corruption-free administration, e-governance, and people-participatory governance.',
            goals: [
              '100% electronic service delivery',
              'Corruption-free Tamil Nadu',
              'Strengthening local governance',
              'Ease of business for entrepreneurs',
              'All approvals within 30 days',
              '15-minute guarantee for public services'
            ],
            color: '#000080',
            stats: [
              { label: 'e-Services', value: '100+' },
              { label: 'Processing Time', value: '-50%' },
              { label: 'Corruption Reduction', value: '90%' },
              { label: 'Public Satisfaction', value: '95%+' }
            ]
          },
          {
            id: 'social',
            title: 'Social Transformation',
            subtitle: 'Equality, Justice and Unity',
            icon: 'social',
            description: 'Women empowerment, social justice, environmental protection, and inclusive development.',
            goals: [
              '50% reservation for women',
              'Environmental protection programs',
              'Free healthcare services for all',
              'Equal opportunities for all sections',
              'Plantation of 100 million trees',
              'Plastic-free Tamil Nadu'
            ],
            color: '#FF66B2',
            stats: [
              { label: 'Women Participation', value: '50%' },
              { label: 'Trees', value: '100 Million' },
              { label: 'Health Centers', value: '500+' },
              { label: 'Social Justice Programs', value: '100+' }
            ]
          }
        ]
      },
      roadmap: {
        title: 'Action Plan Roadmap',
        phases: [
          {
            phase: '1',
            title: 'Foundation Phase (2024-2025)',
            items: [
              'Infrastructure development projects initiation',
              'Training centers establishment',
              'E-governance framework',
              'Education infrastructure enhancement'
            ]
          },
          {
            phase: '2',
            title: 'Expansion Phase (2026-2027)',
            items: [
              'Project expansion to all districts',
              'Industrial development centers',
              'Complete digitalization of public services',
              'Implementation of social justice programs'
            ]
          },
          {
            phase: '3',
            title: 'Maturity Phase (2028-2030)',
            items: [
              'All targets achievement',
              'Tamil Nadu elevated as model state',
              'Development matching world standards',
              '2030 vision fulfillment'
            ]
          }
        ]
      },
      stats: {
        title: 'Our Targets and Impact',
        items: [
          {
            value: '5M+',
            label: 'New Jobs',
            icon: 'job'
          },
          {
            value: '10M',
            label: 'Trained Youth',
            icon: 'youth'
          },
          {
            value: '500+',
            label: 'New Schools',
            icon: 'school'
          },
          {
            value: '50%',
            label: 'Women Participation',
            icon: 'women'
          },
          {
            value: '100%',
            label: 'E-Governance',
            icon: 'digital'
          },
          {
            value: '10Cr',
            label: 'Trees Planted',
            icon: 'trees'
          }
        ]
      },
      cta: {
        title: 'Be Part of This Vision',
        subtitle: 'Join us in shaping the future of Tamil Nadu',
        button: 'Join Now'
      }
    }
  };

  const t = content[language];

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const filteredPillars = t.pillars.items.filter(pillar => pillar.id === activePillar);

  const getIconComponent = (iconName, size = 24) => {
    switch(iconName) {
      case 'education': return <GraduationCap size={size} />;
      case 'economy': return <TrendingUp size={size} />;
      case 'governance': return <Shield size={size} />;
      case 'social': return <Users size={size} />;
      case 'job': return <Briefcase size={size} />;
      case 'youth': return <Users size={size} />;
      case 'school': return <BookOpen size={size} />;
      case 'women': return <Heart size={size} />;
      case 'digital': return <Cpu size={size} />;
      case 'trees': return <Trees size={size} />;
      case 'target': return <Target size={size} />;
      default: return <Target size={size} />;
    }
  };

  return (
    <div className="vision-page">
      {/* Navigation */}
      <Navbar 
        scrolled={scrolled}
        language={language}
        setLanguage={handleLanguageChange}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        t={t}
      />

      {/* Hero Section */}
      <section className="vision-hero vision-section">
        <div className="vision-container">
          <div className="vision-hero-content">
            <div className="vision-hero-icon animate-fade-in">
              <Eye size={48} />
            </div>
            <h1 className={`vision-title ${language === 'ta' ? 'tamil-text' : ''} animate-slide-up`}>
              {t.pageTitle}
            </h1>
            <p className={`vision-subtitle ${language === 'ta' ? 'tamil-text' : ''} animate-slide-up delay-100`}>
              {t.pageSubtitle}
            </p>
            <div className="vision-hero-card animate-slide-up delay-200">
              <div className="vision-hero-card-content">
                <h2 className={`vision-hero-card-title ${language === 'ta' ? 'tamil-text' : ''}`}>
                  {t.hero.title}
                </h2>
                <p className={`vision-hero-card-desc ${language === 'ta' ? 'tamil-text' : ''}`}>
                  {t.hero.description}
                </p>
              </div>
              <div className="vision-hero-card-decoration">
                <div className="vision-hero-card-line"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="vision-timeline-section vision-section">
        <div className="vision-container">
          <div className="vision-section-header">
            <div className="vision-section-header-icon animate-fade-in">
              <Clock size={32} />
            </div>
            <h2 className={`vision-section-title ${language === 'ta' ? 'tamil-text' : ''} animate-slide-up`}>
              {t.timeline.title}
            </h2>
            <div className="vision-section-subtitle-container">
              <p className={`vision-section-subtitle ${language === 'ta' ? 'tamil-text' : ''} animate-slide-up delay-100`}>
                {language === 'ta' 
                  ? '2030 வரை எங்கள் பயணத்தின் காலக்கோடு'
                  : 'Timeline of our journey to 2030'}
              </p>
            </div>
          </div>

          <div className="vision-timeline">
            <div className="vision-timeline-line"></div>
            <div className="vision-timeline-items">
              {t.timeline.years.map((year, index) => (
                <div key={index} className="vision-timeline-item animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="vision-timeline-year">{year.year}</div>
                  <div className="vision-timeline-content">
                    <h3 className={`vision-timeline-content-title ${language === 'ta' ? 'tamil-text' : ''}`}>
                      {year.title}
                    </h3>
                    <p className={`vision-timeline-content-desc ${language === 'ta' ? 'tamil-text' : ''}`}>
                      {year.desc}
                    </p>
                  </div>
                  <div className="vision-timeline-dot"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="vision-pillars-section vision-section">
        <div className="vision-container">
          <div className="vision-section-header">
            <div className="vision-section-header-icon animate-fade-in">
              <Target size={32} />
            </div>
            <h2 className={`vision-section-title ${language === 'ta' ? 'tamil-text' : ''} animate-slide-up`}>
              {t.pillars.title}
            </h2>
            <div className="vision-section-subtitle-container">
              <p className={`vision-section-subtitle ${language === 'ta' ? 'tamil-text' : ''} animate-slide-up delay-100`}>
                {t.pillars.subtitle}
              </p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="vision-pillars-filter">
            {t.pillars.items.map(pillar => (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`vision-pillar-filter-button ${activePillar === pillar.id ? 'vision-active' : ''} animate-fade-in`}
                style={{ '--vision-pillar-color': pillar.color }}
                aria-label={`View ${pillar.title} pillar`}
                aria-pressed={activePillar === pillar.id}
              >
                {getIconComponent(pillar.icon, 20)}
                <span>{t.pillars[pillar.id] || pillar.title}</span>
              </button>
            ))}
          </div>

          {/* Pillars Grid */}
          <div className="vision-pillars-grid">
            {filteredPillars.map((pillar, index) => (
              <div key={pillar.id} className="vision-pillar-card animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div 
                  className="vision-pillar-header"
                  style={{ backgroundColor: pillar.color }}
                  role="region"
                  aria-label={pillar.title}
                >
                  <div className="vision-pillar-icon-wrapper">
                    {getIconComponent(pillar.icon, 32)}
                  </div>
                  <div className="vision-pillar-header-content">
                    <h3 className={`vision-pillar-title ${language === 'ta' ? 'tamil-text' : ''}`}>
                      {pillar.title}
                    </h3>
                    <p className={`vision-pillar-subtitle ${language === 'ta' ? 'tamil-text' : ''}`}>
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>
                
                <div className="vision-pillar-content">
                  <p className={`vision-pillar-description ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {pillar.description}
                  </p>
                  
                  <div className="vision-pillar-stats">
                    {pillar.stats.map((stat, idx) => (
                      <div key={idx} className="vision-pillar-stat">
                        <div className="vision-pillar-stat-value" style={{ color: pillar.color }}>
                          {stat.value}
                        </div>
                        <div className={`vision-pillar-stat-label ${language === 'ta' ? 'tamil-text' : ''}`}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="vision-pillar-goals">
                    <h4 className={`vision-pillar-goals-title ${language === 'ta' ? 'tamil-text' : ''}`}>
                      {language === 'ta' ? 'முக்கிய இலக்குகள்' : 'Key Goals'}
                    </h4>
                    <ul className="vision-pillar-goals-list" role="list">
                      {pillar.goals.map((goal, idx) => (
                        <li key={idx} className="vision-pillar-goal-item" role="listitem">
                          <CheckCircle size={18} className="vision-goal-icon" style={{ color: pillar.color }} />
                          <span className={`${language === 'ta' ? 'tamil-text' : ''}`}>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="vision-roadmap-section vision-section">
        <div className="vision-container">
          <div className="vision-section-header">
            <div className="vision-section-header-icon animate-fade-in">
              <Map size={32} />
            </div>
            <h2 className={`vision-section-title ${language === 'ta' ? 'tamil-text' : ''} animate-slide-up`}>
              {t.roadmap.title}
            </h2>
          </div>

          <div className="vision-roadmap-container">
            {t.roadmap.phases.map((phase, index) => (
              <div key={index} className="vision-roadmap-phase animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="vision-phase-header">
                  <div className="vision-phase-number">{phase.phase}</div>
                  <h3 className={`vision-phase-title ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {phase.title}
                  </h3>
                </div>
                <ul className="vision-phase-items" role="list">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="vision-phase-item" role="listitem">
                      <ChevronRight size={16} className="vision-phase-item-icon" />
                      <span className={`vision-phase-item-text ${language === 'ta' ? 'tamil-text' : ''}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="vision-stats-section vision-section">
        <div className="vision-container">
          <div className="vision-section-header">
            <h2 className={`vision-section-title ${language === 'ta' ? 'tamil-text' : ''} animate-slide-up`}>
              {t.stats.title}
            </h2>
          </div>

          <div className="vision-stats-grid">
            {t.stats.items.map((stat, index) => (
              <div key={index} className="vision-stat-card animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="vision-stat-icon-wrapper">
                  {getIconComponent(stat.icon, 32)}
                </div>
                <div className="vision-stat-content">
                  <div className="vision-stat-value">{stat.value}</div>
                  <div className={`vision-stat-label ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="vision-cta-section vision-section">
        <div className="vision-container">
          <div className="vision-cta-card animate-slide-up">
            <div className="vision-cta-icon-container">
              <Target size={48} />
            </div>
            <h2 className={`vision-cta-title ${language === 'ta' ? 'tamil-text' : ''}`}>
              {t.cta.title}
            </h2>
            <p className={`vision-cta-subtitle ${language === 'ta' ? 'tamil-text' : ''}`}>
              {t.cta.subtitle}
            </p>
            <div className="vision-cta-buttons">
              <Link to="/join" className="vision-primary-button" aria-label="Join Us">
                <Users size={20} />
                <span>{t.cta.button}</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/" className="vision-secondary-button" aria-label="Back to Home">
                <Home size={20} />
                <span>{language === 'ta' ? 'முகப்புக்கு திரும்புக' : 'Back to Home'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        language={language}
        setLanguage={handleLanguageChange}
        t={t}
      />
    </div>
  );
};

export default Vision;