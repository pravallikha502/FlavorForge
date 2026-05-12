import React, { useState } from 'react';
import { Calendar, Plus, Trash2, ChevronLeft, ChevronRight, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const MealPlanner = () => {
  const { favorites } = useFavorites();
  const [planner, setPlanner] = useState(() => {
    const saved = localStorage.getItem('flavorforge_planner');
    return saved ? JSON.parse(saved) : {
      Monday: { breakfast: null, lunch: null, dinner: null },
      Tuesday: { breakfast: null, lunch: null, dinner: null },
      Wednesday: { breakfast: null, lunch: null, dinner: null },
      Thursday: { breakfast: null, lunch: null, dinner: null },
      Friday: { breakfast: null, lunch: null, dinner: null },
      Saturday: { breakfast: null, lunch: null, dinner: null },
      Sunday: { breakfast: null, lunch: null, dinner: null },
    };
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['breakfast', 'lunch', 'dinner'];

  const addToPlanner = (day, mealType, recipe) => {
    const newPlanner = { ...planner, [day]: { ...planner[day], [mealType]: recipe } };
    setPlanner(newPlanner);
    localStorage.setItem('flavorforge_planner', JSON.stringify(newPlanner));
  };

  const removeFromPlanner = (day, mealType) => {
    const newPlanner = { ...planner, [day]: { ...planner[day], [mealType]: null } };
    setPlanner(newPlanner);
    localStorage.setItem('flavorforge_planner', JSON.stringify(newPlanner));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-4">
            Weekly <span className="text-primary">Planner</span>
            <Calendar className="text-primary w-8 h-8" />
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Schedule your meals for the week using your favorite recipes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {days.map((day) => (
          <div key={day} className="flex flex-col gap-4">
            <div className="p-4 bg-primary text-white rounded-2xl font-black text-center shadow-lg shadow-primary/20">
              {day}
            </div>
            
            {meals.map((meal) => (
              <div key={meal} className="glass dark:glass-dark rounded-2xl p-4 min-h-[120px] flex flex-col justify-between group relative overflow-hidden">
                <span className="text-[10px] uppercase font-black text-gray-400 mb-2 tracking-widest">{meal}</span>
                
                {planner[day][meal] ? (
                  <div className="relative z-10">
                    <img 
                      src={planner[day][meal].strMealThumb} 
                      className="w-full h-20 object-cover rounded-xl mb-2" 
                      alt="" 
                    />
                    <p className="text-xs font-bold line-clamp-1">{planner[day][meal].strMeal}</p>
                    <button 
                      onClick={() => removeFromPlanner(day, meal)}
                      className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl">
                    {favorites.length > 0 ? (
                      <div className="relative w-full h-full">
                        <select 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => {
                            const recipe = favorites.find(f => f.idMeal === e.target.value);
                            if (recipe) addToPlanner(day, meal, recipe);
                          }}
                        >
                          <option value="">Add</option>
                          {favorites.map(f => (
                            <option key={f.idMeal} value={f.idMeal}>{f.strMeal}</option>
                          ))}
                        </select>
                        <div className="flex flex-col items-center justify-center h-full text-gray-300">
                          <Plus className="w-6 h-6" />
                        </div>
                      </div>
                    ) : (
                      <Link to="/" className="text-gray-300 hover:text-primary transition-colors">
                        <Plus className="w-6 h-6" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="mt-12 p-8 bg-accent/10 rounded-[32px] border border-accent/20 text-center">
          <p className="font-bold text-gray-600 mb-4">You need to favorite some recipes first to add them to your planner!</p>
          <Link to="/" className="btn btn-primary inline-flex">Explore Recipes</Link>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
