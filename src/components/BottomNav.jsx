import { Home, ShoppingBag, ShoppingCart, Heart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import './BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { t } = useLanguage();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav-container">
      <div className="bottom-nav">
        <button 
          className={`nav-item ${isActive('/') ? 'active' : ''}`} 
          onClick={() => navigate('/')}
        >
          <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
          <span>{t('home')}</span>
        </button>
        
        <button 
          className={`nav-item ${isActive('/history') ? 'active' : ''}`} 
          onClick={() => navigate('/history')}
        >
          <ShoppingBag size={24} strokeWidth={isActive('/history') ? 2.5 : 2} />
          <span>{t('history')}</span>
        </button>

        <div className="nav-item-central-wrapper">
          <button 
            className="nav-item-central"
            onClick={() => navigate('/cart')}
          >
             {cartCount > 0 && <div className="cart-badge-dot">{cartCount}</div>}
            <ShoppingCart size={28} color="white" />
          </button>
        </div>

        <button 
          className={`nav-item ${isActive('/saved') ? 'active' : ''}`} 
          onClick={() => navigate('/saved')}
        >
          <Heart size={24} strokeWidth={isActive('/saved') ? 2.5 : 2} />
          <span>{t('saved')}</span>
        </button>

        <button 
          className={`nav-item ${isActive('/profile') ? 'active' : ''}`} 
          onClick={() => navigate('/profile')}
        >
          <User size={24} strokeWidth={isActive('/profile') ? 2.5 : 2} />
          <span>{t('profile')}</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
