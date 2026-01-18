import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useSaved } from '../context/SavedContext';
import { ArrowLeft, Minus, Plus, Heart, MapPin, Clock, Star } from 'lucide-react';

import './ProductDetail.css';


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleSave, isProductSaved } = useSaved();
  const [quantity, setQuantity] = useState(1);

  
  // Mock Product Data
  const product = {
    id: parseInt(id),
    name: 'Organic Spinach',
    price: 2.50,
    unit: 'bundle',
    description: 'Fresh organic spinach harvested locally. Rich in iron and vitamins. Perfect for salads and smoothies.',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 124,
    source: 'Green Valley Farm',
    harvestTime: 'Today, 6:00 AM',
    calories: '23 kcal/100g'
  };

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: show feedback or navigate
    navigate('/cart');
  };

  return (
    <div className="page-container product-detail-page">
      <header className="detail-header">
        <button className="icon-btn back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <button 
          className={`icon-btn detail-save-btn ${isProductSaved(product.id) ? 'active' : ''}`}
          onClick={() => toggleSave(product)}
        >
          <Heart size={24} fill={isProductSaved(product.id) ? "#EF4444" : "none"} color={isProductSaved(product.id) ? "#EF4444" : "currentColor"} />
        </button>
      </header>


      <div className="product-image-large">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="detail-content">
        <div className="title-row">
          <h1>{product.name}</h1>
          <div className="rating-badge">
            <Star size={14} fill="#F59E0B" stroke="none" />
            <span>{product.rating}</span>
          </div>
        </div>

        <div className="price-info">
          <span className="current-price">${product.price.toFixed(2)}</span>
          <span className="per-unit"> / {product.unit}</span>
        </div>

        <div className="info-cards">
          <div className="info-card">
            <MapPin size={18} className="text-primary" />
            <div>
              <span className="label">Source</span>
              <span className="value">{product.source}</span>
            </div>
          </div>
          <div className="info-card">
            <Clock size={18} className="text-primary" />
            <div>
              <span className="label">Harvested</span>
              <span className="value">{product.harvestTime}</span>
            </div>
          </div>
        </div>

        <div className="description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="action-bar">
        <div className="qty-selector">
          <button onClick={decrement} className="qty-btn"><Minus size={20} /></button>
          <span className="qty-val">{quantity}</span>
          <button onClick={increment} className="qty-btn"><Plus size={20} /></button>
        </div>
        
        <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
          <span>Add to Cart</span>
          <span className="btn-separator">|</span>
          <span>${(product.price * quantity).toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

