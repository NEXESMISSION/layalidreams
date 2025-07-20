import { supabase } from './supabase'

export const storiesService = {
  async getAllStories() {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        categories!inner(name, display_name)
      `)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getStoryById(id) {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        categories!inner(name, display_name)
      `)
      .eq('id', id)
      .single()
    return { data, error }
  },

  async getActiveStories() {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        categories!inner(name, display_name)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getStoriesByCategory(categoryName) {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        categories!inner(name, display_name)
      `)
      .eq('categories.name', categoryName)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async createStory(storyData) {
    const { data, error } = await supabase
      .from('stories')
      .insert([storyData])
      .select(`
        *,
        categories!inner(name, display_name)
      `)
    return { data, error }
  },

  async updateStory(id, updates) {
    const { data, error } = await supabase
      .from('stories')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        categories!inner(name, display_name)
      `)
    return { data, error }
  },

  async deleteStory(id) {
    try {
      // First check if the story exists
      const { data: story, error: fetchError } = await supabase
        .from('stories')
        .select('id, name')
        .eq('id', id)
        .single()

      if (fetchError) {
        return { error: `Story not found: ${fetchError.message}` }
      }

      // Check if story has associated orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('id')
        .eq('story_id', id)

      if (ordersError) {
        return { error: `Error checking orders: ${ordersError.message}` }
      }

      // Delete the story (this will cascade to orders and order_items)
      const { error: deleteError } = await supabase
        .from('stories')
        .delete()
        .eq('id', id)

      if (deleteError) {
        return { error: `Error deleting story: ${deleteError.message}` }
      }

      return { 
        data: { 
          deleted: true, 
          storyName: story.name,
          associatedOrders: orders?.length || 0 
        }, 
        error: null 
      }
    } catch (error) {
      return { error: `Unexpected error: ${error.message}` }
    }
  },

  async toggleStoryStatus(id, isActive) {
    const { data, error } = await supabase
      .from('stories')
      .update({ is_active: isActive })
      .eq('id', id)
      .select(`
        *,
        categories!inner(name, display_name)
      `)
    return { data, error }
  },

  async uploadImage(file) {
    const fileName = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from('story-images')
      .upload(fileName, file)
    
    if (data) {
      const { data: { publicUrl } } = supabase.storage
        .from('story-images')
        .getPublicUrl(fileName)
      return { publicUrl, error: null }
    }
    return { publicUrl: null, error }
  },

  async deleteImage(fileName) {
    const { error } = await supabase.storage
      .from('story-images')
      .remove([fileName])
    return { error }
  }
} 