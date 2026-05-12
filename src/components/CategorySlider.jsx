import React from 'react';
import { motion } from 'framer-motion';

const CategorySlider = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide px-2">
      <motion.button 
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange('All')}
        className={`px-8 py-3 rounded-2xl whitespace-nowrap font-bold transition-all text-sm shadow-sm border-2
          ${activeCategory === 'All' 
            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25 scale-105' 
            : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/30'}`}
      >
        All Recipes
      </motion.button>
      {categories.map((cat) => (
        <motion.button 
          key={cat.idCategory}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(cat.strCategory)}
          className={`px-8 py-3 rounded-2xl whitespace-nowrap font-bold transition-all text-sm shadow-sm border-2
            ${activeCategory === cat.strCategory 
              ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25 scale-105' 
              : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/30'}`}
        >
          {cat.strCategory}
        </motion.button>
      ))}
    </div>
  );
};

export default CategorySlider;
