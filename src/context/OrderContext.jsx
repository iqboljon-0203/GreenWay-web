import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('greenway_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('greenway_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      status: 'In Progress'
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      getOrderById 
    }}>
      {children}
    </OrderContext.Provider>
  );
};
