import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, RecipeDetails, Favorites, ShoppingList, MealPlanner, PrivacyPolicy, TermsOfService } from './pages'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { Toaster } from 'react-hot-toast'
import SettingsModal from './components/SettingsModal'

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Toaster position="bottom-right" toastOptions={{ duration: 3000, style: { borderRadius: '16px', background: '#333', color: '#fff' } }} />
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/planner" element={<MealPlanner />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </main>
      <Footer />
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  )
}

export default App
