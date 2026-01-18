import { User, MapPin, Globe, Headphones, LogOut } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import './Profile.css';

import { useEffect, useState } from 'react';

const Profile = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang, t } = useLanguage();
  const currentLang = LANGUAGES.find(l => l.id === lang) || LANGUAGES[0];

  const [user, setUser] = useState({
    firstName: 'Guest',
    username: '',
    photoUrl: null
  });

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    const initApp = () => {
      if (tg) {
        tg.ready();
        tg.expand();
        
        const tgUser = tg.initDataUnsafe?.user;
        if (tgUser) {
          setUser({
            firstName: tgUser.first_name || 'GreenWay User',
            username: tgUser.username ? `@${tgUser.username}` : (tgUser.last_name || ''),
            photoUrl: tgUser.photo_url || null
          });
          return true;
        }
      }
      return false;
    };

    // Try to initialize immediately
    const success = initApp();

    // If failed (maybe TG not ready), try again after short delay
    if (!success) {
      const timer = setTimeout(() => {
        initApp();
      }, 500);
      return () => clearTimeout(timer);
    }

    // Local development fallback
    if (!success && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      setUser({
        firstName: 'Test User',
        username: '@greenway_test',
        photoUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop'
      });
    }
  }, []);

  return (
    <div className="page-container profile-page">
      <div className="profile-header">
        <div className="profile-photo">
          {user.photoUrl ? <img src={user.photoUrl} alt="Profile" /> : <User size={40} />}
        </div>
        <h2>{user.firstName}</h2>
        <p>{user.username}</p>
      </div>

      <div className="menu-list">
        <div className="menu-item">
          <div className="menu-icon"><MapPin size={20} /></div>
          <span>{t('settings')}</span>
        </div>
        <div className="menu-item" onClick={() => setIsLangOpen(true)}>
          <div className="menu-icon"><Globe size={20} /></div>
          <span>{t('language')} ({currentLang.name})</span>
        </div>
        <div className="menu-item">
          <div className="menu-icon"><Headphones size={20} /></div>
          <span>Support</span>
        </div>
      </div>
      
      <LanguageSelector isOpen={isLangOpen} onClose={() => setIsLangOpen(false)} />
      <div className="bottom-spacer"></div>
      <BottomNav />
    </div>
  );
};

export default Profile;
