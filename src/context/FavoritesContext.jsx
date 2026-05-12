import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('flavorforge_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('flavorforge_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe) => {
    setFavorites(prev => {
      const isExist = prev.find(item => item.idMeal === recipe.idMeal);
      if (isExist) {
        toast.error(`${recipe.strMeal} removed from favorites`);
        return prev.filter(item => item.idMeal !== recipe.idMeal);
      } else {
        toast.success(`${recipe.strMeal} added to favorites!`);
        return [...prev, recipe];
      }
    });
  };

  const isFavorite = (id) => {
    return favorites.some(item => item.idMeal === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
