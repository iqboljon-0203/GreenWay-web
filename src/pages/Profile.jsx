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
    const loadUserData = () => {
      const tg = window.Telegram?.WebApp;
      
      // Attempt to initialize and expand
      if (tg) {
        tg.ready();
        tg.expand();
      }

      // Check for user data
      if (tg?.initDataUnsafe?.user) {
        const userData = tg.initDataUnsafe.user;
        setUser({
          firstName: userData.first_name || 'GreenWay User',
          username: userData.username ? `@${userData.username}` : '',
          photoUrl: userData.photo_url || null
        });
        console.log('Telegram User Data Loaded');
      } 
      // Fallback
      else {
        setUser({
          firstName: 'Demo User',
          username: '@greenway_test',
          photoUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop'
        });
      }
    };

    loadUserData();
    // Second attempt after half a second to catch late initialization
    const timer = setTimeout(loadUserData, 500);
    return () => clearTimeout(timer);
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
