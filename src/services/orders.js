import { supabase, logSupabaseError } from './supabase'

export const ordersService = {
  async getAllOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          stories(*)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return logSupabaseError('getAllOrders', error)
    }
  },

  async getOrdersByStatus(status) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          stories(*)
        `)
        .eq('status', status)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return logSupabaseError('getOrdersByStatus', error)
    }
  },

  async getOrderById(id) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          stories(*)
        `)
        .eq('id', id)
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return logSupabaseError('getOrderById', error)
    }
  },

  async createOrder(orderData) {
    try {
      // Sanitize and validate order data
      const sanitizedData = {
        ...orderData,
        customer_email: orderData.customer_email || 'anonymous@layalidreams.com',
        shipping_address: orderData.shipping_address || 'To be confirmed',
        status: orderData.status || 'pending',
        created_at: new Date().toISOString()
      }

      // Explicitly use the public role for insertion
      const { data, error } = await supabase.from('orders')
        .insert([sanitizedData])
        .select()
      
      if (error) {
        // Log the full error for debugging
        console.error('Raw Supabase Order Creation Error:', error)
        
        // Throw a more descriptive error
        throw new Error(
          error.message || 'Failed to create order due to an unexpected error'
        )
      }

      return { data, error: null }
    } catch (error) {
      // Use the custom error logging function
      return logSupabaseError('createOrder', error)
    }
  },

  async updateOrderStatus(id, status) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return logSupabaseError('updateOrderStatus', error)
    }
  },

  async deleteOrder(id) {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return logSupabaseError('deleteOrder', error)
    }
  },

  async getOrderStats() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('status, total_price')
      
      if (error) throw error
      
      const stats = {
        total: data.length,
        pending: data.filter(o => o.status === 'pending').length,
        processing: data.filter(o => o.status === 'processing').length,
        shipped: data.filter(o => o.status === 'shipped').length,
        delivered: data.filter(o => o.status === 'delivered').length,
        cancelled: data.filter(o => o.status === 'cancelled').length,
        totalRevenue: data.reduce((sum, order) => sum + parseFloat(order.total_price), 0)
      }
      
      return { stats, error: null }
    } catch (error) {
      return logSupabaseError('getOrderStats', error)
    }
  }
} 