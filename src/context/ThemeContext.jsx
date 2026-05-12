import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { id: 'light', name: 'Light Mode', primary: '#ff6b6b', bg: '#ffffff' },
  { id: 'dark', name: 'Dark Mode', primary: '#ff6b6b', bg: '#1a1a1a' },
];

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('flavorforge_theme_preset');
    return saved || 'light';
  });

  useEffect(() => {
    localStorage.setItem('flavorforge_theme_preset', currentTheme);
    
    // Set data-theme attribute for CSS variables
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Handle dark mode specific class for Tailwind 'dark:' utility
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  const changeTheme = (themeId) => setCurrentTheme(themeId);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
