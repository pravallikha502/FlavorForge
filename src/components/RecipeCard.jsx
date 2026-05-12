import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Flame, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const RecipeCard = ({ recipe }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(recipe.idMeal);

  // Mock data for prep time and calories as TheMealDB doesn't provide them
  const prepTime = Math.floor(Math.random() * 30) + 15;
  const calories = Math.floor(Math.random() * 500) + 200;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="glass dark:glass-dark rounded-3xl overflow-hidden group relative"
    >
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(recipe);
        }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md shadow-lg transition-transform active:scale-90"
      >
        <Heart className={`w-5 h-5 transition-colors ${favorited ? "fill-primary text-primary" : "text-gray-600 dark:text-gray-300"}`} />
      </button>

      <Link to={`/recipe/${recipe.idMeal}`}>
        <div className="relative h-60 overflow-hidden">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <PlayCircle className="text-white w-12 h-12" />
          </div>
          <div className="absolute bottom-3 left-3 flex gap-2">
            <span className="px-3 py-1 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              {recipe.strCategory}
            </span>
            <span className="px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md text-dark dark:text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              {recipe.strArea}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold line-clamp-1 mb-3 group-hover:text-primary transition-colors">
            {recipe.strMeal}
          </h3>
          
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-secondary" />
              <span>{prepTime} mins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-primary" />
              <span>{calories} kcal</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
