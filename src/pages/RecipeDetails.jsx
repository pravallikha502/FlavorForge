import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Heart, 
  Clock, 
  Flame, 
  Users, 
  ChefHat, 
  Play, 
  CheckCircle2,
  Share2
} from 'lucide-react';
import recipeService from '../services/recipeService';
import { useFavorites } from '../context/FavoritesContext';
import { useShopping } from '../context/ShoppingContext';
import { toast } from 'react-hot-toast';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToList, setAddedToList] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToShoppingList } = useShopping();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      const data = await recipeService.getById(id);
      setRecipe(data);
      setLoading(false);
      window.scrollTo(0, 0);
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Recipe not found</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">Go Back Home</button>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        name: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`]
      });
    }
  }

  const favorited = isFavorite(recipe.idMeal);
  const videoId = recipe.strYoutube?.split('v=')[1];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors font-bold mb-8 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Image and Main Info */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[400px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl mb-8"
          >
            <img 
              src={recipe.strMealThumb} 
              alt={recipe.strMeal}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 flex gap-3">
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: recipe.strMeal, url: window.location.href });
                  }
                }}
                className="p-3 bg-white/90 dark:bg-black/40 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Share2 className="w-6 h-6 text-gray-700 dark:text-white" />
              </button>
              <button 
                onClick={() => toggleFavorite(recipe)}
                className="p-3 bg-white/90 dark:bg-black/40 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Heart className={`w-6 h-6 transition-colors ${favorited ? "fill-primary text-primary" : "text-gray-700 dark:text-white"}`} />
              </button>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-5 py-2 bg-primary/10 text-primary font-bold rounded-2xl text-sm uppercase tracking-wider">{recipe.strCategory}</span>
            <span className="px-5 py-2 bg-secondary/10 text-secondary font-bold rounded-2xl text-sm uppercase tracking-wider">{recipe.strArea}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-10 leading-tight">{recipe.strMeal}</h1>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass dark:glass-dark rounded-3xl mb-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-gray-400">Time</span>
              <span className="font-bold">45 Mins</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center border-l border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-yellow-600">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-gray-400">Calories</span>
              <span className="font-bold">450 Kcal</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center border-l border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-gray-400">Servings</span>
              <span className="font-bold">4 People</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center border-l border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-gray-400">Difficulty</span>
              <span className="font-bold">Medium</span>
            </div>
          </div>

          {/* Nutrition Summary (Mocked) */}
          <div className="flex gap-4 mb-12 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { label: 'Protein', value: '24g', color: 'bg-blue-500' },
              { label: 'Carbs', value: '52g', color: 'bg-orange-500' },
              { label: 'Fat', value: '18g', color: 'bg-yellow-500' },
              { label: 'Fiber', value: '8g', color: 'bg-green-500' }
            ].map((n, i) => (
              <div key={i} className="flex-shrink-0 px-6 py-3 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${n.color}`} />
                <span className="text-sm font-bold">{n.value}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400">{n.label}</span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              Cooking Instructions
            </h2>
            <div className="space-y-6">
              {recipe.strInstructions.split('\r\n').filter(s => s.trim().length > 0).map((step, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white dark:bg-gray-900 border-2 border-primary/20 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {idx + 1}
                  </div>
                  <p className="text-gray-600 dark:text-slate-200 leading-relaxed pt-2">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Video Integration */}
          {videoId && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                Watch Tutorial
              </h2>
              <div className="aspect-video rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-900">
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Ingredients & Tags */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-8">
            <div className="glass dark:glass-dark rounded-[40px] p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                Ingredients
                <span className="text-sm font-bold text-gray-400 ml-auto bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {ingredients.length} items
                </span>
              </h2>
              <ul className="space-y-4">
                {ingredients.map((ing, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between p-4 bg-white/50 dark:bg-black/20 rounded-2xl hover:bg-white dark:hover:bg-black/30 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <CheckCircle2 className="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-secondary transition-colors" />
                      <span className="font-semibold text-gray-700 dark:text-slate-100">{ing.name}</span>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 text-xs font-black rounded-lg">{ing.measure}</span>
                  </motion.li>
                ))}
              </ul>

              <button 
                onClick={() => {
                  addToShoppingList(ingredients);
                  setAddedToList(true);
                  toast.success('Ingredients added to shopping list!');
                  setTimeout(() => setAddedToList(false), 2000);
                }}
                className={`w-full mt-10 btn py-4 rounded-2xl shadow-xl transition-all ${addedToList ? 'bg-green-500 text-white' : 'btn-primary shadow-primary/40'}`}
              >
                {addedToList ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Added to List!
                  </>
                ) : (
                  'Add to Shopping List'
                )}
              </button>
            </div>

            {recipe.strTags && (
              <div className="glass dark:glass-dark rounded-[32px] p-8">
                <h3 className="text-lg font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.strTags.split(',').map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-xl">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
