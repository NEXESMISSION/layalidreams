import { supabase } from './supabase'

export const ordersService = {
  async getAllOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          stories (*)
        )
      `)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getOrdersByStatus(status) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          stories (*)
        )
      `)
      .eq('status', status)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getOrderById(id) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          stories (*)
        )
      `)
      .eq('id', id)
      .single()
    return { data, error }
  },

  async updateOrderStatus(id, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
    return { data, error }
  },

  async createOrder(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
    return { data, error }
  },

  async deleteOrder(id) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)
    return { error }
  },

  async getOrderStats() {
    const { data, error } = await supabase
      .from('orders')
      .select('status, total_price')
    
    if (error) return { stats: null, error }
    
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
  }
} 