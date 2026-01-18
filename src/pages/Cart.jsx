import { ArrowLeft, Trash2, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty, cartSubtotal } = useCart();

  const delivery = 2.00;
  const total = cartSubtotal + delivery;

  return (
    <div className="page-container cart-page">
      <header className="cart-header">
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1>My Cart</h1>
        <div style={{ width: 40 }} /> {/* Spacer */}
      </header>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Start Shopping</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <div className="cart-controls">
                    <span className="item-price">${item.price.toFixed(2)}</span>
                    <div className="qty-control-sm">
                      <button onClick={() => updateQty(item.id, -1)}><Minus size={14} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>${delivery.toFixed(2)}</span>
            </div>
            <div className="divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <button className="btn btn-primary w-full mt-4" onClick={() => navigate('/checkout')}>
               Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

