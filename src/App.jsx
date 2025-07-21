import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { authService } from './services/auth'
import Login from './components/Auth/Login'
import Dashboard from './components/Dashboard/Dashboard'
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
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Admin Routes - Simplified */}
          <Route 
            path="/admin/login" 
            element={user ? <Navigate to="/admin" /> : <Login />} 
          />
          <Route 
            path="/admin/*" 
            element={user ? <Dashboard /> : <Navigate to="/admin/login" />} 
          />
          
          {/* Main Website Routes */}
          <Route path="/" element={
            <>
              <Header />
              <HomePage />
              <Footer />
            </>
          } />
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
        </Routes>
      </div>
    </Router>
  )
}

export default App 