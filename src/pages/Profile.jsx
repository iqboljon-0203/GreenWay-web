import { User, MapPin, Globe, Headphones, LogOut } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import './Profile.css';

import { useEffect, useState } from 'react';



const Profile = () => {
  const [user, setUser] = useState({
    firstName: 'Guest',
    username: '',
    photoUrl: null
  });

  useEffect(() => {
    // Check if Telegram WebApp is available
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      
      const tgUser = tg.initDataUnsafe?.user;
      
      if (tgUser) {
        setUser({
          firstName: tgUser.first_name,
          username: tgUser.username ? `@${tgUser.username}` : '',
          photoUrl: tgUser.photo_url || null
        });
      }
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
          <span>My Addresses</span>
        </div>
        <div className="menu-item">
          <div className="menu-icon"><Globe size={20} /></div>
          <span>Language (English)</span>
        </div>
        <div className="menu-item">
          <div className="menu-icon"><Headphones size={20} /></div>
          <span>Support / Help</span>
        </div>
        <div className="menu-item text-danger">
           {/* Can't really logout from Telegram WebApp but maybe clear session */}
          <div className="menu-icon"><LogOut size={20} /></div>
          <span>Log Out</span>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Profile;
