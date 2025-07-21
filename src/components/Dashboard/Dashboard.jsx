import React, { useState } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import StoriesList from '../Stories/StoriesList'
import OrdersList from '../Orders/OrdersList'
import OrdersRemoval from '../Orders/OrdersRemoval'
import CategoriesList from '../Categories/CategoriesList'
import DashboardHome from './DashboardHome'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet /> {/* This will render nested routes */}
          </div>
        </main>
      </div>
    </div>
  )
} 