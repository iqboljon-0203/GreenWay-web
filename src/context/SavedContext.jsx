import React, { createContext, useContext, useState, useEffect } from 'react';

const SavedContext = createContext();

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider');
  }
  return context;
};

export const SavedProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState(() => {
    const saved = localStorage.getItem('greenway_saved');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('greenway_saved', JSON.stringify(savedItems));
  }, [savedItems]);

  const toggleSave = (product) => {
    setSavedItems(prevItems => {
      const isSaved = prevItems.find(item => item.id === product.id);
      if (isSaved) {
        return prevItems.filter(item => item.id !== product.id);
      }
      return [...prevItems, product];
    });
  };

  const isProductSaved = (productId) => {
    return savedItems.some(item => item.id === productId);
  };

  return (
    <SavedContext.Provider value={{ 
      savedItems, 
      toggleSave, 
      isProductSaved 
    }}>
      {children}
    </SavedContext.Provider>
  );
};
