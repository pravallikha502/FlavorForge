import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, ArrowRight } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-4">
            My <span className="text-primary">Favorites</span>
            <Heart className="fill-primary text-primary w-8 h-8" />
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            You have saved {favorites.length} recipes to your collection.
          </p>
        </div>
        
        {favorites.length > 0 && (
          <Link to="/" className="btn bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-all group">
            Find More Recipes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      <AnimatePresence mode="wait">
        {favorites.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8">
              <Heart className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold mb-4">No favorites yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md">
              Start exploring our collection and click the heart icon on any recipe to save it here for later.
            </p>
            <Link to="/" className="btn btn-primary px-10 py-4 text-lg">
              Start Exploring
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Favorites;
