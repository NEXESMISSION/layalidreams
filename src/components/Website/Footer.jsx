import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative left-1/2 -ml-[50vw] w-screen px-2 md:px-0 py-8 mt-16 border-t border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-28 flex flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <a href="#" className="flex items-center gap-2 mb-5">
            <img src="https://i.ibb.co/bgQMqgzk/New-Project.png" alt="layali dreams Logo" className="h-14 w-auto logo-saturated" />
          </a>
          <p className="text-gray-600 mb-8 max-w-md">
            Create personalised storybooks that make your child the hero, with quick customisation and speedy delivery!
          </p>
          <div className="flex space-x-4">
            <a href="#">
              <svg className="w-6 h-6 text-[#7F7FBD] hover:text-[#6F6FAD] transition" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.2 11.4478V8.10219C13.2 6.80705 14.2745 5.75713 15.6 5.75713H18V2.23955L14.742 2.01216C11.9634 1.81824 9.6 3.96848 9.6 6.69036V11.4478H6V14.9654H9.6V22H13.2V14.9654H16.8L18 11.4478H13.2Z" fill="currentColor" />
              </svg>
            </a>
            <a href="#">
              <svg className="w-6 h-6 text-[#7F7FBD] hover:text-[#6F6FAD] transition" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5C0 2.23858 2.23858 0 5 0H15C17.7614 0 20 2.23858 20 5V15C20 17.7614 17.7614 20 15 20H5C2.23858 20 0 17.7614 0 15V5ZM4.25 10C4.25 13.1756 6.82436 15.75 10 15.75C13.1756 15.75 15.75 13.1756 15.75 10C15.75 6.82436 13.1756 4.25 10 4.25C6.82436 4.25 4.25 6.82436 4.25 10ZM16 5C16.5523 5 17 4.55228 17 4C17 3.44772 16.5523 3 16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5Z" fill="currentColor" />
                <path d="M10 5.75C7.65279 5.75 5.75 7.65279 5.75 10C5.75 12.3472 7.65279 14.25 10 14.25C12.3472 14.25 14.25 12.3472 14.25 10C14.25 7.65279 12.3472 5.75 10 5.75Z" fill="currentColor" />
              </svg>
            </a>
            <a href="#">
              <svg className="w-6 h-6 text-[#7F7FBD] hover:text-[#6F6FAD] transition" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 pt-4 px-4 md:px-28 text-gray-500 text-sm flex flex-wrap items-center justify-between w-full">
        <span className="w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">layali dreams — © 2025 All rights reserved</span>
        <a href="https://digipluslab.xyz" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-start text-gray-600 hover:text-gray-900">
          <span>Developed by : DIGIPLUS X TFP</span>
        </a>
      </div>
    </footer>
  )
} 