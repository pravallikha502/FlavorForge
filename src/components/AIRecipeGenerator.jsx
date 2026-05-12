import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import recipeService from '../services/recipeService';
import RecipeCard from './RecipeCard';

const AIRecipeGenerator = () => {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const generateRecipe = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
    
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Use the first ingredient to search for a recipe
    const mainIng = ingredients.split(',')[0].trim();
    const results = await recipeService.searchByName(mainIng);
    
    if (results.length > 0) {
      // Pick a random one from results to simulate "generation"
      setSuggestion(results[Math.floor(Math.random() * results.length)]);
    } else {
      // Fallback to random if no match
      const random = await recipeService.getRandom();
      setSuggestion(random);
    }
    
    setLoading(false);
  };

  return (
    <section className="glass dark:glass-dark rounded-[40px] p-8 md:p-12 mb-16 overflow-hidden relative border-none">
      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
        <Sparkles className="w-40 h-40 text-primary" />
      </div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Discovery
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            What's in your <span className="text-primary">fridge?</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
            Enter the ingredients you have on hand, and our AI will suggest the perfect meal for you to cook right now.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input 
                type="text" 
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g. Chicken, Tomato, Garlic"
                className="w-full px-6 py-4 rounded-2xl bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-primary/20 outline-none transition-all font-medium pr-12"
              />
              <Wand2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button 
              onClick={generateRecipe}
              disabled={loading}
              className="btn btn-primary px-8 py-4 whitespace-nowrap disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Suggest Meal'}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {suggestion ? (
            <motion.div 
              key={suggestion.idMeal}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="max-w-sm mx-auto w-full"
            >
              <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">AI Recommended For You</p>
              <RecipeCard recipe={suggestion} />
            </motion.div>
          ) : (
            <div className="hidden lg:flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary/30 mx-auto mb-4 border-2 border-dashed border-primary/20">
                  <Wand2 className="w-10 h-10" />
                </div>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Awaiting ingredients...</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AIRecipeGenerator;
