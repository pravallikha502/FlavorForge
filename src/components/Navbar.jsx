import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sun, Moon, Search, ShoppingCart, Calendar, Settings } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useShopping } from '../context/ShoppingContext';
import { useTheme } from '../context/ThemeContext';
import SettingsModal from './SettingsModal';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { favorites } = useFavorites();
  const { shoppingList } = useShopping();
  const { currentTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  return (
    <nav className="glass sticky top-0 z-50 px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300 dark:glass-dark">
      <Link to="/" className="text-2xl font-black text-primary tracking-tighter flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
          FF
        </div>
        <span className="hidden sm:inline">Flavor<span className={currentTheme === 'dark' ? "text-white" : "text-dark"}>Forge</span></span>
      </Link>

      <div className="flex gap-4 md:gap-8 items-center">
        <Link to="/" className="font-semibold hover:text-primary transition-colors text-sm uppercase tracking-wider">
          Home
        </Link>
        <Link to="/favorites" className="relative group p-2">
          <Heart className={`w-6 h-6 transition-colors ${favorites.length > 0 ? "fill-primary text-primary" : "hover:text-primary"}`} />
          {favorites.length > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md"
            >
              {favorites.length}
            </motion.span>
          )}
        </Link>

        <Link to="/shopping-list" className="relative group p-2">
          <ShoppingCart className={`w-6 h-6 transition-colors ${shoppingList.length > 0 ? "text-secondary" : "hover:text-secondary"}`} />
          {shoppingList.length > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md"
            >
              {shoppingList.length}
            </motion.span>
          )}
        </Link>

        <Link to="/planner" className="p-2 hover:text-primary transition-colors">
          <Calendar className="w-6 h-6" />
        </Link>
        
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
        >
          <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
