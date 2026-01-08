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
          name: 'வழக்கறிஞர் உமா கிரிதரன் BA LLB',
          role: 'மாநில தலைவர்',
          bio: 'தமிழ்நாட்டுக்கான அகில இந்திய திரிணமூல் காங்கிரஸ் மாநில தலைவர். சமூக நீதி மற்றும் மக்கள் நலன் சார்ந்த கொள்கைகளுக்காக அர்ப்பணிப்புடன் பணியாற்றுபவர். கட்சியின் வளர்ச்சியை முன்னெடுத்துச் செல்பவர்.',
          experience: '20+ ஆண்டுகள்',
          district: 'சென்னை',
          category: 'state',
          image: '/media/img_18.jpg'
        },
        {
          id: 2,
          name: 'திரு. P. S. சண்முகநாதன்',
          role: 'மாநில பொது செயலாளர்',
          bio: 'மக்களின் அடிப்படை உரிமைகளுக்காகவும், தமிழ்நாட்டின் வளர்ச்சிக்காகவும் தொடர்ந்து குரல் கொடுக்கும் அனுபவம் வாய்ந்த தலைவர். அடிமட்டத் தொண்டர்களுடன் நெருங்கிப் பணியாற்றுபவர்.',
          experience: '25+ ஆண்டுகள்',
          district: 'மதுரை',
          category: 'state',
          image: '/media/img_19.jpg'
        },
        {
          id: 3,
          name: 'திரு. M. கிரிதரன்',
          role: 'மாவட்ட செயலாளர்',
          bio: 'தென்காசி மாவட்டத்தின் சிறந்த மக்கள் தலைவர். எளிய மக்களின் துயர் துடைப்பதில் முன்நிற்பவர். மாவட்ட அளவில் கட்சியின் கொள்கைகளை கொண்டு சேர்ப்பவர்.',
          experience: '15+ ஆண்டுகள்',
          district: 'தென்காசி',
          category: 'regional',
          image: '/media/img_20.jpg'
        },
        {
          id: 4,
          name: 'திருமதி. N. பாக்கியலட்சுமி',
          role: 'மாவட்ட செயலாளர்',
          bio: 'திருநெல்வேலி மாவட்டத்தின் துடிப்பான பெண் தலைவர். பெண்கள் முன்னேற்றம் and கல்விக்காக தொடர்ந்து பாடுபடுபவர்.',
          experience: '12+ ஆண்டுகள்',
          district: 'திருநெல்வேலி',
          category: 'regional',
          image: '/media/img_21.jpg'
        },
        {
          id: 5,
          name: 'ஸ்ரீ கலா K V',
          role: 'மாவட்ட செயலாளர்',
          bio: 'நாகர்கோவில் பகுதியின் செல்வாக்குமிக்க தலைவர். மக்களின் அடிப்படைத் தேவைகளுக்காகவும் உள்கட்டமைப்பு வசதிகளுக்காகவும் போராடுபவர்.',
          experience: '10+ ஆண்டுகள்',
          district: 'நாகர்கோவில்',
          category: 'regional',
          image: '/media/img_22.jpg'
        },
        {
          id: 6,
          name: 'திருமதி. திவ்யா',
          role: 'மாவட்ட செயலாளர்',
          bio: 'மதுரை மாவட்டத்தின் இளம் மற்றும் உத்வேகமான தலைவர். இளைஞர்களை அரசியலில் ஆக்கப்பூர்வமாக ஈடுபடுத்துபவர்.',
          experience: '8+ ஆண்டுகள்',
          district: 'மதுரை',
          category: 'regional',
          image: '/media/img_23.jpg'
        },
        {
          id: 7,
          name: 'டாக்டர் K. விஜி குமார்',
          role: 'மாவட்ட செயலாளர்',
          bio: 'கன்னியாகுமரி மாவட்டத்தின் தொலைநோக்கு சிந்தனை கொண்ட தலைவர். சுகாதாரம் மற்றும் சமூக மேம்பாட்டிற்காக அர்ப்பணிப்புடன் பணியாற்றுபவர்.',
          experience: '15+ ஆண்டுகள்',
          district: 'கன்னியாகுமரி',
          category: 'regional',
          image: '/media/img_24.jpg'
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
          name: 'Advocate Uma Giridharan BA LLB',
          role: 'State President',
          bio: 'State President of AITMC Tamil Nadu. Dedicated to social justice and people-centric policies. A visionary leader driving the party\'s growth in the state.',
          experience: '20+ Years',
          district: 'Chennai',
          category: 'state',
          image: '/media/img_18.jpg'
        },
        {
          id: 2,
          name: 'Mr. P. S. Shanmuganathan',
          role: 'State General Secretary',
          bio: 'An experienced leader consistently voicing out for people\'s rights and the development of Tamil Nadu. Works closely with grassroots level cadres.',
          experience: '25+ Years',
          district: 'Madurai',
          category: 'state',
          image: '/media/img_19.jpg'
        },
        {
          id: 3,
          name: 'Mr. M. Giridharan',
          role: 'District Secretary',
          bio: 'A prominent people\'s leader from Tenkasi district, dedicated to solving the issues of the common man and strengthening the party at the local level.',
          experience: '15+ Years',
          district: 'Tenkasi',
          category: 'regional',
          image: '/media/img_20.jpg'
        },
        {
          id: 4,
          name: 'Mrs. N. Bbakiyalakshmi',
          role: 'District Secretary',
          bio: 'A dynamic woman leader from Tirunelveli district, continuously working for the empowerment of women and quality education.',
          experience: '12+ Years',
          district: 'Tirunelveli',
          category: 'regional',
          image: '/media/img_21.jpg'
        },
        {
          id: 5,
          name: 'SREE KALA K V',
          role: 'District Secretary',
          bio: 'An influential leader from Nagercoil, fighting for basic infrastructure and welfare needs of the people.',
          experience: '10+ Years',
          district: 'Nagercoil',
          category: 'regional',
          image: '/media/img_22.jpg'
        },
        {
          id: 6,
          name: 'Mrs. Divya',
          role: 'District Secretary',
          bio: 'A young and energetic leader from Madurai district, actively encouraging youth participation in constructive politics.',
          experience: '8+ Years',
          district: 'Madurai',
          category: 'regional',
          image: '/media/img_23.jpg'
        },
        {
          id: 7,
          name: 'Dr. K. Viji Kumar',
          role: 'District Secretary',
          bio: 'A visionary leader from Kanyakumari district, dedicated to health and social development efforts.',
          experience: '15+ Years',
          district: 'Kanyakumari',
          category: 'regional',
          image: '/media/img_24.jpg'
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
            <div className="leadership-hero-decoration">
              <div className="leadership-hero-tricolor-line"></div>
            </div>
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
                <div className="mamata-political-career">
                  <h3 className={`section-heading ${language === 'ta' ? 'tamil-text' : ''}`}>
                    <Briefcase size={20} className="section-icon" />
                    {language === 'ta' ? 'அரசியல் வாழ்க்கை' : 'Political Career'}
                  </h3>
                  <p className={`mamata-bio ${language === 'ta' ? 'tamil-text' : ''}`}>
                    {t.mamataBanerjee.politicalCareer}
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