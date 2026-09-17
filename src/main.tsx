import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

/**
 * Clean URLs (/products) need the host to rewrite unknown paths to index.html.
 * Where that is not possible — a plain file host, GitHub Pages, a preview
 * bucket — build with VITE_HASH_ROUTER=1 and routes become /#/products, which
 * works anywhere with no server configuration.
 */
const useHash = import.meta.env.VITE_HASH_ROUTER === '1'
const Router = useHash ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {useHash ? (
      <Router>
        <App />
      </Router>
    ) : (
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    )}
  </StrictMode>,
)
