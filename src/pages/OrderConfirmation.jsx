import { CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();

  return (
    <div className="page-container confirmation-page">
      <div className="confirmation-content">
        <CheckCircle size={80} className="success-icon" />
        <h1>{t('orderNow') === 'Order Now' ? 'Order Confirmed!' : (t('orderNow') === 'Hozir buyurtma bering' ? 'Buyurtmangiz qabul qilindi!' : 'Order Confirmed!')}</h1>
        <p>Your order #{id} has been placed successfully.</p>
        
        <div className="order-details-card">
          <p>{t('harvested') === 'Harvested' ? 'Estimated Delivery' : (t('harvested') === 'Yig’ilgan vaqti' ? 'Yetkazib berish vaqti' : 'Estimated Delivery')}</p>
          <h3>Today, 18:00 - 19:00</h3>
        </div>

        <button className="btn btn-primary w-full" onClick={() => navigate(`/order/${id}`)}>
          {t('history') === 'Orders' ? 'Track Order' : (t('history') === 'Buyurtmalar' ? 'Kuryerni kuzatish' : 'Track Order')}
        </button>
        <button className="btn btn-text mt-4" onClick={() => navigate('/')}>
          {t('home')}
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
