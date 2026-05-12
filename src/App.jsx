import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, RecipeDetails, Favorites, ShoppingList, MealPlanner } from './pages'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-300">
      <ScrollToTop />
      <Toaster position="bottom-right" toastOptions={{ duration: 3000, style: { borderRadius: '16px', background: '#333', color: '#fff' } }} />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/planner" element={<MealPlanner />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
