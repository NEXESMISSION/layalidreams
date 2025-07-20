import React, { useState, useEffect } from 'react'
import { ordersService } from '../../services/orders'
import { Trash2, AlertTriangle, CheckCircle, XCircle, Package, Clock, CheckCircle as CheckCircleIcon } from 'lucide-react'

export default function OrdersRemoval() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrders, setSelectedOrders] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [statusFilter])

  const fetchOrders = async () => {
    try {
      const { data, error } = statusFilter === 'all' 
        ? await ordersService.getAllOrders()
        : await ordersService.getOrdersByStatus(statusFilter)
      
      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map(order => order.id))
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedOrders.length === 0) return

    setDeleting(true)
    try {
      const deletePromises = selectedOrders.map(orderId => 
        ordersService.deleteOrder(orderId)
      )
      
      await Promise.all(deletePromises)
      
      setSelectedOrders([])
      fetchOrders()
      setShowConfirmModal(false)
    } catch (error) {
      console.error('Error deleting orders:', error)
      alert('Error deleting orders. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  const handleDeleteSingle = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      try {
        const { error } = await ordersService.deleteOrder(orderId)
        if (error) throw error
        fetchOrders()
      } catch (error) {
        console.error('Error deleting order:', error)
        alert('Error deleting order. Please try again.')
      }
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />
      case 'shipped':
        return <Package className="h-5 w-5 text-purple-500" />
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7F7FBD]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Removal</h1>
          <p className="text-gray-600">⚠️ Special page for removing orders - Use with caution!</p>
        </div>
        {selectedOrders.length > 0 && (
          <button
            onClick={() => setShowConfirmModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
            <span>Delete Selected ({selectedOrders.length})</span>
          </button>
        )}
      </div>

      {/* Warning Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-400 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Warning</h3>
            <p className="text-sm text-red-700 mt-1">
              This page allows permanent deletion of orders. Deleted orders cannot be recovered.
            </p>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              statusFilter === 'all' 
                ? 'bg-[#7F7FBD] text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              statusFilter === 'pending' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('processing')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              statusFilter === 'processing' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setStatusFilter('shipped')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              statusFilter === 'shipped' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Shipped
          </button>
          <button
            onClick={() => setStatusFilter('delivered')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              statusFilter === 'delivered' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              statusFilter === 'cancelled' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            {statusFilter === 'all' ? 'All Orders' : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Orders`} ({orders.length})
          </h3>
          {orders.length > 0 && (
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === orders.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#7F7FBD] focus:ring-[#7F7FBD]"
                />
                <span className="text-sm text-gray-600">Select All</span>
              </label>
            </div>
          )}
        </div>
        
        <div className="divide-y divide-gray-200">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="rounded border-gray-300 text-[#7F7FBD] focus:ring-[#7F7FBD]"
                    />
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{order.customer_name}</h4>
                        <p className="text-sm text-gray-500">{order.customer_email || 'No email provided'}</p>
                        <p className="text-sm text-gray-600">{order.story_name}</p>
                        {order.child_name && (
                          <p className="text-sm text-blue-600">For: {order.child_name}</p>
                        )}
                        {order.personalization_notes && (
                          <p className="text-sm text-gray-500 italic">"{order.personalization_notes}"</p>
                        )}
                        <p className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">TND {order.total_price}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteSingle(order.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete this order"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Order Details */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Customer Phone:</p>
                      <p className="text-gray-900">{order.customer_phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Quantity:</p>
                      <p className="text-gray-900">{order.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Shipping Address:</p>
                      <p className="text-gray-900">{order.shipping_address || 'No address provided'}</p>
                    </div>
                    {order.order_notes && (
                      <div className="md:col-span-2">
                        <p className="text-gray-500">Order Notes:</p>
                        <p className="text-gray-900">{order.order_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              {statusFilter === 'all' ? 'No orders found.' : `No ${statusFilter} orders found.`}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Confirm Deletion</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''}? 
                  This action cannot be undone.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleDeleteSelected}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Delete Orders'}
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  disabled={deleting}
                  className="mt-2 px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 