import { useState } from 'react';
import { Search, Bell, SlidersHorizontal, Leaf, Apple, Loader2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import './Home.css';

// Mock Data
const CATEGORIES = [
  { id: 'vegetables', name: 'Vegetables', icon: '🥕', color: '#ECFDF5' },
  { id: 'fruits', name: 'Fruits', icon: '🍎', color: '#ECFDF5' },
  { id: 'greens', name: 'Greens', icon: '🥬', color: '#ECFDF5' },
];

const FEATURED = [
  { id: 1, name: 'Organic Spinach', price: 2.50, unit: 'bundle', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop', isNew: true },
  { id: 2, name: 'Red Bell Peppers', price: 4.20, unit: 'kg', image: 'https://images.unsplash.com/photo-1599313426214-72b12cfaca83?w=400&h=300&fit=crop' },
  { id: 3, name: 'Fresh Broccoli', price: 3.15, unit: 'head', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bef?w=400&h=300&fit=crop' },
  { id: 4, name: 'Sweet Carrots', price: 1.80, unit: 'kg', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop', discount: '-10%' },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = FEATURED.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container home-page">
      {/* Header */}
      <header className="home-header">
        <div className="brand">
          <img src="/greenway_logo.png" alt="GreenWay Logo" className="home-logo-img" />
          <h1>GreenWay</h1>
        </div>
        <button className="icon-btn">
          <Bell size={24} />
          <span className="dot"></span>
        </button>
      </header>


      {/* Search */}
      <div className="search-section">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for fresh food..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories - Only show if not searching */}
      {!searchTerm && (
        <section className="categories-section">
          <div className="section-header">
            <h2>Categories</h2>
            <button className="see-all">See all</button>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="category-card" style={{ backgroundColor: cat.color }} onClick={() => navigate(`/category/${cat.id}`)}>
                <div className="cat-icon-bg">{cat.icon}</div>
                <span>{cat.name}</span>
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
              <span className="badge">Free Delivery</span>
              <h2>Organic food delivered to your home</h2>
              <button className="btn-white">Order Now</button>
            </div>
            {/* Illustration */}
            <div className="banner-bg-icon">
              <ShoppingBag size={100} opacity={0.1} />
            </div>
          </div>
        </section>
      )}

      {/* Featured / Search Results */}
      <section className="products-section">
        <div className="section-header">
          <h2>{searchTerm ? 'Search Results' : 'Featured Fresh'}</h2>
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
            <p>No products found for "{searchTerm}"</p>
          </div>
        )}
      </section>
      
      <div className="bottom-spacer"></div>
      <BottomNav />
    </div>
  );
};

export default Home;
