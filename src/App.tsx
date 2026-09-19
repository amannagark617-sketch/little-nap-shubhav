import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgress from './components/ScrollProgress'
import EnquiryDrawer from './components/EnquiryDrawer'
import AIAdvisor from './components/AIAdvisor'
import WhatsAppButton from './components/WhatsAppButton'
import { EnquiryProvider } from './context/EnquiryContext'
import Home from './pages/Home'

/**
 * The landing page is bundled with the shell so the first view needs no extra
 * round trip. Interior pages are fetched on navigation, which keeps the initial
 * download to what a first-time visitor actually reads.
 */
const Products = lazy(() => import('./pages/Products'))
const Manufacturing = lazy(() => import('./pages/Manufacturing'))
const Quality = lazy(() => import('./pages/Quality'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** Holds the viewport height while a route chunk arrives, avoiding a jump. */
function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-navy-100 border-t-gold-400" />
    </div>
  )
}

export default function App() {
  return (
    <EnquiryProvider>
      <ScrollToTop />
      <ScrollProgress />
      <Header />
      <main id="main" className="pad-main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <EnquiryDrawer />
      <AIAdvisor />
      <WhatsAppButton />
    </EnquiryProvider>
  )
}
