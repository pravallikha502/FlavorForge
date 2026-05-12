import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SettingsModal = ({ isOpen, onClose }) => {
  const { currentTheme, changeTheme, themes } = useTheme();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md glass dark:glass-dark rounded-[32px] p-8 shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Palette className="text-primary" />
              Settings
            </h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
            Switch between Light and Dark modes to customize your viewing experience.
          </p>

          <div className="space-y-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => changeTheme(theme.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all group
                  ${currentTheme === theme.id 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-transparent bg-gray-50 dark:bg-gray-900/50 hover:border-gray-200'}`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-xl shadow-inner border border-white/20"
                    style={{ backgroundColor: theme.bg }}
                  >
                    <div 
                      className="w-full h-1/2 rounded-t-xl" 
                      style={{ backgroundColor: theme.primary }}
                    />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-sm">{theme.name}</span>
                    <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">{theme.id}</span>
                  </div>
                </div>
                
                {currentTheme === theme.id && (
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <button 
              onClick={onClose}
              className="btn btn-primary w-full py-4 rounded-2xl"
            >
              Save Preferences
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SettingsModal;
