import { Plus, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSaved } from '../context/SavedContext';
import { useLanguage } from '../context/LanguageContext';
import './ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleSave, isProductSaved } = useSaved();
  const { t } = useLanguage();

  const saved = isProductSaved(product.id);

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-img-container">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.discount && <span className="discount-tag">{product.discount}</span>}
        <button 
          className={`save-btn ${saved ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleSave(product);
          }}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="product-info">
        <h3>{product.nameKey ? t(product.nameKey) : product.name}</h3>
        <p className="unit">1 {product.unitKey ? t(product.unitKey) : product.unit}</p>
        <div className="price-row">
          <span className="price">${product.price.toFixed(2)}</span>
          <button 
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
              navigate('/cart');
            }}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

