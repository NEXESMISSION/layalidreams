import React, { useState, useEffect } from 'react'
import { ordersService } from '../../services/orders'
import { Eye, Package, Clock, CheckCircle, XCircle, Download, X } from 'lucide-react'

export default function OrdersList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)

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

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const { error } = await ordersService.updateOrderStatus(orderId, newStatus)
      if (error) throw error
      fetchOrders()
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl)
    setShowImageModal(true)
  }

  const handleDownloadImage = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName || 'personalization-image.jpg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading image:', error)
      alert('Error downloading image. Please try again.')
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
        return <CheckCircle className="h-5 w-5 text-green-500" />
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-600">Manage customer orders and track their status</p>
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
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {statusFilter === 'all' ? 'All Orders' : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Orders`}
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
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
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">TND {order.total_price}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
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
                    
                    {/* Personalization Image Section */}
                    {order.personalization_image && (
                      <div className="md:col-span-2">
                        <p className="text-gray-500 mb-2">Personalization Image:</p>
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img 
                              src={order.personalization_image} 
                              alt="Personalization" 
                              className="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => handleViewImage(order.personalization_image)}
                            />
                            <button
                              onClick={() => handleViewImage(order.personalization_image)}
                              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-all rounded-lg"
                              title="View full size"
                            >
                              <Eye className="h-4 w-4 text-white opacity-0 hover:opacity-100" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleDownloadImage(
                              order.personalization_image, 
                              `personalization-${order.customer_name}-${order.child_name}.jpg`
                            )}
                            className="flex items-center space-x-1 px-3 py-1 bg-[#7F7FBD] text-white rounded-md hover:bg-[#6F6FAD] transition-colors text-sm"
                            title="Download image"
                          >
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </button>
                        </div>
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

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Personalization" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  handleDownloadImage(selectedImage, 'personalization-image.jpg')
                  setShowImageModal(false)
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-[#7F7FBD] text-white rounded-md hover:bg-[#6F6FAD] transition-colors"
              >
                <Download className="h-5 w-5" />
                <span>Download Image</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}