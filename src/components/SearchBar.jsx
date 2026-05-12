import React, { useState, useEffect, useRef } from 'react';
import { Search, X, History, ArrowRight, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import recipeService from '../services/recipeService';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('flavorforge_search_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const dropdownRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('WebkitSpeechRecognition' in window || 'speechRecognition' in window) {
      const SpeechRecognition = window.WebkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        onSearch(transcript);
        addToHistory(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleVoiceSearch = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        setIsListening(true);
        recognitionRef.current.start();
      }
    } else {
      alert('Voice search is not supported in this browser.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      const fetchSuggestions = async () => {
        const results = await recipeService.searchByName(query);
        setSuggestions(results.slice(0, 5));
      };
      const timeoutId = setTimeout(fetchSuggestions, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      addToHistory(query);
      setShowDropdown(false);
    }
  };

  const addToHistory = (term) => {
    const newHistory = [term, ...history.filter(h => h !== term)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('flavorforge_search_history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('flavorforge_search_history');
  };

  return (
    <div className="relative max-w-2xl mx-auto w-full" ref={dropdownRef}>
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center"
      >
        <Search className="absolute left-5 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search recipes, ingredients, or cuisines..."
          className="w-full pl-14 pr-12 py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-slate-800 outline-none shadow-xl transition-all font-medium text-dark dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
        />
        {query && (
          <button 
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-24 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
        <button 
          type="button"
          onClick={handleVoiceSearch}
          className={`absolute right-14 p-2 rounded-xl transition-all ${isListening ? 'bg-primary text-white animate-pulse' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        >
          <Mic className="w-5 h-5" />
        </button>
        <button 
          type="submit"
          className="absolute right-2 p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <AnimatePresence>
        {showDropdown && (query.length > 0 || history.length > 0) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-3 glass dark:glass-dark rounded-2xl overflow-hidden z-40 border border-white/20"
          >
            {suggestions.length > 0 && (
              <div className="p-2 border-b border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-1">Suggestions</p>
                {suggestions.map((s) => (
                  <button
                    key={s.idMeal}
                    onClick={() => {
                      setQuery(s.strMeal);
                      handleSubmit();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-primary/5 rounded-xl transition-colors text-left"
                  >
                    <img src={s.strMealThumb} className="w-8 h-8 rounded-lg object-cover" alt="" />
                    <span className="text-sm font-medium">{s.strMeal}</span>
                  </button>
                ))}
              </div>
            )}

            {history.length > 0 && (
              <div className="p-2">
                <div className="flex items-center justify-between px-3 mb-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recent Searches</p>
                  <button onClick={clearHistory} className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Clear</button>
                </div>
                {history.map((h) => (
                  <button
                    key={h}
                    onClick={() => {
                      setQuery(h);
                      onSearch(h);
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-primary/5 rounded-xl transition-colors text-left"
                  >
                    <History className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">{h}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
