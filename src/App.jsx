import React, { useState, useEffect } from 'react'
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  Outlet
} from 'react-router-dom'
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
import DeploymentCheck from './components/Common/DeploymentCheck'

// Additional Admin Components
import StoriesList from './components/Stories/StoriesList'
import OrdersList from './components/Orders/OrdersList'
import OrdersRemoval from './components/Orders/OrdersRemoval'
import CategoriesList from './components/Categories/CategoriesList'

// Enhanced Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    isAuthenticated: false
  })

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        
        // Advanced role checking
        const isAdmin = authService.isAdminUser(currentUser)

        console.log('Current User:', currentUser)
        console.log('Is Admin:', isAdmin)
        console.log('User Metadata:', currentUser?.user_metadata)

        // Check if user exists and has the required role
        if (currentUser) {
          const hasRequiredRole = !requiredRole || isAdmin

          setAuthState({
            user: currentUser,
            loading: false,
            isAuthenticated: hasRequiredRole
          })
        } else {
          setAuthState({
            user: null,
            loading: false,
            isAuthenticated: false
          })
        }
      } catch (error) {
        console.error('Authentication check failed:', error)
        setAuthState({
          user: null,
          loading: false,
          isAuthenticated: false
        })
      }
    }

    // Initial check
    checkAuthStatus()

    // Set up auth state change listener
    const { unsubscribe } = authService.onAuthStateChange((isAuthenticated, userData) => {
      console.log('Auth State Change User:', userData)
      console.log('Is Authenticated:', isAuthenticated)
      
      setAuthState({
        user: userData,
        loading: false,
        isAuthenticated: isAuthenticated
      })
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [requiredRole])

  // Loading state
  if (authState.loading) {
    return <Loading />
  }

  // Not authenticated or lacks required role
  if (!authState.isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <ScrollToTop />
      <DeploymentCheck />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <WebsitePage>
            <HomePage />
          </WebsitePage>
        } />
        <Route path="/books" element={
          <WebsitePage>
            <BooksPage />
          </WebsitePage>
        } />
        <Route path="/about" element={
          <WebsitePage>
            <AboutPage />
          </WebsitePage>
        } />
        <Route path="/contact" element={
          <WebsitePage>
            <ContactPage />
          </WebsitePage>
        } />
        <Route path="/order/:storyId" element={
          <WebsitePage>
            <OrderForm />
          </WebsitePage>
        } />

        {/* Authentication Routes */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Dashboard Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="stories" element={<StoriesList />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders-removal" element={<OrdersRemoval />} />
          <Route path="categories" element={<CategoriesList />} />
          
          {/* Catch-all for admin routes */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

// Wrapper component for pages with Header and Footer
const WebsitePage = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default App 