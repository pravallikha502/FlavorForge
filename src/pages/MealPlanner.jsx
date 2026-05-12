import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, Search, X, Coffee, Utensils, Apple, Cookie, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import recipeService from '../services/recipeService';

const MealPlanner = () => {
  const [planner, setPlanner] = useState(() => {
    const saved = localStorage.getItem('flavorforge_planner_v2');
    return saved ? JSON.parse(saved) : {
      Monday: { Breakfast: [], Lunch: [], Snacks: [], Dinner: [], Dessert: [] },
      Tuesday: { Breakfast: [], Lunch: [], Snacks: [], Dinner: [], Dessert: [] },
      Wednesday: { Breakfast: [], Lunch: [], Snacks: [], Dinner: [], Dessert: [] },
      Thursday: { Breakfast: [], Lunch: [], Snacks: [], Dinner: [], Dessert: [] },
      Friday: { Breakfast: [], Lunch: [], Snacks: [], Dinner: [], Dessert: [] },
      Saturday: { Breakfast: [], Lunch: [], Snacks: [], Dinner: [], Dessert: [] },
      Sunday: { Breakfast: [], Lunch: [], Snacks: [], Dinner: [], Dessert: [] },
    };
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null); // { day, mealType }
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = [
    { id: 'Breakfast', icon: <Coffee className="w-4 h-4" /> },
    { id: 'Lunch', icon: <Utensils className="w-4 h-4" /> },
    { id: 'Snacks', icon: <Apple className="w-4 h-4" /> },
    { id: 'Dinner', icon: <Utensils className="w-4 h-4" /> },
    { id: 'Dessert', icon: <Cookie className="w-4 h-4" /> },
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      const delay = setTimeout(async () => {
        setSearching(true);
        const results = await recipeService.searchByName(searchQuery);
        setSearchResults(results.slice(0, 6));
        setSearching(false);
      }, 500);
      return () => clearTimeout(delay);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const addToPlanner = (recipe) => {
    if (!activeSlot) return;
    const { day, mealType } = activeSlot;
    const currentMeals = planner[day][mealType] || [];
    if (currentMeals.find(m => m.idMeal === recipe.idMeal)) return;
    
    const newPlanner = { 
      ...planner, 
      [day]: { ...planner[day], [mealType]: [...currentMeals, recipe] } 
    };
    setPlanner(newPlanner);
    localStorage.setItem('flavorforge_planner_v2', JSON.stringify(newPlanner));
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const removeFromPlanner = (day, mealType, recipeId) => {
    const newPlanner = { 
      ...planner, 
      [day]: { ...planner[day], [mealType]: planner[day][mealType].filter(r => r.idMeal !== recipeId) } 
    };
    setPlanner(newPlanner);
    localStorage.setItem('flavorforge_planner_v2', JSON.stringify(newPlanner));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-4">
            Weekly <span className="text-primary">Planner</span>
            <Calendar className="text-primary w-8 h-8" />
          </h1>
          <p className="text-gray-500 dark:text-slate-400 font-medium">
            Search and add any recipe directly to your daily plan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
        {days.map((day) => (
          <div key={day} className="flex flex-col gap-4">
            <div className="p-4 bg-primary text-white rounded-2xl font-black text-center shadow-lg shadow-primary/20 text-sm uppercase tracking-widest">
              {day}
            </div>
            
            {mealTypes.map((meal) => (
              <div key={meal.id} className="glass dark:glass-dark rounded-3xl p-5 min-h-[140px] flex flex-col border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 group relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest flex items-center gap-2">
                    {meal.icon}
                    {meal.id}
                  </span>
                  <button 
                    onClick={() => {
                      setActiveSlot({ day, mealType: meal.id });
                      setIsSearchOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-400 hover:text-primary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3 flex-grow">
                  <AnimatePresence>
                    {planner[day][meal.id]?.map((recipe) => (
                      <motion.div 
                        key={recipe.idMeal}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-3 p-2 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white dark:border-slate-700 shadow-sm group/item"
                      >
                        <img src={recipe.strMealThumb} className="w-10 h-10 object-cover rounded-xl" alt="" />
                        <p className="text-[10px] font-bold line-clamp-2 leading-tight flex-grow">{recipe.strMeal}</p>
                        <button 
                          onClick={() => removeFromPlanner(day, meal.id, recipe.idMeal)}
                          className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {(!planner[day][meal.id] || planner[day][meal.id].length === 0) && (
                    <div className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-gray-50 dark:border-slate-800 rounded-2xl opacity-40">
                      <Plus className="w-6 h-6 text-gray-300 mb-1" />
                      <span className="text-[8px] font-black uppercase text-gray-400">Empty</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Search & Add Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl glass dark:glass-dark rounded-[40px] p-8 md:p-10 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black flex items-center gap-3">
                  <Search className="text-primary" />
                  Add to {activeSlot?.day} {activeSlot?.mealType}
                </h2>
                <button onClick={() => setIsSearchOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative mb-8">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search any recipe (e.g. Pasta, Burger)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border-none outline-none focus:ring-2 ring-primary/20 font-bold text-dark dark:text-white placeholder-gray-400 dark:placeholder-slate-500 shadow-inner"
                />
                {searching && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-primary" />}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {searchResults.map((recipe) => (
                  <motion.div 
                    key={recipe.idMeal}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 group cursor-pointer"
                    onClick={() => addToPlanner(recipe)}
                  >
                    <img src={recipe.strMealThumb} className="w-16 h-16 object-cover rounded-xl" alt="" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-xs line-clamp-2 mb-1 group-hover:text-primary transition-colors">{recipe.strMeal}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-black uppercase text-gray-400 bg-gray-100 dark:bg-slate-900 px-2 py-0.5 rounded-md">{recipe.strCategory}</span>
                        <Plus className="w-3 h-3 text-primary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {searchQuery.length > 2 && !searching && searchResults.length === 0 && (
                  <div className="col-span-full py-10 text-center text-gray-400 font-bold">
                    No recipes found. Try another search!
                  </div>
                )}
                
                {searchQuery.length <= 2 && (
                  <div className="col-span-full py-10 text-center">
                    <Sparkles className="w-10 h-10 text-primary/20 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold text-sm">Type to search thousands of recipes...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MealPlanner;
