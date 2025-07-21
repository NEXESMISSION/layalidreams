import React, { useState, useEffect } from 'react'
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  unstable_HistoryRouter as HistoryRouter
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { authService } from './services/auth'

// Authentication
import Login from './components/Auth/Login'
import Dashboard from './components/Dashboard/Dashboard'
import DashboardHome from './components/Dashboard/DashboardHome'

// Website Components
import HomePage from './components/Website/HomePage'
import BooksPage from './components/Website/BooksPage'
import AboutPage from './components/Website/AboutPage'
import ContactPage from './components/Website/ContactPage'
import OrderForm from './components/Website/OrderForm'

// Common Components
import Loading from './components/Common/Loading'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Website/Header'
import Footer from './components/Website/Footer'

// Additional Admin Components
import StoriesList from './components/Stories/StoriesList'
import OrdersList from './components/Orders/OrdersList'
import OrdersRemoval from './components/Orders/OrdersRemoval'
import CategoriesList from './components/Categories/CategoriesList'

// Create browser history
const history = createBrowserHistory()

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    const subscription = authService.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe()
      }
    }
  }, [])

  // Wrapper component for pages with Header and Footer
  const WebsitePage = ({ children }) => (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )

  if (loading) {
    return <Loading />
  }

  return (
    <HistoryRouter 
      history={history}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WebsitePage><HomePage /></WebsitePage>} />
        <Route path="/books" element={<WebsitePage><BooksPage /></WebsitePage>} />
        <Route path="/about" element={<WebsitePage><AboutPage /></WebsitePage>} />
        <Route path="/contact" element={<WebsitePage><ContactPage /></WebsitePage>} />
        <Route path="/order/:storyId" element={<WebsitePage><OrderForm /></WebsitePage>} />

        {/* Authentication Routes */}
        <Route path="/admin/login" element={
          user ? <Navigate to="/admin" /> : <Login />
        } />

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={
          user ? <Dashboard /> : <Navigate to="/admin/login" />
        }>
          <Route index element={<DashboardHome />} />
          <Route path="stories" element={<StoriesList />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders-removal" element={<OrdersRemoval />} />
          <Route path="categories" element={<CategoriesList />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HistoryRouter>
  )
}

export default App 