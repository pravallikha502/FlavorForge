import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { FavoritesProvider } from './context/FavoritesContext'
import { ThemeProvider } from './context/ThemeContext'
import { ShoppingProvider } from './context/ShoppingContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <ShoppingProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ShoppingProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
