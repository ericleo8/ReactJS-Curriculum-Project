import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FavoriteProvider } from "./components/context/FavoriteContext.jsx";
import { ThemeProvider } from './components/context/ThemeContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <FavoriteProvider>
      <App />
    </FavoriteProvider>
    </ThemeProvider>
  </StrictMode >
)
