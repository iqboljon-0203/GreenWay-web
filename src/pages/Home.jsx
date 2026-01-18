import { useState, useRef } from 'react';
import { Search, Bell, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import './Home.css';
import { PRODUCTS } from '../data/products';

// Mock Data
const CATEGORIES = [
  { id: 'vegetables', name: 'Vegetables', icon: '🥕', color: '#ECFDF5' },
  { id: 'fruits', name: 'Fruits', icon: '🍎', color: '#ECFDF5' },
  { id: 'greens', name: 'Greens', icon: '🥬', color: '#ECFDF5' },
];

const FEATURED = PRODUCTS.slice(0, 4);

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const productsRef = useRef(null);
  const { lang, t } = useLanguage();

  const currentLang = LANGUAGES.find(l => l.id === lang) || LANGUAGES[0];

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = (searchTerm ? PRODUCTS : FEATURED).filter(product => 
    t(product.nameKey || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container home-page">
      {/* Header */}
      <header className="home-header">
        <div className="brand">
          <img src="/greenway_logo.png" alt="GreenWay Logo" className="home-logo-img" />
          <h1>GreenWay</h1>
        </div>
        <div className="header-actions">
          <button className="lang-btn" onClick={() => setIsLangOpen(true)}>
             <span className="current-code">{currentLang.code}</span>
          </button>
          <button className="icon-btn">
            <Bell size={24} />
            <span className="dot"></span>
          </button>
        </div>
      </header>

      <LanguageSelector isOpen={isLangOpen} onClose={() => setIsLangOpen(false)} />


      {/* Search */}
      <div className="search-section">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder={t('search')} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories - Only show if not searching */}
      {!searchTerm && (
        <section className="categories-section">
          <div className="section-header">
            <h2>{t('categories')}</h2>
            <button className="see-all">{t('seeAll')}</button>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="category-card" style={{ backgroundColor: cat.color }} onClick={() => navigate(`/category/${cat.id}`)}>
                <div className="cat-icon-bg">{cat.icon}</div>
                <span>{t(`cat_${cat.id}`)}</span>
              </div>
            ))}
            <div className="category-card spacer"></div>
          </div>
        </section>
      )}

      {/* Banner - Only show if not searching */}
      {!searchTerm && (
        <section className="banner-section">
          <div className="banner">
            <div className="banner-content">
              <span className="badge">{t('freeDelivery')}</span>
              <h2>{t('bannerText')}</h2>
              <button className="btn-white" onClick={scrollToProducts}>{t('orderNow')}</button>
            </div>
            {/* Illustration */}
            <div className="banner-bg-icon">
              <ShoppingBag size={100} opacity={0.1} />
            </div>
          </div>
        </section>
      )}

      {/* Featured / Search Results */}
      <section className="products-section" ref={productsRef}>
        <div className="section-header">
          <h2>{searchTerm ? (t('noResults') === 'Mahsulot topilmadi' ? 'Qidiruv natijalari' : (t('noResults') === 'Ничего не найдено' ? 'Результаты поиска' : 'Search Results')) : t('featured')}</h2>
          <button className="filter-btn"><SlidersHorizontal size={18} /></button>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => navigate(`/product/${product.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>{t('noResults')}</p>
          </div>
        )}
      </section>
      
      <div className="bottom-spacer"></div>
      <BottomNav />
    </div>
  );
};

export default Home;
