import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Components
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderTracking from './pages/OrderTracking';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import Saved from './pages/Saved';
import { CartProvider } from './context/CartContext';
import { SavedProvider } from './context/SavedContext';
import { OrderProvider } from './context/OrderContext';
import { LanguageProvider } from './context/LanguageContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <SavedProvider>
        <CartProvider>
          <OrderProvider>
            <Router>
              <ScrollToTop />
              <div className="app-container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/category/:slug" element={<Category />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/order/:id" element={<OrderTracking />} />
                  <Route path="/history" element={<OrderHistory />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/saved" element={<Saved />} />
                </Routes>
              </div>
            </Router>
          </OrderProvider>
        </CartProvider>
      </SavedProvider>
    </LanguageProvider>
  );
}

export default App;
