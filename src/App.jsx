import React, { useState, useEffect } from 'react'
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  unstable_HistoryRouter as HistoryRouter // Import for future routing
} from 'react-router-dom'
import { createBrowserHistory } from 'history' // Import history
import { authService } from './services/auth'
import Login from './components/Auth/Login'
import Dashboard from './components/Dashboard/Dashboard'
import DashboardHome from './components/Dashboard/DashboardHome'
import StoriesList from './components/Stories/StoriesList'
import OrdersList from './components/Orders/OrdersList'
import OrdersRemoval from './components/Orders/OrdersRemoval'
import CategoriesList from './components/Categories/CategoriesList'
import Loading from './components/Common/Loading'
import ScrollToTop from './components/ScrollToTop'

// Main Website Components
import HomePage from './components/Website/HomePage'
import BooksPage from './components/Website/BooksPage'
import AboutPage from './components/Website/AboutPage'
import ContactPage from './components/Website/ContactPage'
import OrderForm from './components/Website/OrderForm'
import Header from './components/Website/Header'
import Footer from './components/Website/Footer'

// Create browser history
const history = createBrowserHistory()

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
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

    // Listen for auth changes
    let subscription = null
    try {
      subscription = authService.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })
    } catch (error) {
      console.error('Error setting up auth listener:', error)
      setLoading(false)
    }

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe()
      }
    }
  }, [])

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
      <div className="App">
        <Routes>
          {/* Root Redirect */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/admin" /> : 
              <>
                <Header />
                <HomePage />
                <Footer />
              </>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={user ? <Dashboard /> : <Navigate to="/admin/login" />}
          >
            {/* Nested routes for Dashboard */}
            <Route index element={<DashboardHome />} />
            <Route path="stories" element={<StoriesList />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="orders-removal" element={<OrdersRemoval />} />
            <Route path="categories" element={<CategoriesList />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>

          <Route 
            path="/admin/login" 
            element={user ? <Navigate to="/admin" /> : <Login />} 
          />
          
          {/* Main Website Routes */}
          <Route path="/books" element={
            <>
              <Header />
              <BooksPage />
              <Footer />
            </>
          } />
          <Route path="/order/:storyId" element={
            <>
              <Header />
              <OrderForm />
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Header />
              <AboutPage />
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Header />
              <ContactPage />
              <Footer />
            </>
          } />

          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to={user ? "/admin" : "/"} />} />
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App 