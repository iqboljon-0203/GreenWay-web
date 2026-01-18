import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container confirmation-page">
      <div className="confirmation-content">
        <CheckCircle size={80} className="success-icon" />
        <h1>Order Confirmed!</h1>
        <p>Your order #12345 has been placed successfully.</p>
        
        <div className="order-details-card">
          <p>Estimated Delivery</p>
          <h3>Today, 18:00 - 19:00</h3>
        </div>

        <button className="btn btn-primary w-full" onClick={() => navigate('/order/12345')}>
          Track Order
        </button>
        <button className="btn btn-text mt-4" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
