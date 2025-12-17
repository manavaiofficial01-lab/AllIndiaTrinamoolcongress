import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Leadership.css';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { 
  Clock, 
  MapPin, 
  CheckCircle, 
  Award, 
  Target, 
  Users, 
  UserCircle, 
  Mail, 
  ArrowRight,
  Home,
  ChevronRight,
  Star,
  BookOpen,
  GraduationCap,
  Briefcase,
  PenTool,
  Heart,
  Shield,
  Book,
  Paintbrush,
  Image
} from 'lucide-react';

const Leadership = () => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('tmc-tn-language');
    return savedLanguage || 'en';
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mamataImageError, setMamataImageError] = useState(false);

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
      pageTitle: 'தலைமை',
      pageSubtitle: 'அனுபவம், தொலைநோக்கு, அர்ப்பணிப்பு',
      filterAll: 'அனைத்தும்',
      filterNational: 'தேசிய தலைமை',
      filterState: 'மாநில தலைமை',
      filterRegional: 'மாவட்ட தலைமை',
      mamataBanerjee: {
        title: 'முதல்வர் மம்தா பானர்ஜி',
        subtitle: 'மேற்கு வங்காள முதல்வர் மற்றும் அகில இந்திய திரிணமூல் காங்கிரஸ் தலைவர்',
        earlyLife: `மம்தா பானர்ஜி (மேற்கு வங்காளத்தின் மாண்புமிகு முதல்வர் மற்றும் அகில இந்திய திரிணமூல் காங்கிரஸ் தலைவர்), இவர் இறந்த பிரமிலேஸ்வர் பானர்ஜி மற்றும் திருமதி காயத்ரி பானர்ஜி ஆகியோரின் மகளாவார். இவர் கொல்கத்தாவில் பிறந்தார்.

        இவரது தந்தை ஒரு சுதந்திரப் போராட்ட வீரராக இருந்தார். இவரது தாயார், தமது குடும்பத்தின் எல்லா உயர்வு தாழ்வுகளுக்கும் ஆதரவாக இருந்தவர். மம்தா பானர்ஜியின் உள்ளத்தில் நியாயமான விளையாட்டு ஆவல், அனைத்து மனிதர்களிடமும் ஆழ்ந்த உணர்வு மற்றும் ஒடுக்கப்பட்டவர்களுக்காக நிற்கும் தைரியம் ஆகியவற்றை பதித்தார். இந்த மதிப்புகள் இவருக்கு வழிகாட்டும் சக்தியாக இருந்தன, இது மிகவும் கடினமான சவால்கள் மற்றும் பணிகளை ஏற்க தூண்டியது.`,
        education: `மம்தா பானர்ஜி கலை இளங்கலை (BA), கல்வி இளங்கலை (B.Ed), சட்ட இளங்கலை (LLB) மற்றும் கலையில் முதுகலைப் பட்டம் (MA) ஆகியவற்றைப் பெற்றுள்ளார்.`,
        studentPolitics: `ஜோக்மாயா தேவி கல்லூரியில் மாணவியாக இருந்தபோது மேற்கு வங்காள சத்திர பரிஷத்தில் சேர்க்கப்பட்டார் மற்றும் 1977-83 காலகட்டத்தில் அதன் செயலாக்கக் குழுவின் உறுப்பினராக பணியாற்றினார்.`,
        politicalCareer: `1979-80 காலகட்டத்தில் மேற்கு வங்காள காங்கிரஸ் (இந்திரா) பொதுச் செயலாளராகவும், மேற்கு வங்காள மாகாண தொழிற்சங்க காங்கிரஸ் செயலாளராகவும் பணியாற்றினார். 1983-88 காலகட்டத்தில், இந்திய தேசிய தொழிற்சங்க காங்கிரஸின் மகளிர் பிரிவின் செயலாளராக இருந்தார் மற்றும் 1980-85 காலகட்டத்தில் தெற்கு கல்கத்தா மாவட்ட காங்கிரஸ் (இந்திரா) செயலாளராக இருந்தார்.

        1984இல், ஜதவ்பூர் தொகுதியில் இருந்து நாடாளுமன்ற உறுப்பினராகத் தேர்ந்தெடுக்கப்பட்டார் மற்றும் இளைஞர் காங்கிரஸ் (இந்திரா) பொதுச் செயலாளராகப் பதவி வகித்து 1987இல் தேசிய கவுன்சில் உறுப்பினராகவும் 1988இல் காங்கிரஸ் நாடாளுமன்ற கட்சியின் செயற்குழு உறுப்பினராகவும் ஆனார்.

        1991, 1996, 1998, 1999, 2004 மற்றும் 2009ஆம் ஆண்டுகளில் தென் கொல்கத்தா நாடாளுமன்றத் தொகுதியிலிருந்து நாடாளுமன்ற உறுப்பினராக மீண்டும் தேர்ந்தெடுக்கப்பட்டார், இது இவரை இந்தியாவின் மிக அனுபவம் வாய்ந்த நாடாளுமன்ற உறுப்பினர்களில் ஒருவராக ஆக்கியது.`,
        ministerialRoles: `இவர் பல நாடாளுமன்றக் குழுக்களின் உறுப்பினராகப் பணியாற்றியுள்ளார் மற்றும் 1991இல் இந்திய அரசின் இளைஞர் மற்றும் விளையாட்டு, பெண்கள் மற்றும் குழந்தை மேம்பாடு மாநில அமைச்சராக நியமிக்கப்பட்டார். 1999இல் இந்திய அரசின் இரயில்வே அமைச்சராகவும் 2004இல் நிலக்கரி மற்றும் சுரங்கங்களுக்கான அமைச்சரவை அமைச்சராகவும் நியமிக்கப்பட்டார். 2009இல், இரயில்வே அமைச்சராக மீண்டும் நியமிக்கப்பட்டார். 2011இல், அகில இந்திய திரிணமூல் காங்கிரஸ் 34 வருட பழைய ஆட்சிக்கு முடிவு கட்டும் வரலாற்று வெற்றியைப் பதிவு செய்தது. மே 20 அன்று, மம்தா பானர்ஜி மேற்கு வங்காளத்தின் முதல் பெண் முதல்வராகப் பொறுப்பேற்றார்.`,
        achievements: [
          'மேற்கு வங்காளத்தின் முதல் பெண் முதல்வர் (2011, 2016, 2021 ஆம் ஆண்டுகளில் தேர்ந்தெடுக்கப்பட்டார்)',
          'இந்தியாவில் மிக நீண்ட காலம் பதவியில் இருந்த பெண் முதல்வர்',
          'கல்கத்தா மாநகராட்சியின் முதல் பெண் மேயர்',
          'இந்தியாவின் இரயில்வே அமைச்சராக இரண்டு முறை பணியாற்றியவர் (1999 மற்றும் 2009)',
          'நிலக்கரி மற்றும் சுரங்கங்கள் அமைச்சரக அமைச்சர் (2004)',
          '20 க்கும் மேற்பட்ட புத்தகங்களை எழுதியுள்ளார்',
          '5000 க்கும் மேற்பட்ட எண்ணெய் ஓவியங்களை உருவாக்கியுள்ளார்'
        ],
        artisticSide: `தனது மிகவும் பிஸியான வேலை அட்டவணை இருந்தபோதிலும், இவர் இருபதுக்கும் மேற்பட்ட புத்தகங்களை எழுதியுள்ளார் மற்றும் 5000 க்கும் மேற்பட்ட எண்ணெய் ஓவியங்களை உருவாக்கியுள்ளார், அவற்றில் சில ஏலத்தில் விற்கப்பட்டுள்ளன. அவர் ஏலம் விற்பனையின் வருமானத்தை பல்வேறு வளர்ச்சி மற்றும் சமூக நோக்கங்களுக்காக நன்கொடையாக வழங்கியுள்ளார்.

        மம்தா பானர்ஜி ஒரு திறமையான கவிஞரும் கூட. இவரது எழுத்துக்கள் வங்காளி மற்றும் ஆங்கிலத்தில் உள்ளன.`,
        role: 'தேசிய தலைமை',
        experience: '40+ ஆண்டுகள்',
        location: 'கொல்கத்தா, மேற்கு வங்காளம்'
      },
      leaders: [
        {
          id: 1,
          name: 'திரு. எம்.கே.எஸ். மோகன்',
          role: 'மாநில தலைவர்',
          bio: 'தமிழ்நாட்டின் வளர்ச்சிக்காகவும், சமூக நீதிக்காகவும் 20 ஆண்டுகள் அர்ப்பணித்த மக்கள் தலைவர். அரசியலில் நேர்மை மற்றும் நெறிமுறைகளுக்கு முன்மாதிரி. விவசாயிகள் மற்றும் தொழிலாளர்களின் உரிமைகளுக்காக தீவிரமாக போராடியவர்.',
          experience: '20+ ஆண்டுகள்',
          district: 'சென்னை',
          category: 'state',
          image: '/leaders/mks-mohan.jpg'
        },
        {
          id: 2,
          name: 'திருமதி. ராதிகா சங்கர்',
          role: 'பொது செயலாளர்',
          bio: 'பெண்கள் அதிகாரமளித்தல், கல்வி மற்றும் சமூக நீதிக்காக போராடும் தீவிர ஆர்வலர். மக்கள் பிரச்சினைகளுக்கு குரல் கொடுப்பவர். 15 ஆண்டுகளுக்கும் மேலாக சமூக சேவையில் ஈடுபட்டுள்ளார்.',
          experience: '15+ ஆண்டுகள்',
          district: 'மதுரை',
          category: 'state',
          image: '/leaders/radhika-shankar.jpg'
        },
        {
          id: 3,
          name: 'திரு. அரவிந்த் குமார்',
          role: 'மாநில பொருளாளர்',
          bio: 'பொருளாதார நிபுணர், வளர்ச்சி திட்ட வடிவமைப்பாளர் மற்றும் மக்கள் நலன் சார்ந்த கொள்கை வகுப்பவர். நிதி நிர்வாகத்தில் கெட்டிக்காரர். தொழில் வளர்ச்சி மற்றும் இளைஞர் வேலைவாய்ப்புக்காக பணியாற்றியவர்.',
          experience: '18+ ஆண்டுகள்',
          district: 'கோயம்புத்தூர்',
          category: 'state',
          image: '/leaders/aravind-kumar.jpg'
        },
        {
          id: 4,
          name: 'திரு. விஜய் குமார்',
          role: 'தென் மண்டல செயலாளர்',
          bio: 'மதுரை மண்டலத்தின் பிரபலமான இளைஞர் தலைவர். கல்வி மற்றும் இளைஞர் அதிகாரமளித்தல் திட்டங்களுக்காக அறியப்பட்டவர். 10,000 க்கும் மேற்பட்ட இளைஞர்களை இயக்கத்தில் இணைத்துள்ளார்.',
          experience: '12+ ஆண்டுகள்',
          district: 'மதுரை',
          category: 'regional',
          image: '/leaders/vijay-kumar.jpg'
        },
        {
          id: 5,
          name: 'திருமதி. கௌரி சிவானந்தம்',
          role: 'வட மண்டல செயலாளர்',
          bio: 'சென்னை மற்றும் சுற்றுவட்டார பகுதிகளில் பிரபலமான பெண் தலைவர். பெண்கள் பாதுகாப்பு மற்றும் சமத்துவத்திற்காக போராடியவர். பல கல்வி மற்றும் சுகாதார முகாம்களை நடத்தியுள்ளார்.',
          experience: '14+ ஆண்டுகள்',
          district: 'சென்னை',
          category: 'regional',
          image: '/leaders/gowri-sivanandam.jpg'
        },
        {
          id: 6,
          name: 'திரு. ராஜேஷ் பாண்டே',
          role: 'மேற்கு மண்டல செயலாளர்',
          bio: 'கோயம்புத்தூர் மற்றும் அருகிலுள்ள மாவட்டங்களில் பிரபலமான தொழிலதிபர் மற்றும் அரசியல்வாதி. தொழில் வளர்ச்சி மற்றும் சிறு தொழில்களுக்கு ஆதரவு அளிப்பவர். 500+ தொழில் நிறுவனங்களுக்கு வழிகாட்டியுள்ளார்.',
          experience: '16+ ஆண்டுகள்',
          district: 'கோயம்புத்தூர்',
          category: 'regional',
          image: '/leaders/rajesh-pande.jpg'
        }
      ],
      categories: {
        national: 'தேசிய தலைமை',
        state: 'மாநில தலைமை',
        regional: 'மாவட்ட தலைமை'
      },
      viewProfile: 'சுயவிவரத்தை காண்க',
      contactLeader: 'தொடர்பு கொள்ள',
      backToHome: 'முகப்புக்கு திரும்புக',
      joinMovement: 'இயக்கத்தில் இணையுங்கள்'
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
      pageTitle: 'Leadership',
      pageSubtitle: 'Experience, Vision, Dedication',
      filterAll: 'All',
      filterNational: 'National Leadership',
      filterState: 'State Leadership',
      filterRegional: 'District Leadership',
      mamataBanerjee: {
        title: 'Ms. Mamata Banerjee',
        subtitle: 'Hon\'ble Chief Minister of West Bengal and Chairperson, All India Trinamool Congress',
        earlyLife: `Ms Mamata Banerjee (Hon'ble Chief Minister of West Bengal and Chairperson, All India Trinamool Congress), daughter of Late Promileswar Banerjee and Mrs Gayatri Banerjee, was born in Kolkata.

        Her father was a freedom fighter and her mother who has supported her family through all its ups and downs, had instilled in Ms Banerjee the spirit of fair play, deep feeling for all human beings and the courage to stand for the downtrodden. These values in her have been the guiding force, which has driven her to take on the most difficult challenges and tasks.`,
        education: `Ms Banerjee holds Bachelor degrees in Arts (BA), Education (B.Ed), Law (LLB) and a Masters degree in Arts (MA).`,
        studentPolitics: `Ms Banerjee was inducted to the West Bengal Chhatra Parishad while as a student of Jogmaya Debi College and worked as a Member of its Working Committee during 1977-83.`,
        politicalCareer: `She held the post of General Secretary, West Bengal Congress (Indira) between 1979-80 and was Secretary, West Bengal Provincial Trade Union Congress. During the period 1983-88, she was the Secretary of the Women's Wing of the Indian National Trade Union Congress and was the Secretary, South Calcutta District Congress (Indira) for the period 1980-85.

        In 1984, she was elected as a Member of Parliament from the Jadavpur Constituency and held the post of General Secretary of the Youth Congress (Indira) and became a member of the National Council in 1987 and a member of the Executive Committee of the Congress Parliamentary Party in 1988.

        She was re-elected as a Member of Parliament in 1991, 1996, 1998, 1999, 2004 and 2009 from the South Kolkata Parliamentary Constituency, making her one of India's most experienced Parliamentarians.`,
        ministerialRoles: `She has served as a member of several Parliamentary Committees and was appointed as a Minister of State for Youth and Sports, Women and Child Development, Government of India in 1991. She was appointed the Railway Minister of the Government of India in 1999 and Cabinet Minister for Coal and Mines in 2004. In 2009, she was re-appointed the Railway Minister. In 2011, All India Trinamool Congress registered a historic win to put an end to a 34-year-old regime. On May 20, Ms Banerjee took over as the first woman Chief Minister of West Bengal.`,
        achievements: [
          'First woman Chief Minister of West Bengal (Elected in 2011, 2016, and 2021)',
          'Longest-serving female Chief Minister in India',
          'First female Mayor of Kolkata Municipal Corporation',
          'Served as Railway Minister of India twice (1999 and 2009)',
          'Cabinet Minister for Coal and Mines (2004)',
          'Authored over twenty books',
          'Created over 5000 oil paintings'
        ],
        artisticSide: `In spite of her very busy work schedule, she has authored over twenty books and created over 5000 oil paintings, quite a few of which have been auctioned. She has donated the proceeds of the auctions for various developmental and social causes.

        Ms Banerjee is also an accomplished poet. Her writings are in Bengali and English.`,
        role: 'National Leadership',
        experience: '40+ Years',
        location: 'Kolkata, West Bengal'
      },
      leaders: [
        {
          id: 1,
          name: 'Mr. M.K.S. Mohan',
          role: 'State President',
          bio: 'A people\'s leader dedicated to Tamil Nadu\'s development and social justice for 20 years. A role model for integrity and ethics in politics. Actively fought for the rights of farmers and laborers.',
          experience: '20+ Years',
          district: 'Chennai',
          category: 'state',
          image: '/leaders/mks-mohan.jpg'
        },
        {
          id: 2,
          name: 'Mrs. Radhika Shankar',
          role: 'General Secretary',
          bio: 'Passionate activist fighting for women empowerment, education, and social justice. A voice for people\'s issues. Involved in social service for over 15 years.',
          experience: '15+ Years',
          district: 'Madurai',
          category: 'state',
          image: '/leaders/radhika-shankar.jpg'
        },
        {
          id: 3,
          name: 'Mr. Aravind Kumar',
          role: 'State Treasurer',
          bio: 'Economic expert, development planner, and people-centric policy maker. Expertise in financial management. Worked for industrial development and youth employment.',
          experience: '18+ Years',
          district: 'Coimbatore',
          category: 'state',
          image: '/leaders/aravind-kumar.jpg'
        },
        {
          id: 4,
          name: 'Mr. Vijay Kumar',
          role: 'South Zonal Secretary',
          bio: 'Popular youth leader from Madurai zone. Known for education and youth empowerment programs. Connected over 10,000 youth to the movement.',
          experience: '12+ Years',
          district: 'Madurai',
          category: 'regional',
          image: '/leaders/vijay-kumar.jpg'
        },
        {
          id: 5,
          name: 'Mrs. Gowri Sivanandam',
          role: 'North Zonal Secretary',
          bio: 'Popular women leader from Chennai and surrounding areas. Fought for women safety and equality. Conducted several education and health camps.',
          experience: '14+ Years',
          district: 'Chennai',
          category: 'regional',
          image: '/leaders/gowri-sivanandam.jpg'
        },
        {
          id: 6,
          name: 'Mr. Rajesh Pande',
          role: 'West Zonal Secretary',
          bio: 'Popular businessman and politician from Coimbatore and nearby districts. Supports industrial development and small businesses. Guided 500+ business establishments.',
          experience: '16+ Years',
          district: 'Coimbatore',
          category: 'regional',
          image: '/leaders/rajesh-pande.jpg'
        }
      ],
      categories: {
        national: 'National Leadership',
        state: 'State Leadership',
        regional: 'District Leadership'
      },
      viewProfile: 'View Profile',
      contactLeader: 'Contact',
      backToHome: 'Back to Home',
      joinMovement: 'Join the Movement'
    }
  };

  const t = content[language];

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const filteredLeaders = activeCategory === 'all' 
    ? t.leaders 
    : t.leaders.filter(leader => leader.category === activeCategory);

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'state', label: t.filterState },
    { id: 'regional', label: t.filterRegional }
  ];

  return (
    <div className="leadership-page">
      {/* Navigation */}
      <Navbar 
        scrolled={false}
        language={language}
        setLanguage={handleLanguageChange}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        t={t}
      />

      {/* Hero Banner */}
      <section className="leadership-hero">
        <div className="container">
          <div className="leadership-hero-content">
            <h1 className={`leadership-title ${language === 'ta' ? 'tamil-text' : ''}`}>
              {t.pageTitle}
            </h1>
            <p className={`leadership-subtitle ${language === 'ta' ? 'tamil-text' : ''}`}>
              {t.pageSubtitle}
            </p>
            <p className="leadership-description">
              {language === 'ta' 
                ? 'அனுபவம் வாய்ந்த தலைமை, தெளிவான பார்வை மற்றும் மக்களுக்கான அர்ப்பணிப்பு கொண்ட தலைவர்கள்.'
                : 'Experienced leadership with clear vision and dedication to the people.'}
            </p>
          </div>
        </div>
      </section>

      {/* Mamata Banerjee Section */}
      <section className="mamata-section">
        <div className="container">
          <div className="mamata-card">
            <div className="mamata-header">
              <div className="mamata-badge">
                <Star size={16} />
                <span>{t.mamataBanerjee.role}</span>
              </div>
              <h2 className={`mamata-title ${language === 'ta' ? 'tamil-text' : ''}`}>
                {t.mamataBanerjee.title}
              </h2>
              <p className={`mamata-subtitle ${language === 'ta' ? 'tamil-text' : ''}`}>
                {t.mamataBanerjee.subtitle}
              </p>
            </div>
            
            <div className="mamata-content">
              <div className="mamata-image-container">
                <div className="mamata-profile-image-wrapper">
                  {mamataImageError ? (
                    <div className="mamata-image-fallback">
                      <UserCircle size={80} className="mamata-avatar" />
                      <div className="mamata-initials">MB</div>
                    </div>
                  ) : (
                    <img 
                      src="/mamata-bannerjee-profile.jpg" 
                      alt={t.mamataBanerjee.title}
                      className="mamata-profile-image"
                      onError={() => setMamataImageError(true)}
                      onLoad={() => setMamataImageError(false)}
                    />
                  )}
                  <div className="mamata-image-overlay">
                    <div className="mamata-image-caption">
                      <Image size={16} />
                      <span>{language === 'ta' ? 'தலைவர் மம்தா பானர்ஜி' : 'Chairperson Mamata Banerjee'}</span>
                    </div>
                  </div>
                </div>
                <div className="mamata-stats">
                  <div className="mamata-stat">
                    <div className="mamata-stat-icon">
                      <Clock size={20} />
                    </div>
                    <div className="mamata-stat-content">
                      <div className="mamata-stat-value">{t.mamataBanerjee.experience}</div>
                      <div className={`mamata-stat-label ${language === 'ta' ? 'tamil-text' : ''}`}>
                        {language === 'ta' ? 'அனுபவம்' : 'Experience'}
                      </div>
                    </div>
                  </div>
                  <div className="mamata-stat">
                    <div className="mamata-stat-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="mamata-stat-content">
                      <div className={`mamata-stat-value ${language === 'ta' ? 'tamil-text' : ''}`}>
                        {t.mamataBanerjee.location}
                      </div>
                      <div className={`mamata-stat-label ${language === 'ta' ? 'tamil-text' : ''}`}>
                        {language === 'ta' ? 'இடம்' : 'Location'}
                      </div>
                    </div>
                  </div>
                  <div className="mamata-stat">
                    <div className="mamata-stat-icon">
                      <GraduationCap size={20} />
                    </div>
                    <div className="mamata-stat-content">
                      <div className="mamata-stat-value">5</div>
                      <div className={`mamata-stat-label ${language === 'ta' ? 'tamil-text' : ''}`}>
                        {language === 'ta' ? 'பட்டங்கள்' : 'Degrees'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mamata-info">
                <div className="mamata-bio-section">
                  <h3 className={`section-heading ${language === 'ta' ? 'tamil-text' : ''}`}>
                    <Heart size={20} className="section-icon" />
                    {language === 'ta' ? 'தொடக்க கால வாழ்க்கை' : 'Early Life & Family'}
                  </h3>
                  <p className={`mamata-bio ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {t.mamataBanerjee.earlyLife}
                  </p>
                </div>
                
                <div className="mamata-education-section">
                  <h3 className={`section-heading ${language === 'ta' ? 'tamil-text' : ''}`}>
                    <GraduationCap size={20} className="section-icon" />
                    {language === 'ta' ? 'கல்வி தகுதிகள்' : 'Educational Qualifications'}
                  </h3>
                  <p className={`mamata-bio ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {t.mamataBanerjee.education}
                  </p>
                </div>

                <div className="mamata-student-politics">
                  <h3 className={`section-heading ${language === 'ta' ? 'tamil-text' : ''}`}>
                    <Users size={20} className="section-icon" />
                    {language === 'ta' ? 'மாணவர் அரசியல்' : 'Student Politics'}
                  </h3>
                  <p className={`mamata-bio ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {t.mamataBanerjee.studentPolitics}
                  </p>
                </div>

                <div className="mamata-political-career">
                  <h3 className={`section-heading ${language === 'ta' ? 'tamil-text' : ''}`}>
                    <Briefcase size={20} className="section-icon" />
                    {language === 'ta' ? 'அரசியல் வாழ்க்கை' : 'Political Career'}
                  </h3>
                  <p className={`mamata-bio ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {t.mamataBanerjee.politicalCareer}
                  </p>
                </div>

                <div className="mamata-ministerial-roles">
                  <h3 className={`section-heading ${language === 'ta' ? 'tamil-text' : ''}`}>
                    <Shield size={20} className="section-icon" />
                    {language === 'ta' ? 'அமைச்சரக பதவிகள்' : 'Ministerial Roles'}
                  </h3>
                  <p className={`mamata-bio ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {t.mamataBanerjee.ministerialRoles}
                  </p>
                </div>
                
                <div className="mamata-achievements">
                  <h3 className={`section-heading ${language === 'ta' ? 'tamil-text' : ''}`}>
                    <Award size={20} className="section-icon" />
                    {language === 'ta' ? 'சாதனைகள்' : 'Key Achievements'}
                  </h3>
                  <ul className="achievements-list">
                    {t.mamataBanerjee.achievements.map((achievement, idx) => (
                      <li key={idx} className={`achievement-item ${language === 'ta' ? 'tamil-text' : ''}`}>
                        <CheckCircle size={18} className="achievement-icon" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mamata-artistic-side">
                  <h3 className={`section-heading ${language === 'ta' ? 'tamil-text' : ''}`}>
                    <Paintbrush size={20} className="section-icon" />
                    {language === 'ta' ? 'கலை மற்றும் இலக்கியம்' : 'Artistic & Literary Pursuits'}
                  </h3>
                  <p className={`mamata-bio ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {t.mamataBanerjee.artisticSide}
                  </p>
                  <div className="art-stats">
                    <div className="art-stat">
                      <BookOpen size={20} className="art-stat-icon" />
                      <div className="art-stat-content">
                        <div className="art-stat-value">20+</div>
                        <div className="art-stat-label">{language === 'ta' ? 'புத்தகங்கள்' : 'Books'}</div>
                      </div>
                    </div>
                    <div className="art-stat">
                      <Paintbrush size={20} className="art-stat-icon" />
                      <div className="art-stat-content">
                        <div className="art-stat-value">5000+</div>
                        <div className="art-stat-label">{language === 'ta' ? 'ஓவியங்கள்' : 'Paintings'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tamil Nadu Leadership Section */}
      <section className="tn-leadership-section">
        <div className="container">
          <div className="section-header">
            <div className="section-header-icon">
              <Users size={32} />
            </div>
            <h2 className={`section-title ${language === 'ta' ? 'tamil-text' : ''}`}>
              {language === 'ta' ? 'தமிழ்நாடு தலைமை' : 'Tamil Nadu Leadership'}
            </h2>
            <p className={`section-subtitle ${language === 'ta' ? 'tamil-text' : ''}`}>
              {language === 'ta' 
                ? 'தமிழ்நாட்டின் எதிர்காலத்தை வடிவமைக்கும் அர்ப்பணிப்புள்ள தலைவர்கள்'
                : 'Dedicated leaders shaping the future of Tamil Nadu'}
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="leadership-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
                {activeCategory === category.id && <ChevronRight size={16} className="filter-icon" />}
              </button>
            ))}
          </div>

          {/* Leaders Grid */}
          <div className="leaders-grid">
            {filteredLeaders.map(leader => (
              <div key={leader.id} className="leader-card">
                <div className="leader-image-container">
                  <div 
                    className="leader-image"
                    style={{
                      backgroundImage: `url(${leader.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    onError={(e) => {
                      e.target.style.background = '#138808';
                      e.target.innerHTML = `
                        <div class="leader-avatar-fallback">
                          <svg class="leader-avatar-icon" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                          <span class="leader-initials">${leader.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                      `;
                    }}
                  >
                    <div className="leader-category-badge">
                      <Star size={12} />
                      <span>{t.categories[leader.category]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="leader-info">
                  <h3 className={`leader-name ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {leader.name}
                  </h3>
                  <p className={`leader-role ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {leader.role}
                  </p>
                  <p className={`leader-bio ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {leader.bio.substring(0, 100)}...
                  </p>                  
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="leadership-cta">
            <div className="cta-icon-container">
              <Users size={48} className="cta-icon" />
            </div>
            <h3 className={`cta-title ${language === 'ta' ? 'tamil-text' : ''}`}>
              {language === 'ta' 
                ? 'இந்த தலைமையுடன் இணையுங்கள்' 
                : 'Join This Leadership'}
            </h3>
            <p className={`cta-subtitle ${language === 'ta' ? 'tamil-text' : ''}`}>
              {language === 'ta'
                ? 'தமிழ்நாட்டின் எதிர்காலத்தை உருவாக்க எங்களுடன் சேர்ந்து பணியாற்றுங்கள்'
                : 'Work with us to shape the future of Tamil Nadu'}
            </p>
            <div className="cta-buttons">
              <Link to="/join" className="primary-button">
                <Users size={20} />
                <span>{t.joinMovement}</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/" className="secondary-button">
                <Home size={20} />
                <span>{t.backToHome}</span>
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

export default Leadership;