import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { useSaved } from '../context/SavedContext';
import { useLanguage } from '../context/LanguageContext';
import './Saved.css';

const Saved = () => {
  const navigate = useNavigate();
  const { savedItems } = useSaved();
  const { t } = useLanguage();

  return (
    <div className="page-container saved-page">
      <header className="saved-header">
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1>{t('saved')}</h1>
        <div style={{ width: 44 }}></div> {/* Spacer for symmetry */}
      </header>

      {savedItems.length > 0 ? (
        <div className="products-grid">
          {savedItems.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-saved">
          <div className="empty-icon-circle">
            <Heart size={48} />
          </div>
          <h2>{t('saved')} {t('noResults').toLowerCase()}</h2>
          <p>{t('saved')} {t('noResults').toLowerCase()}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
             {t('orderNow')}
          </button>
        </div>
      )}

      <div className="bottom-spacer"></div>
      <BottomNav />
    </div>
  );
};

export default Saved;

