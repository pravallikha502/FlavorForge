import React, { createContext, useContext, useState, useEffect } from 'react';

const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('flavorforge_shopping_list');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('flavorforge_shopping_list', JSON.stringify(shoppingList));
  }, [shoppingList]);

  const addToShoppingList = (ingredients) => {
    setShoppingList(prev => {
      const newList = [...prev];
      ingredients.forEach(ing => {
        const exists = newList.find(item => item.name.toLowerCase() === ing.name.toLowerCase());
        if (exists) {
          // Simplistic merging: just keep both or combine measures if possible
          // For now, just add as new if not exact same
          newList.push(ing);
        } else {
          newList.push(ing);
        }
      });
      return newList;
    });
  };

  const removeFromShoppingList = (index) => {
    setShoppingList(prev => prev.filter((_, i) => i !== index));
  };

  const clearShoppingList = () => setShoppingList([]);

  return (
    <ShoppingContext.Provider value={{ shoppingList, addToShoppingList, removeFromShoppingList, clearShoppingList }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
};
