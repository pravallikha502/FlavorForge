import React from 'react';
import { motion } from 'framer-motion';

const CategorySlider = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
      <button 
        onClick={() => onCategoryChange('All')}
        className={`px-6 py-2.5 rounded-full whitespace-nowrap font-bold transition-all text-sm shadow-sm
          ${activeCategory === 'All' 
            ? 'bg-primary text-white shadow-primary/30 scale-105' 
            : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:bg-gray-50'}`}
      >
        All Recipes
      </button>
      {categories.map((cat) => (
        <button 
          key={cat.idCategory}
          onClick={() => onCategoryChange(cat.strCategory)}
          className={`px-6 py-2.5 rounded-full whitespace-nowrap font-bold transition-all text-sm shadow-sm
            ${activeCategory === cat.strCategory 
              ? 'bg-primary text-white shadow-primary/30 scale-105' 
              : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:bg-gray-50'}`}
        >
          {cat.strCategory}
        </button>
      ))}
    </div>
  );
};

export default CategorySlider;
