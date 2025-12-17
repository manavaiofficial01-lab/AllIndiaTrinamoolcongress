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
  const carouselImages = [
    {
      id: 1,
      image: '/mamta-banerjee-for-tn-1.webp',
      alt: 'Mamata Banerjee addressing public meeting in Tamil Nadu'
    },
    {
      id: 2,
      image: '/mamata-banerjee-for-tn-2.jpg',
      alt: 'Mamata Banerjee TMC Tamil Nadu campaign'
    },
    {
      id: 3,
      image: '/mamta-banerjee-for-tn-2.webp',
      alt: 'TMC Tamil Nadu political rally'
    },
    {
      id: 4,
      image: '/mamata-banerjee-for-tn-4.jpg',
      alt: 'Mamata Banerjee leadership in Tamil Nadu'
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
      hero: {
        slogan: 'மக்களுக்காக, மக்களால், மக்களோடு',
        tagline: 'புதிய தமிழகம், பலமான தமிழகம்',
        vision: 'தமிழ்நாட்டின் முன்னேற்றத்திற்கும், மக்கள் நலனுக்கும் அர்ப்பணித்த அரசியல் இயக்கம். சமத்துவம், வளர்ச்சி, மற்றும் நீதியை அடிப்படையாகக் கொண்ட ஒரு புதிய தமிழ்நாட்டை உருவாக்குவோம்.',
        cta1: 'இப்போதே இணையுங்கள்',
        cta2: 'எங்கள் பார்வையை அறிக',
      },
      stats: {
        volunteers: 'தன்னார்வலர்கள்',
        events: 'நிகழ்வுகள்',
        districts: 'மாவட்டங்கள்',
        beneficiaries: 'பயனாளிகள்'
      },
      about: {
        title: 'திரிணமூல் காங்கிரஸ் - தமிழ்நாடு',
        subtitle: 'மக்கள் முதல், மக்கள் எப்போதும்',
        history: `திரிணமூல் காங்கிரஸ் தமிழ்நாடு மக்கள் நலன் சார்ந்த கொள்கைகளுடன், தமிழ் கலாச்சாரத்தை மதித்து, அனைவருக்கும் சம வாய்ப்புகளை வழங்கும் அரசியல் இயக்கமாகும். சமூக நீதி, பொருளாதார வளர்ச்சி, மற்றும் கலாச்சார பெருமையில் வேரூன்றியுள்ள நாங்கள், கிராமங்கள் முதல் நகரங்கள் வரை, விவசாயிகள், தொழிலாளர்கள், சிறு வியாபாரிகள், மாணவர்கள் மற்றும் புறக்கணிக்கப்பட்ட சமூகங்களின் தேவைகளை பாதுகாக்க கடமைப்பட்டுள்ளோம். எங்கள் இலக்கு நேர்மையான அரசியல், வெளிப்படையான நிர்வாகம் மற்றும் மக்கள் பங்கேற்புடன் கூடிய ஆட்சி.`,
        values: [
          { 
            title: 'சமூக நீதி', 
            desc: 'அனைவருக்கும் சமமான வாய்ப்புகள், உரிமைகள் மற்றும் மரியாதை. ஒவ்வொரு குடிமகனும் கௌரவத்துடன் வாழ வேண்டும்.' 
          },
          { 
            title: 'வெளிப்படைத்தன்மை', 
            desc: 'நேர்மையான, பொறுப்பான மற்றும் ஊழல் இல்லாத நிர்வாகம்.' 
          },
          { 
            title: 'மக்கள் ஆட்சி', 
            desc: 'அடித்தட்டு மக்களின் குரல், பங்களிப்பு மற்றும் முடிவெடுக்கும் அதிகாரம்.' 
          },
          { 
            title: 'தமிழ் பெருமை', 
            desc: 'தமிழ் மொழி, கலாச்சாரம் மற்றும் அடையாளத்தை பாதுகாத்து வளர்ப்போம்.' 
          }
        ]
      },
      leadership: {
        title: 'எங்கள் தலைமை',
        subtitle: 'அனுபவம், தொலைநோக்கு, அர்ப்பணிப்பு',
        leaders: [
          { 
            name: 'திரு. எம்.கே.எஸ். மோகன்', 
            role: 'மாநில தலைவர்', 
            bio: 'தமிழ்நாட்டின் வளர்ச்சிக்காகவும், சமூக நீதிக்காகவும் 20 ஆண்டுகள் அர்ப்பணித்த மக்கள் தலைவர். அரசியலில் நேர்மை மற்றும் நெறிமுறைகளுக்கு முன்மாதிரி.',
            experience: '20+ ஆண்டுகள்',
            district: 'சென்னை'
          },
          { 
            name: 'திருமதி. ராதிகா சங்கர்', 
            role: 'பொது செயலாளர்', 
            bio: 'பெண்கள் அதிகாரமளித்தல், கல்வி மற்றும் சமூக நீதிக்காக போராடும் தீவிர ஆர்வலர். மக்கள் பிரச்சினைகளுக்கு குரல் கொடுப்பவர்.',
            experience: '15+ ஆண்டுகள்',
            district: 'மதுரை'
          },
          { 
            name: 'திரு. அரவிந்த் குமார்', 
            role: 'மாநில பொருளாளர்', 
            bio: 'பொருளாதார நிபுணர், வளர்ச்சி திட்ட வடிவமைப்பாளர் மற்றும் மக்கள் நலன் சார்ந்த கொள்கை வகுப்பவர். நிதி நிர்வாகத்தில் கெட்டிக்காரர்.',
            experience: '18+ ஆண்டுகள்',
            district: 'கோயம்புத்தூர்'
          }
        ]
      },
      vision: {
        title: 'தமிழ்நாட்டுக்கான எங்கள் பார்வை',
        subtitle: '2030க்குள் வளமான, முன்னேறிய, சமத்துவமான தமிழகம்',
        pillars: [
          { 
            icon: 'education', 
            title: 'கல்வி புரட்சி', 
            desc: 'தரமான இலவச கல்வி, நவீன உள்கட்டமைப்பு, உலகத்தரம் வாய்ந்த பாடத்திட்டங்கள் மற்றும் ஒவ்வொரு குழந்தைக்கும் சிறந்த எதிர்காலம்.',
            goals: ['500+ புதிய அரசு பள்ளிகள்', 'அனைவருக்கும் இலவச கணினி பயிற்சி', 'சர்வதேச தரமான கல்வி வசதிகள்', 'ஆசிரியர் பயிற்சி மையங்கள்']
          },
          { 
            icon: 'job', 
            title: 'வேலைவாய்ப்பு உறுதி', 
            desc: 'திறன் மேம்பாடு, தொழில்நுட்ப பயிற்சி, தொழில் தொடக்க உதவி, உள்ளூர் தொழில் வளர்ச்சி மற்றும் இளைஞர் அதிகாரமளித்தல்.',
            goals: ['5 லட்சம் புதிய வேலைவாய்ப்புகள்', '100+ திறன் மேம்பாட்டு மையங்கள்', 'தொழில் தொடக்க நிதி உதவி', 'வேலை உத்திரவாத திட்டம்']
          },
          { 
            icon: 'women', 
            title: 'பெண்கள் அதிகாரமளித்தல்', 
            desc: 'பாதுகாப்பு, கல்வி, தொழில் வாய்ப்புகள், அரசியல் பங்கேற்பு மற்றும் பெண்களுக்கான சிறப்பு திட்டங்கள்.',
            goals: ['50% இட ஒதுக்கீடு உத்திரவாதம்', 'பெண்கள் தொழில் தொடக்க நிதி', 'பெண்கள் பாதுகாப்பு அமைப்பு', 'இலவச திறன் மேம்பாடு']
          },
          { 
            icon: 'farmers', 
            title: 'விவசாயிகள் முன்னேற்றம்', 
            desc: 'நியாயமான விலை, நவீன தொழில்நுட்பம், கடன் தள்ளுபடி, இலவச உரம், மானிய விதைகள் மற்றும் சந்தை வசதிகள்.',
            goals: ['விவசாயி வருவாய் இரட்டிப்பு', 'அதிநவீன விவசாய தொழில்நுட்பம்', 'முழுமையான கடன் தள்ளுபடி', 'உரிய விலை உத்திரவாதம்']
          }
        ]
      },
      initiatives: {
        title: 'எங்கள் முக்கிய செயல்திட்டங்கள்',
        list: [
          { 
            title: 'இலவச மருத்துவ முகாம்கள்', 
            desc: 'ஒவ்வொரு மாவட்டத்திலும் மாதாந்திர இலவச மருத்துவ பரிசோதனை மற்றும் மருந்துகள்' 
          },
          { 
            title: 'இளைஞர் திறன் மேம்பாடு', 
            desc: 'தொழில்நுட்ப பயிற்சி, நேர்காணல் தயாரிப்பு மற்றும் வேலைவாய்ப்பு உதவி' 
          },
          { 
            title: 'சுற்றுச்சூழல் பாதுகாப்பு', 
            desc: 'மரங்கள் நடுதல், பிளாஸ்டிக் ஒழிப்பு மற்றும் சுத்தமான தமிழகம்' 
          },
          { 
            title: 'சட்ட உதவி', 
            desc: 'ஏழை எளியவர்களுக்கு இலவச சட்ட ஆலோசனை மற்றும் நீதி உதவி' 
          }
        ]
      },
      news: {
        title: 'சமீபத்திய செய்திகள்',
        items: [
          {
            date: '10 டிசம்பர் 2024',
            title: 'சென்னையில் 5000+ பேர் கலந்த பொதுக்கூட்டம்',
            desc: 'மக்கள் நலன் சார்ந்த திட்டங்கள் அறிவிப்பு'
          },
          {
            date: '5 டிசம்பர் 2024',
            title: 'விவசாயிகள் கடன் தள்ளுபடி பிரசாரம்',
            desc: 'தமிழ்நாடு முழுவதும் ஆதரவு பேரணி'
          },
          {
            date: '1 டிசம்பர் 2024',
            title: 'இலவச மருத்துவ முகாம் - மதுரை',
            desc: '2000+ பயனாளிகள் பலன் பெற்றனர்'
          }
        ]
      },
      join: {
        title: 'இந்த இயக்கத்தில் இணையுங்கள்',
        subtitle: 'தமிழ்நாட்டின் எதிர்காலத்தை நீங்களே வடிவமைக்கலாம். ஒவ்வொரு குரலும் முக்கியம், ஒவ்வொரு கையும் தேவை.',
        form: {
          name: 'முழு பெயர்',
          email: 'மின்னஞ்சல்',
          phone: 'தொலைபேசி எண்',
          district: 'மாவட்டம்',
          volunteer: 'தன்னார்வலராக பணியாற்ற',
          member: 'உறுப்பினராக இணைய',
          submit: 'இப்போதே இணையுங்கள்'
        }
      },
      contact: {
        title: 'எங்களை தொடர்பு கொள்ளுங்கள்',
        subtitle: 'உங்கள் கருத்துக்கள், பரிந்துரைகள் மற்றும் ஆதரவு எங்களுக்கு மிகவும் மதிப்புமிக்கவை',
        address: 'தலைமை அலுவலகம்',
        addressLine: 'அண்ணா சாலை, சென்னை - 600002, தமிழ்நாடு',
        phone: '+91 44 1234 5678',
        email: 'info@tmctamilnadu.org',
        hours: 'திங்கள் - சனி, காலை 9 - மாலை 6'
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
      hero: {
        slogan: 'For the People, By the People, With the People',
        tagline: 'New Tamil Nadu, Strong Tamil Nadu',
        vision: 'A political movement dedicated to Tamil Nadu\'s progress and people\'s welfare. Building a new Tamil Nadu based on equality, development, and justice.',
        cta1: 'Join Now',
        cta2: 'Know Our Vision'
      },
      stats: {
        volunteers: 'Volunteers',
        events: 'Events',
        districts: 'Districts',
        beneficiaries: 'Beneficiaries'
      },
      about: {
        title: 'Trinamool Congress - Tamil Nadu',
        subtitle: 'People First, People Always',
        history: `The Trinamool Congress Tamil Nadu is a people-centric political movement that upholds Tamil culture while ensuring equal opportunities for all. Rooted in social justice, economic growth, and cultural pride, we work from villages to cities to protect the needs of farmers, workers, small traders, students, and marginalized communities. Our goal is honest politics, transparent governance, and people-driven administration.`,
        values: [
          { 
            title: 'Social Justice', 
            desc: 'Equal opportunities, rights, and dignity for all. Every citizen deserves to live with honor, fairness, and respect.' 
          },
          { 
            title: 'Transparency', 
            desc: 'Honest, accountable, and corruption-free governance with responsibility and integrity in every action.' 
          },
          { 
            title: 'People\'s Rule', 
            desc: 'Empowering grassroots voices through participation and shared decision-making. The people remain at the heart of governance.' 
          },
          { 
            title: 'Tamil Pride', 
            desc: 'Preserving and promoting the Tamil language, culture, heritage, and identity for present and future generations.' 
          }
        ]
      },
      leadership: {
        title: 'Our Leadership',
        subtitle: 'Experience, Vision, Dedication',
        leaders: [
          { 
            name: 'Mr. M.K.S. Mohan', 
            role: 'State President', 
            bio: 'A people\'s leader dedicated to Tamil Nadu\'s development and social justice for 20 years. A role model for integrity and ethics in politics.',
            experience: '20+ Years',
            district: 'Chennai'
          },
          { 
            name: 'Mrs. Radhika Shankar', 
            role: 'General Secretary', 
            bio: 'Passionate activist fighting for women empowerment, education, and social justice. A voice for people\'s issues.',
            experience: '15+ Years',
            district: 'Madurai'
          },
          { 
            name: 'Mr. Aravind Kumar', 
            role: 'State Treasurer', 
            bio: 'Economic expert, development planner, and people-centric policy maker. Expertise in financial management.',
            experience: '18+ Years',
            district: 'Coimbatore'
          }
        ]
      },
      vision: {
        title: 'Our Vision for Tamil Nadu',
        subtitle: 'Prosperous, Progressive, Equal Tamil Nadu by 2030',
        pillars: [
          { 
            icon: 'education', 
            title: 'Education Revolution', 
            desc: 'Quality free education, modern infrastructure, world-class curriculum, and a bright future for every child.',
            goals: ['500+ new government schools', 'Free computer training for all', 'International standard education facilities', 'Teacher training centers']
          },
          { 
            icon: 'job', 
            title: 'Employment Assurance', 
            desc: 'Skill development, technical training, startup support, local industry growth, and youth empowerment.',
            goals: ['5 lakh new job opportunities', '100+ skill development centers', 'Startup financial assistance', 'Job guarantee program']
          },
          { 
            icon: 'women', 
            title: 'Women Empowerment', 
            desc: 'Safety, education, career opportunities, political participation, and special programs for women.',
            goals: ['50% reservation guarantee', 'Women entrepreneurship fund', 'Women safety system', 'Free skill development']
          },
          { 
            icon: 'farmers', 
            title: 'Farmer Prosperity', 
            desc: 'Fair prices, modern technology, loan waivers, free fertilizers, subsidized seeds, and market facilities.',
            goals: ['Double farmer income', 'Advanced agricultural technology', 'Complete loan waiver', 'Fair price guarantee']
          }
        ]
      },
      initiatives: {
        title: 'Our Key Initiatives',
        list: [
          { 
            title: 'Free Medical Camps', 
            desc: 'Monthly free health checkups and medicines in every district' 
          },
          { 
            title: 'Youth Skill Development', 
            desc: 'Technical training, interview preparation, and employment assistance' 
          },
          { 
            title: 'Environmental Protection', 
            desc: 'Tree plantation, plastic elimination, and clean Tamil Nadu campaign' 
          },
          { 
            title: 'Legal Aid', 
            desc: 'Free legal consultation and justice assistance for the underprivileged' 
          }
        ]
      },
      news: {
        title: 'Latest News',
        items: [
          {
            date: 'December 10, 2024',
            title: 'Public Meeting with 5000+ Participants in Chennai',
            desc: 'Announcement of people-welfare programs'
          },
          {
            date: 'December 5, 2024',
            title: 'Farmers Loan Waiver Campaign',
            desc: 'Support rally across Tamil Nadu'
          },
          {
            date: 'December 1, 2024',
            title: 'Free Medical Camp - Madurai',
            desc: '2000+ beneficiaries received assistance'
          }
        ]
      },
      join: {
        title: 'Join This Movement',
        subtitle: 'Shape the future of Tamil Nadu. Every voice matters, every hand is needed.',
        form: {
          name: 'Full Name',
          email: 'Email',
          phone: 'Phone Number',
          district: 'District',
          volunteer: 'Volunteer',
          member: 'Member',
          submit: 'Join Now'
        }
      },
      contact: {
        title: 'Contact Us',
        subtitle: 'Your feedback, suggestions, and support are very valuable to us',
        address: 'Head Office',
        addressLine: 'Anna Salai, Chennai - 600002, Tamil Nadu',
        phone: '+91 44 1234 5678',
        email: 'info@tmctamilnadu.org',
        hours: 'Monday - Saturday, 9 AM - 6 PM'
      }
    }
  };

  const t = content[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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
            <div className="stat-card animate-fadeIn">
              <div className="stat-icon">
                <Users size={32} />
              </div>
              <div className="stat-number volunteers">{counter.volunteers.toLocaleString()}+</div>
              <div className={`stat-label ${language === 'ta' ? 'tamil-text' : ''}`}>{t.stats.volunteers}</div>
            </div>
            <div className="stat-card animate-fadeIn">
              <div className="stat-icon">
                <Calendar size={32} />
              </div>
              <div className="stat-number events">{counter.events}+</div>
              <div className={`stat-label ${language === 'ta' ? 'tamil-text' : ''}`}>{t.stats.events}</div>
            </div>
            <div className="stat-card animate-fadeIn">
              <div className="stat-icon">
                <MapPin size={32} />
              </div>
              <div className="stat-number districts">{counter.districts}</div>
              <div className={`stat-label ${language === 'ta' ? 'tamil-text' : ''}`}>{t.stats.districts}</div>
            </div>
            <div className="stat-card animate-fadeIn">
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
                <div key={idx} className="value-card animate-fadeIn">
                  <div className="value-icon">
                    {idx === 0 && <Scale size={24} />}
                    {idx === 1 && <Shield size={24} />}
                    {idx === 2 && <Users size={24} />}
                    {idx === 3 && <BookOpen size={24} />}
                  </div>
                  <h3 className={`value-title ${language === 'ta' ? 'tamil-text' : ''}`}>{value.title}</h3>
                  <p className={`value-desc ${language === 'ta' ? 'tamil-text' : ''}`}>{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Preview Section */}
      <section className="leadership-section">
        <div className="container">
          <h2 className={`section-title ${language === 'ta' ? 'tamil-text' : ''}`}>{t.leadership.title}</h2>
          <p className={`section-subtitle ${language === 'ta' ? 'tamil-text' : ''}`}>{t.leadership.subtitle}</p>
          <div className="leader-grid">
            {t.leadership.leaders.slice(0, 2).map((leader, idx) => (
              <article key={idx} className="leader-card animate-fadeIn">
                <div className="leader-image" aria-hidden="true">
                  <User size={48} />
                </div>
                <div className="leader-info">
                  <h3 className={`leader-name ${language === 'ta' ? 'tamil-text' : ''}`}>{leader.name}</h3>
                  <p className={`leader-role ${language === 'ta' ? 'tamil-text' : ''}`}>{leader.role}</p>
                  <p className={`leader-bio ${language === 'ta' ? 'tamil-text' : ''}`}>{leader.bio.substring(0, 150)}...</p>
                  <div className="leader-meta">
                    <span className={`leader-meta-text ${language === 'ta' ? 'tamil-text' : ''}`}>
                      <Target size={16} style={{ marginRight: '4px' }} />
                      {leader.experience}
                    </span>
                    <span className={`leader-meta-text ${language === 'ta' ? 'tamil-text' : ''}`}>
                      <MapPin size={16} style={{ marginRight: '4px' }} />
                      {leader.district}
                    </span>
                  </div>
                </div>
              </article>
            ))}
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
              <article key={idx} className="pillar-card animate-fadeIn">
                <div className="pillar-header">
                  <div className="pillar-icon">
                    {pillar.icon === 'education' && <GraduationCap size={32} />}
                    {pillar.icon === 'job' && <Briefcase size={32} />}
                    {pillar.icon === 'women' && <Shield size={32} />}
                    {pillar.icon === 'farmers' && <Sprout size={32} />}
                  </div>
                  <h3 className={`pillar-title ${language === 'ta' ? 'tamil-text' : ''}`}>{pillar.title}</h3>
                </div>
                <p className={`pillar-desc ${language === 'ta' ? 'tamil-text' : ''}`}>{pillar.desc.substring(0, 120)}...</p>
                <ul className="pillar-goals">
                  {pillar.goals?.slice(0, 2).map((goal, gIdx) => (
                    <li key={gIdx} className="pillar-goal">
                      <span className="checkmark" aria-hidden="true">
                        <Check size={16} />
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
              <article key={idx} className="initiative-card animate-fadeIn">
                
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
          <div className="join-cta-card">
            <div className="join-cta-icon">
              <HandHeart size={48} />
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