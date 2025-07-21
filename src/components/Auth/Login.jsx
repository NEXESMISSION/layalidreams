import React, { useState } from 'react'
import { authService } from '../../services/auth'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await authService.login(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      navigate('/admin')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1A2E] to-[#16213E] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-[#0F3460] to-[#16213E] rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Admin Login
            </h2>
            <p className="text-gray-300 text-lg">
              Access your Layali Dreams dashboard
            </p>
          </div>
        
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-600/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm">{error}</p>
              </div>
            )}
          
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 
                      bg-white/10 border border-white/20 
                      text-white placeholder-gray-500 
                      focus:outline-none focus:ring-2 focus:ring-[#0F3460] 
                      focus:border-[#16213E] focus:z-10 
                      transition duration-300 ease-in-out"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 
                      bg-white/10 border border-white/20 
                      text-white placeholder-gray-500 
                      focus:outline-none focus:ring-2 focus:ring-[#0F3460] 
                      focus:border-[#16213E] focus:z-10 
                      transition duration-300 ease-in-out"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500 hover:text-white transition" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500 hover:text-white transition" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 
                  border border-transparent text-sm font-bold rounded-lg 
                  text-white bg-gradient-to-r from-[#0F3460] to-[#16213E] 
                  hover:from-[#16213E] hover:to-[#0F3460] 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16213E] 
                  disabled:opacity-50 disabled:cursor-not-allowed 
                  transition-all duration-300 ease-in-out 
                  transform hover:scale-105 active:scale-95 
                  shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 