import { ArrowLeft, MapPin, Clock, CreditCard, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { t } = useLanguage();

  const delivery = 2.00;
  const total = cartSubtotal + delivery;

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return;

    const newOrder = addOrder({
      items: cartItems,
      subtotal: cartSubtotal,
      delivery: delivery,
      total: total,
    });

    clearCart();
    navigate(`/order-confirmation/${newOrder.id}`);
  };

  return (
    <div className="page-container checkout-page">
      <header className="checkout-header">
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1>{t('checkout')}</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className="section">
        <h2>Delivery Address</h2>
        <div className="card selection-card">
          <div className="icon-box"><MapPin size={20} /></div>
          <div className="card-content">
            <span className="label">Home</span>
            <span className="value">123 Green Street, Tashkent</span>
          </div>
          <ChevronRight size={20} className="chevron" />
        </div>
      </div>

      <div className="section">
        <h2>Delivery Time</h2>
        <div className="card selection-card">
          <div className="icon-box"><Clock size={20} /></div>
          <div className="card-content">
            <span className="label">Today</span>
            <span className="value">18:00 - 19:00</span>
          </div>
          <ChevronRight size={20} className="chevron" />
        </div>
      </div>

      <div className="section">
        <h2>Payment Method</h2>
        <div className="card selection-card">
          <div className="icon-box"><CreditCard size={20} /></div>
          <div className="card-content">
            <span className="label">Cash on Delivery</span>
            <span className="value">Pay when you receive</span>
          </div>
          <ChevronRight size={20} className="chevron" />
        </div>
      </div>

      <div className="section">
        <h2>{t('featured') === 'Featured Fresh' ? 'Order Summary' : (t('featured') === 'Saralangan mahsulotlar' ? 'Buyurtma xulosasi' : 'Order Summary')}</h2>
        <div className="summary-card">
          <div className="row">
            <span>Items ({cartItems.length})</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>
          <div className="row">
            <span>Delivery</span>
            <span>${delivery.toFixed(2)}</span>
          </div>
          <div className="divider"></div>
          <div className="row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button 
        className="btn btn-primary w-full confirm-btn" 
        onClick={handleConfirmOrder}
        disabled={cartItems.length === 0}
      >
        {t('orderNow')}
      </button>
    </div>
  );
};

export default Checkout;

