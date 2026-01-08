import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Target,
  Users,
  MapPin,
  Trophy,
  Heart,
  GraduationCap,
  Sprout,
  Construction,
  Briefcase,
  UserCheck,
  Compass,
  Leaf,
  Laptop,
  Calendar,
  ArrowRight,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Share2,
  Download,
  Clock,
  Eye
} from 'lucide-react';
import './Initiatives.css';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';

const Initiatives = () => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('tmc-tn-language');
    return savedLanguage || 'en';
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const location = useLocation();
  const videoRef = useRef(null);
  const modalRef = useRef(null);

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
      title: 'Our Initiatives',
      subtitle: 'Transforming Tamil Nadu Through Action',
      description: 'Discover the impactful initiatives and programs launched by Trinamool Congress leaders across Tamil Nadu. Each project is designed to empower communities, drive development, and create lasting positive change.',

      // Leaders Section
      leadersTitle: 'Meet Our Initiative Leaders',
      leadersSubtitle: 'Dedicated leaders driving change across Tamil Nadu',

      // Impact Stories
      impactTitle: 'Impact Stories',
      impactSubtitle: 'Real stories of transformation from our initiatives',

      // Timeline
      timelineTitle: 'Initiative Timeline',
      timelineSubtitle: 'Track the progress of our initiatives',

      // How to Participate
      participateTitle: 'How to Participate',
      participateSteps: [
        'Register your interest in an initiative',
        'Attend orientation sessions',
        'Volunteer for implementation',
        'Monitor progress and provide feedback'
      ],

      // Download Resources
      downloadTitle: 'Resources',

      // View Details
      viewDetails: 'View Details',
      learnMore: 'Learn More',
      backToList: 'Back to Initiatives',

      // Status
      status: {
        ongoing: 'Ongoing',
        completed: 'Completed',
        upcoming: 'Upcoming',
        planned: 'Planned'
      }
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
      title: 'எங்கள் செயல்திட்டங்கள்',
      subtitle: 'செயல்பாட்டின் மூலம் தமிழ்நாட்டை மாற்றுகிறோம்',
      description: 'தமிழ்நாடு முழுவதும் திரிணமூல் காங்கிரஸ் தலைவர்கள் தொடங்கிய தாக்கமுள்ள செயல்திட்டங்கள் மற்றும் நிகழ்ச்சிகளைக் கண்டறியவும். ஒவ்வொரு திட்டமும் சமூகங்களை அதிகாரப்படுத்த, வளர்ச்சியை ஊக்குவித்து, நிலையான நேர்மறை மாற்றத்தை உருவாக்க வடிவமைக்கப்பட்டுள்ளது.',

      // Leaders Section
      leadersTitle: 'எங்கள் திட்டத் தலைவர்களைச் சந்திக்கவும்',
      leadersSubtitle: 'தமிழ்நாடு முழுவதும் மாற்றத்தை ஏற்படுத்தும் அர்ப்பணித்த தலைவர்கள்',

      // Impact Stories
      impactTitle: 'தாக்கக் கதைகள்',
      impactSubtitle: 'எங்கள் செயல்திட்டங்களின் உண்மையான மாற்றக் கதைகள்',

      // Timeline
      timelineTitle: 'திட்ட காலக்கோடு',
      timelineSubtitle: 'எங்கள் செயல்திட்டங்களின் முன்னேற்றத்தைக் கண்காணிக்கவும்',

      // How to Participate
      participateTitle: 'எப்படி பங்கேற்கலாம்',
      participateSteps: [
        'ஒரு திட்டத்தில் உங்கள் ஆர்வத்தைப் பதிவு செய்யவும்',
        'அறிமுகப் படிப்புகளில் கலந்துகொள்ளவும்',
        'செயல்படுத்துவதற்கு தன்னார்வலராகுங்கள்',
        'முன்னேற்றத்தைக் கண்காணித்து கருத்தைத் தெரிவிக்கவும்'
      ],

      // Download Resources
      downloadTitle: 'வளங்கள்',

      // View Details
      viewDetails: 'விவரங்களைக் காண்க',
      learnMore: 'மேலும் அறிக',
      backToList: 'செயல்திட்டங்களுக்குத் திரும்பு',

      // Status
      status: {
        ongoing: 'நடந்து கொண்டிருக்கிறது',
        completed: 'நிறைவடைந்தது',
        upcoming: 'வரவிருக்கிறது',
        planned: 'திட்டமிடப்பட்டது'
      }
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

  // Video controls functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setIsMuted(vol === 0);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setIsPlaying(true);
    // Reset video controls
    setIsMuted(false);
    setVolume(0.8);
    setCurrentTime(0);
  };

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedStory(null);
    setIsPlaying(false);
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && selectedStory) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [selectedStory]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && selectedStory) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedStory]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  // Leaders Data - Reduced to 2 leaders
  const leaders = [
    {
      id: 1,
      name: language === 'ta' ? 'வழக்கறிஞர் உமா கிரிதரன் BA LLB' : 'Advocate Uma Giridharan BA LLB',
      role: language === 'ta' ? 'மாநில தலைவர்' : 'State President',
      district: 'Chennai',
      initiativesCount: 15,
      image: '/media/img_18.jpg',
      bio: language === 'ta'
        ? 'சமூக நீதி மற்றும் மக்கள் நலன் சார்ந்த கொள்கைகளுக்காக அர்ப்பணிப்புடன் பணியாற்றுபவர். 20+ ஆண்டுகள் அனுபவம்.'
        : 'Dedicated to social justice and people-centric policies. 20+ years of experience.',
      contact: 'uma@tmctn.org',
      phone: '+91 94874 46195'
    },
    {
      id: 2,
      name: language === 'ta' ? 'திரு. P. S. சண்முகநாதன்' : 'Mr. P. S. Shanmuganathan',
      role: language === 'ta' ? 'மாநில பொது செயலாளர்' : 'State General Secretary',
      district: 'Madurai',
      initiativesCount: 10,
      image: '/media/img_19.jpg',
      bio: language === 'ta'
        ? 'மக்களின் அடிப்படை உரிமைகளுக்காகவும், தமிழ்நாட்டின் வளர்ச்சிக்காகவும் தொடர்ந்து குரல் கொடுக்கும் அனுபவம் வாய்ந்த தலைவர்.'
        : 'An experienced leader consistently voicing out for people\'s rights and the development of Tamil Nadu.',
      contact: 'shanmu@tmctn.org',
      phone: '+91 90878 08087'
    }
  ];

  // Impact Stories
  const impactStories = [
    {
      id: 1,
      name: language === 'ta' ? 'ராஜேஸ்வரி' : 'Rajeshwari',
      location: language === 'ta' ? 'மதுரை' : 'Madurai',
      initiativeId: 3,
      story: language === 'ta'
        ? 'மாதவிலக்கு பொருட்கள் திட்டம் என் வாழ்க்கையை மாற்றியது. இப்போது நான் பள்ளியில் தொடர்ந்து படிக்க முடிகிறது.'
        : 'The sanitary pads program changed my life. Now I can continue my studies without interruption.',
      image: '/rajeshwari-story.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-telling-her-story-4332-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      before: language === 'ta' ? 'மாதத்தில் 5 நாட்கள் பள்ளி வராதது' : 'Missed 5 days of school monthly',
      after: language === 'ta' ? '100% வருகை' : '100% attendance',
      date: '2024-06-15',
      views: 1245,
      duration: '2:30'
    },
    {
      id: 2,
      name: language === 'ta' ? 'முருகன்' : 'Murugan',
      location: language === 'ta' ? 'திருச்சி' : 'Trichy',
      initiativeId: 2,
      story: language === 'ta'
        ? 'கடன் தள்ளுபடி திட்டம் என் குடும்பத்தை காப்பாற்றியது. இப்போது என் கடன்கள் இல்லை.'
        : 'The loan waiver scheme saved my family. Now I have no debts.',
      image: '/murugan-story.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-farmer-in-a-field-of-wheat-42826-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1581092334653-363d127c8d25?w=400&h=300&fit=crop',
      before: language === 'ta' ? '₹2 லட்சம் கடன்' : '₹2 lakh debt',
      after: language === 'ta' ? 'கடனில்லா வாழ்க்கை' : 'Debt-free life',
      date: '2024-05-20',
      views: 1876,
      duration: '3:15'
    },
    {
      id: 3,
      name: language === 'ta' ? 'கௌதம்' : 'Gowtham',
      location: language === 'ta' ? 'சென்னை' : 'Chennai',
      initiativeId: 1,
      story: language === 'ta'
        ? 'இலவச கணினி பயிற்சி எனக்கு டேட்டா அனலிஸ்ட் வேலை கிடைக்க உதவியது. மாதம் ₹40000 சம்பளம்.'
        : 'Free computer training helped me get a data analyst job. ₹40000 monthly salary.',
      image: '/gowtham-story.jpg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-working-on-a-laptop-4482-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1581092580497-e0d4cb184827?w=400&h=300&fit=crop',
      before: language === 'ta' ? 'வேலைவாய்ப்பு இல்லாதவர்' : 'Unemployed',
      after: language === 'ta' ? 'டேட்டா அனலிஸ்ட்' : 'Data Analyst',
      date: '2024-07-10',
      views: 2341,
      duration: '4:20'
    }
  ];

  // Get category icon function
  const getCategoryIcon = (category) => {
    const iconProps = { size: 24, strokeWidth: 2 };
    switch (category) {
      case 'health':
        return <Heart {...iconProps} />;
      case 'education':
        return <GraduationCap {...iconProps} />;
      case 'agriculture':
        return <Sprout {...iconProps} />;
      case 'infrastructure':
        return <Construction {...iconProps} />;
      case 'employment':
        return <Briefcase {...iconProps} />;
      case 'women':
        return <UserCheck {...iconProps} />;
      case 'youth':
        return <Compass {...iconProps} />;
      case 'environment':
        return <Leaf {...iconProps} />;
      case 'technology':
        return <Laptop {...iconProps} />;
      case 'socialwelfare':
        return <Heart {...iconProps} />;
      default:
        return <Target {...iconProps} />;
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'health':
        return '#ef4444';
      case 'education':
        return '#3b82f6';
      case 'agriculture':
        return '#22c55e';
      case 'infrastructure':
        return '#f59e0b';
      case 'employment':
        return '#8b5cf6';
      case 'women':
        return '#ec4899';
      case 'youth':
        return '#06b6d4';
      case 'environment':
        return '#10b981';
      case 'technology':
        return '#6366f1';
      case 'socialwelfare':
        return '#f97316';
      default:
        return '#6b7280';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return '#22c55e';
      case 'completed':
        return '#3b82f6';
      case 'upcoming':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString(language === 'ta' ? 'ta-IN' : 'en-IN');
  };

  // Handle share
  const handleShare = (initiative) => {
    if (navigator.share) {
      navigator.share({
        title: initiative.title,
        text: initiative.description.substring(0, 100),
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'ta'
        ? 'இணைப்பு நகலெடுக்கப்பட்டது!'
        : 'Link copied to clipboard!'
      );
    }
  };

  // Handle initiative click
  const handleInitiativeClick = (initiative) => {
    console.log('Clicked initiative:', initiative);
  };

  // Handle leader click
  const handleLeaderClick = (leader) => {
    console.log('Clicked leader:', leader);
  };

  return (
    <div className="initiative-container">
      <Navbar
        scrolled={scrolled}
        language={language}
        setLanguage={handleLanguageChange}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        t={t}
      />

      {/* Hero Section */}
      <section className="initiative-hero">
        <div className="initiative-container-inner">
          <div className="initiative-hero-content">
            <div className="initiative-hero-decoration">
              <div className="initiative-hero-tricolor-line"></div>
            </div>
            <h1 className={`initiative-hero-title ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
              {t.title}
            </h1>
            <p className={`initiative-hero-subtitle ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
              {t.subtitle}
            </p>
            <p className={`initiative-hero-description ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedStory && (
        <div className="initiative-video-modal-overlay">
          <div className="initiative-video-modal" ref={modalRef}>
            <div className="initiative-video-modal-header">
              <div className="initiative-video-modal-title">
                <h3 className={`${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
                  {selectedStory.name}'s {language === 'ta' ? 'கதை' : 'Story'}
                </h3>
                <p className={`initiative-video-modal-subtitle ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
                  {selectedStory.location} • {formatDate(selectedStory.date)}
                </p>
              </div>
              <button className="initiative-close-modal-btn" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="initiative-video-container">
              <video
                ref={videoRef}
                src={selectedStory.videoUrl}
                poster={selectedStory.thumbnail}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                autoPlay
                className="initiative-story-video"
              />

              {/* Custom Video Controls */}
              <div className="initiative-video-controls">
                {/* Progress Bar */}
                <div className="initiative-progress-container">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="initiative-progress-slider"
                  />
                  <div className="initiative-time-display">
                    <span>{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="initiative-control-buttons">
                  <div className="initiative-left-controls">
                    <button className="initiative-control-btn" onClick={togglePlay}>
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>

                    <button className="initiative-control-btn" onClick={toggleMute}>
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>

                    <div className="initiative-volume-slider-container">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="initiative-volume-slider"
                      />
                    </div>

                    <div className="initiative-time-info">
                      <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="initiative-right-controls">
                    <button className="initiative-control-btn" onClick={() => handleShare(selectedStory)}>
                      <Share2 size={20} />
                    </button>
                    <button className="initiative-control-btn" onClick={toggleFullscreen}>
                      {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      )}

      {/* Leaders Section */}
      <section className="initiative-leaders">
        <div className="initiative-container-inner">
          <div className="initiative-section-header">
            <h2 className={`initiative-section-title ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
              {t.leadersTitle}
            </h2>
            <p className={`initiative-section-subtitle ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
              {t.leadersSubtitle}
            </p>
          </div>

          <div className="initiative-leaders-grid">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className="initiative-leader-card"
                onClick={() => handleLeaderClick(leader)}
              >
                <div className="initiative-leader-card-image">
                  {leader.image ? (
                    <img
                      src={leader.image}
                      alt={leader.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className="initiative-leader-avatar-large">
                      {leader.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="initiative-leader-card-content">
                  <h4 className={`initiative-leader-name ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
                    {leader.name}
                  </h4>
                  <p className={`initiative-leader-role ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
                    {leader.role}
                  </p>
                  <div className="initiative-leader-meta">
                    <div className="initiative-leader-meta-item">
                      <MapPin size={16} strokeWidth={2} />
                      <span>{leader.district}</span>
                    </div>
                  </div>

                  <p className={`initiative-leader-bio ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
                    {leader.bio.substring(0, 100)}...
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="initiative-impact-stories">
        <div className="initiative-container-inner">
          <div className="initiative-section-header">
            <h2 className={`initiative-section-title ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
              {t.impactTitle}
            </h2>
            <p className={`initiative-section-subtitle ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
              {t.impactSubtitle}
            </p>
          </div>

          <div className="initiative-stories-grid">
            {impactStories.map((story) => (
              <div
                key={story.id}
                className="initiative-impact-story-card"
                onClick={() => handleStoryClick(story)}
              >
                <div className="initiative-impact-story-image">
                  <div className="initiative-video-thumbnail">
                    <img
                      src={story.thumbnail || story.image}
                      alt={story.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="initiative-play-button-overlay">
                      <div className="initiative-play-button">
                        <Play size={32} />
                      </div>
                      <span className="initiative-video-duration">{story.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="initiative-impact-story-content">
                  <h4 className={`initiative-story-name ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
                    {story.name}
                  </h4>
                  <div className="initiative-story-meta">
                    <div className="initiative-story-meta-item">
                      <MapPin size={16} strokeWidth={2} />
                      <span>{story.location}</span>
                    </div>
                    <div className="initiative-story-meta-item">
                      <Calendar size={16} strokeWidth={2} />
                      <span>{formatDate(story.date)}</span>
                    </div>
                    <div className="initiative-story-meta-item">
                      <Eye size={16} strokeWidth={2} />
                      <span>{story.views.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className={`initiative-story-text ${language === 'ta' ? 'initiative-tamil-text' : ''}`}>
                    {story.story.substring(0, 120)}...
                  </p>

                  <button className="initiative-watch-story-btn">
                    <span>{language === 'ta' ? 'கதையைப் பார்க்கவும்' : 'Watch Story'}</span>
                    <Play size={16} />
                  </button>
                </div>
              </div>
            ))}
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

export default Initiatives;