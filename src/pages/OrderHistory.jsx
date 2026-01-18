import { ArrowLeft, Clock, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';
import './OrderHistory.css';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const { t } = useLanguage();

  return (
    <div className="page-container history-page">
      <header className="history-header">
        <h1>{t('history')}</h1>
      </header>

      {orders.length === 0 ? (
        <div className="empty-history">
          <div className="empty-icon-circle">
            <ShoppingBag size={48} />
          </div>
          <h2>{t('noResults')}</h2>
          <p>{t('history')} {t('noResults').toLowerCase()}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
             {t('orderNow')}
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card" onClick={() => navigate(`/order/${order.id}`)}>
               <div className="order-icon">
                 <Clock size={24} />
               </div>
               <div className="order-info">
                 <h3>Order #{order.id}</h3>
                 <p>{order.date}</p>
                 <p className="order-items-count">{order.items?.length || 0} items</p>
               </div>
               <div className="order-status-col">
                 <span className="order-price">${order.total.toFixed(2)}</span>
                 <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                   {order.status}
                 </span>
               </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="bottom-spacer"></div>
      <BottomNav />
    </div>
  );
};

export default OrderHistory;

