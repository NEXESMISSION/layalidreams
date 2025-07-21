import { supabase } from './supabase'

// Predefined admin configuration
const ADMIN_CONFIG = {
  emails: [
    'admin@layalidreams.com', 
    'saifeddine.benmansour@gmail.com'
  ],
  domains: ['layalidreams.com']
}

export const authService = {
  // Comprehensive login method with advanced role detection
  async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Login Error:', error.message)
        return {
          success: false,
          error: error.message || 'Authentication failed',
          user: null
        }
      }

      // Advanced role detection
      const isAdmin = this.isAdminUser(data.user)

      // Update user metadata if admin
      if (isAdmin) {
        try {
          await supabase.auth.updateUser({
            data: { 
              role: 'admin',
              is_admin: true 
            }
          })
        } catch (updateError) {
          console.error('Failed to update user role:', updateError)
        }
      }

      return {
        success: isAdmin,
        error: isAdmin ? null : 'Admin access required',
        user: data.user
      }
    } catch (catchError) {
      console.error('Unexpected login error:', catchError)
      return {
        success: false,
        error: 'An unexpected error occurred',
        user: null
      }
    }
  },

  // Method to check if a user is an admin
  isAdminUser(user) {
    if (!user) return false

    // Check predefined emails
    if (ADMIN_CONFIG.emails.includes(user.email)) return true

    // Check email domain
    const emailDomain = user.email?.split('@')[1]
    if (ADMIN_CONFIG.domains.includes(emailDomain)) return true

    // Check user metadata
    return user.user_metadata?.role === 'admin' || 
           user.user_metadata?.is_admin === true
  },

  // Enhanced logout method
  async logout() {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Logout Error:', error.message)
        return {
          success: false,
          error: error.message
        }
      }

      return { success: true, error: null }
    } catch (catchError) {
      console.error('Unexpected logout error:', catchError)
      return {
        success: false,
        error: 'An unexpected error occurred during logout'
      }
    }
  },

  // Comprehensive getCurrentUser method
  async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error('Get Current User Error:', error.message)
        return null
      }

      const user = data.user
      
      // Ensure admin status is set correctly
      if (user && this.isAdminUser(user)) {
        try {
          await supabase.auth.updateUser({
            data: { 
              role: 'admin',
              is_admin: true 
            }
          })
        } catch (updateError) {
          console.error('Failed to update user role:', updateError)
        }
      }

      return user
    } catch (catchError) {
      console.error('Unexpected getCurrentUser error:', catchError)
      return null
    }
  },

  // Enhanced auth state change handler
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth State Changed:', event)
      
      if (event === 'SIGNED_IN') {
        const user = session?.user
        const isAdmin = this.isAdminUser(user)
        
        callback(isAdmin, user)
      } else if (event === 'SIGNED_OUT') {
        callback(false, null)
      }
    })
  },

  // Add token refresh mechanism
  async refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession()

      if (error) {
        console.error('Session Refresh Error:', error.message)
        return {
          success: false,
          error: error.message
        }
      }

      return {
        success: true,
        user: data.user,
        session: data.session
      }
    } catch (catchError) {
      console.error('Unexpected session refresh error:', catchError)
      return {
        success: false,
        error: 'Failed to refresh session'
      }
    }
  }
} 