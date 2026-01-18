import { ArrowLeft, Clock, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useOrders } from '../context/OrderContext';
import './OrderHistory.css';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();

  return (
    <div className="page-container history-page">
      <header className="history-header">
        <h1>My Orders</h1>
      </header>

      {orders.length === 0 ? (
        <div className="empty-history">
          <div className="empty-icon-circle">
            <ShoppingBag size={48} />
          </div>
          <h2>No orders yet</h2>
          <p>Your order history is empty. Start shopping to see your orders here!</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Explore Products
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
      
      <BottomNav />
    </div>
  );
};

export default OrderHistory;

