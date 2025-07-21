import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration. Please check your .env file.')
  throw new Error('Supabase configuration is incomplete')
}

// Create Supabase client with enhanced configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true
  },
  global: {
    headers: {
      'x-application-name': 'Layali Dreams Admin'
    }
  }
})

// Global error logging function
export const logSupabaseError = (context, error) => {
  console.error(`Supabase Error (${context}):`, error)
  return {
    success: false,
    error: error.message || 'An unexpected error occurred'
  }
}

// Helper function for consistent error handling
export const handleSupabaseError = (error) => {
  if (error) {
    console.error('Supabase Error:', error)
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    }
  }
  return { success: true }
} 