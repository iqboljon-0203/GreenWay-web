import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { useSaved } from '../context/SavedContext';
import './Saved.css';

const Saved = () => {
  const navigate = useNavigate();
  const { savedItems } = useSaved();

  return (
    <div className="page-container saved-page">
      <header className="saved-header">
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1>Saved Items</h1>
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
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite fresh food to order them easily later.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>
      )}

      <BottomNav />
      <div className="bottom-spacer"></div>
    </div>
  );
};

export default Saved;

