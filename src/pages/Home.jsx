import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import CategorySlider from '../components/CategorySlider';
import AIRecipeGenerator from '../components/AIRecipeGenerator';
import recipeService from '../services/recipeService';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, TrendingUp, Search as SearchIcon, Sparkles } from 'lucide-react';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const [cats, trending, random] = await Promise.all([
        recipeService.listCategories(),
        recipeService.getTrending(),
        recipeService.getRandom()
      ]);
      setCategories(cats);
      setRecipes(trending);
      setFeatured(random);
      setLoading(false);
    };
    init();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    setActiveCategory('Search Results');
    const results = await recipeService.searchByName(query);
    setRecipes(results);
    setLoading(false);
  };

  const handleCategoryChange = async (category) => {
    setLoading(true);
    setActiveCategory(category);
    if (category === 'All') {
      const trending = await recipeService.getTrending();
      setRecipes(trending);
    } else {
      const results = await recipeService.getByCategory(category);
      setRecipes(results);
    }
    setLoading(false);
  };

  const handleLoadMore = async () => {
    setLoading(true);
    const more = await recipeService.getTrending();
    setRecipes([...recipes, ...more]);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Fuel Your <span className="text-primary">Passion</span> For Cooking.
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-lg">
              Explore over 10,000 hand-picked recipes from around the world. Filter by ingredients, cuisines, and categories to find your next favorite meal.
            </p>
            <SearchBar onSearch={handleSearch} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[400px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl shadow-primary/20 bg-gray-100 dark:bg-slate-900"
          >
            {loading ? (
              <div className="w-full h-full shimmer flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-primary/20" />
              </div>
            ) : featured && (
              <>
                <img 
                  src={featured.strMealThumb} 
                  className="w-full h-full object-cover transition-opacity duration-300 ease-in-out" 
                  alt={featured.strMeal}
                  fetchPriority="high"
                  loading="eager"
                  onLoad={(e) => e.target.style.opacity = 1}
                  style={{ opacity: 0 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                  <span className="px-4 py-1.5 bg-accent text-dark font-black text-xs rounded-full w-fit mb-4 uppercase tracking-widest">
                    Featured Dish
                  </span>
                  <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{featured.strMeal}</h2>
                  <div className="flex gap-6 text-white/80 text-sm font-medium">
                    <span className="flex items-center gap-2"><ChefHat className="w-4 h-4" /> {featured.strCategory}</span>
                    <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> {featured.strArea}</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <SearchIcon className="text-primary w-6 h-6" />
            Browse by Category
          </h2>
        </div>
        <CategorySlider 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
      </section>

      {/* AI Suggestion Section */}
      <AIRecipeGenerator />

      {/* Recipes Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3 capitalize">
            {activeCategory === 'All' ? <TrendingUp className="text-primary w-6 h-6" /> : <ChefHat className="text-primary w-6 h-6" />}
            {activeCategory === 'All' ? 'Trending Recipes' : `${activeCategory} Recipes`}
          </h2>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{recipes.length} Results</p>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-900 h-[350px] rounded-3xl animate-pulse" />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <h3 className="text-2xl font-bold text-gray-400">No recipes found. Try searching for something else!</h3>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && recipes.length > 0 && (
          <div className="mt-16 text-center">
            <button 
              onClick={handleLoadMore}
              className="btn btn-primary px-12 py-4 rounded-2xl text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Explore More Delicious Recipes
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
