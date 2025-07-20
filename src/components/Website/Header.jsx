import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
  ]

  return (
    <nav className="bg-white shadow sticky top-0 w-full z-50">
      <div className="max-w-custom mx-auto py-2.5 px-0 sm:px-6">
        <div className="flex justify-between items-center h-16 px-3 sm:px-0">
          <div className="flex gap-2 items-center">
            {/* Hamburger Menu (Mobile & Tablet) */}
            <div className="flex items-center lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="text-gray-700 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Left Section: Logo */}
            <div className="flex items-center">
              <Link to="/" className="inline-flex items-center">
                <img 
                  src="https://i.ibb.co/bgQMqgzk/New-Project.png" 
                  alt="layali dreams Logo" 
                  className="h-14 w-auto logo-saturated"
                />
              </Link>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out ${
                    isActive
                      ? 'text-pink-primary'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Right Section */}
          <div className="flex sm:items-center sm:ms-6 space-x-3">
            <span className="cursor-pointer border rounded px-2 h-8 flex items-center space-x-1 flex-shrink-0">
              <span className="w-5 h-5 inline-block">
                <svg className="w-full h-full" viewBox="-60 -40 120 80" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#e70013">
                    <path d="M-60-40H60v80H-60z"></path>
                    <circle r="20" fill="#fff"></circle>
                    <circle r="15"></circle>
                    <circle cx="4" r="12" fill="#fff"></circle>
                    <path d="M-5 0l16.281-5.29L1.22 8.56V-8.56L11.28 5.29z"></path>
                  </g>
                </svg>
              </span>
              <span>TND</span>
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-y-0 left-0 w-full bg-black bg-opacity-10 backdrop-blur-sm transform transition-transform duration-300 ease-in-out lg:hidden z-50 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="w-[336px] h-full bg-white flex flex-col">
          <div className="p-3 py-6 border-b flex justify-between items-center">
            <X 
              className="w-6 h-6 cursor-pointer text-pink-primary" 
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
          <div className="items-start p-2 space-y-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block w-full ps-3 pe-4 py-2.5 px-3 text-start text-base font-normal bg-gray-100 rounded-md focus:outline-none focus:text-gray-400 focus:bg-custom-pink-light transition duration-150 ease-in-out ${
                    isActive
                      ? 'text-pink-primary'
                      : 'text-gray-900'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
} 