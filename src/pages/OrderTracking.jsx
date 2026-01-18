import { ArrowLeft, Phone, MessageSquare, ShoppingBag, MapPin, Truck, Clock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import './OrderTracking.css';

// Custom Marker for Courier
const courierIcon = L.divIcon({
  className: 'custom-courier-icon',
  html: `<div class="courier-marker"><svg viewBox="0 0 24 24" width="24" height="24" fill="white" stroke="currentColor" stroke-width="2"><path d="M10 17h4V5H2v12h3m1 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0m10 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M14 7h10l-4 6H14V7Z"/></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Custom Marker for Destination
const destinationIcon = L.divIcon({
  className: 'custom-dest-icon',
  html: `<div class="dest-marker"><svg viewBox="0 0 24 24" width="24" height="24" fill="white" stroke="#22C55E" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const OrderTracking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getOrderById } = useOrders();
  const { t } = useLanguage();

  const order = getOrderById(id);

  // Tashkent Coordinates
  const courierPos = [41.311081, 69.240562];
  const destPos = [41.321081, 69.260562];

  if (!order) {
    return (
      <div className="page-container tracking-page">
         <header className="tracking-header">
           <button className="icon-btn" onClick={() => navigate('/')}>
             <ArrowLeft size={24} />
           </button>
           <h1>{t('history')}</h1>
         </header>
         <div className="empty-history" style={{ marginTop: '100px' }}>
           <h2>{t('noResults')}</h2>
           <button className="btn btn-primary" onClick={() => navigate('/')}>{t('home')}</button>
         </div>
      </div>
    );
  }

  const STEPS = [
    { title: t('home') === 'Home' ? 'Order Accepted' : (t('home') === 'Asosiy' ? 'Buyurtma qabul qilindi' : 'Order Accepted'), time: '10:30', completed: true },
    { title: t('home') === 'Home' ? 'Preparing' : (t('home') === 'Asosiy' ? 'Tayyorlanmoqda' : 'Preparing'), time: '10:35', completed: true },
    { title: t('home') === 'Home' ? 'On the way' : (t('home') === 'Asosiy' ? 'Yo’lda' : 'On the way'), time: '10:50', completed: true, active: true },
    { title: t('home') === 'Home' ? 'Delivered' : (t('home') === 'Asosiy' ? 'Yetkazildi' : 'Delivered'), time: 'Est 11:10', completed: false },
  ];

  return (
    <div className="page-container tracking-page">
      <header className="tracking-header">
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <div className="header-order-badge">
          {t('history')} #{order.id}
        </div>
        <div style={{ width: 44 }}></div>
      </header>

      <div className="map-view-container">
        <MapContainer 
          center={courierPos} 
          zoom={14} 
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <Circle 
            center={destPos} 
            radius={200} 
            pathOptions={{ fillColor: '#22C55E', color: '#22C55E', fillOpacity: 0.1 }} 
          />
          <Marker position={destPos} icon={destinationIcon}>
            <Popup>Your Delivery Address</Popup>
          </Marker>
          <Marker position={courierPos} icon={courierIcon}>
            <Popup>Courier is here</Popup>
          </Marker>
        </MapContainer>

        <div className="map-overlay-info">
           <div className="time-badge">
              <Clock size={16} />
              <span>12 mins away</span>
           </div>
        </div>
      </div>

      <div className="tracking-sheet">
         <div className="sheet-handle"></div>
         <div className="sheet-top">
           <h2>Track Your Order</h2>
           <div className="order-items-minimal">
             {order.items?.length} items • ${order.total.toFixed(2)}
           </div>
         </div>
         
         <div className="courier-card">
           <div className="courier-avatar">
             <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop" alt="Courier" />
           </div>
           <div className="courier-info">
             <h3>Azizbek R.</h3>
             <p>Certified Courier • 4.9 ★</p>
           </div>
           <div className="courier-actions">
             <button className="action-circle"><Phone size={20} /></button>
             <button className="action-circle"><MessageSquare size={20} /></button>
           </div>
         </div>

         <div className="timeline">
           {STEPS.map((step, index) => (
             <div key={index} className={`timeline-item ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}`}>
               <div className="timeline-dot"></div>
               <div className="timeline-content">
                 <h3>{step.title}</h3>
                 <p>{step.time}</p>
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default OrderTracking;

