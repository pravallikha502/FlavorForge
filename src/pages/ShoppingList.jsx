import React from 'react';
import { useShopping } from '../context/ShoppingContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, CheckCircle2, ArrowRight, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShoppingList = () => {
  const { shoppingList, removeFromShoppingList, clearShoppingList } = useShopping();

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12 min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-4">
            Shopping <span className="text-secondary">List</span>
            <ShoppingCart className="text-secondary w-8 h-8" />
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Manage your ingredients and prepare for your next culinary masterpiece.
          </p>
        </div>

        {shoppingList.length > 0 && (
          <div className="flex gap-3">
            <button 
              onClick={() => window.print()}
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 transition-colors"
              title="Print List"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button 
              onClick={clearShoppingList}
              className="btn bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all px-6 py-3 rounded-2xl font-bold flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {shoppingList.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 dark:bg-gray-900/50 rounded-[40px] border-2 border-dashed border-gray-200 dark:border-gray-800"
          >
            <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-8">
              <ShoppingCart className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your list is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md">
              Add ingredients from any recipe detail page to keep track of what you need to buy.
            </p>
            <Link to="/" className="btn btn-primary px-10 py-4 text-lg">
              Explore Recipes
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {shoppingList.map((item, idx) => (
              <motion.div 
                key={`${item.name}-${idx}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass dark:glass-dark p-5 rounded-2xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-6 h-6 rounded-full border-2 border-secondary/30 flex items-center justify-center group-hover:border-secondary transition-colors cursor-pointer">
                    <div className="w-3 h-3 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">{item.measure}</span>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromShoppingList(idx)}
                  className="p-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
            
            <div className="mt-12 p-8 bg-primary/5 rounded-[32px] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">All set?</h4>
                  <p className="text-gray-500 text-sm">You have {shoppingList.length} items ready for your next meal.</p>
                </div>
              </div>
              <Link to="/" className="btn btn-primary px-8 py-4">
                Find More Ingredients
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShoppingList;
