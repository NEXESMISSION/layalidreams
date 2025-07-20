import { supabase } from './supabase'

export const categoriesService = {
  // Get all categories from database
  async getAllCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('is_default', { ascending: false }) // Default category first
        .order('display_name')

      if (error) throw error

      return {
        data: data || [],
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error.message
      }
    }
  },

  // Add new category
  async addCategory(categoryData) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([categoryData])
        .select()

      if (error) throw error

      return {
        data: data[0],
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error.message
      }
    }
  },

  // Update category
  async updateCategory(id, categoryData) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(categoryData)
        .eq('id', id)
        .select()

      if (error) throw error

      return {
        data: data[0],
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error.message
      }
    }
  },

  // Delete category
  async deleteCategory(id) {
    try {
      console.log('Attempting to delete category with ID:', id)
      
      // First, get the default category ID
      const { data: defaultCategory, error: defaultError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', 'general')
        .single()

      if (defaultError) {
        console.error('Error getting default category:', defaultError)
        throw new Error('Could not find default category')
      }

      // Move all stories from this category to the default category
      const { error: updateError } = await supabase
        .from('stories')
        .update({ category_id: defaultCategory.id })
        .eq('category_id', id)

      if (updateError) {
        console.error('Error moving stories:', updateError)
        throw new Error('Failed to move stories to default category')
      }

      console.log('Stories moved to default category, now deleting category...')
      
      // Now delete the category
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Supabase delete error:', error)
        throw error
      }

      console.log('Category deleted successfully')
      return {
        data: true,
        error: null
      }
    } catch (error) {
      console.error('Error in deleteCategory:', error)
      return {
        data: null,
        error: error.message || 'Failed to delete category'
      }
    }
  },

  // Get stories count by category
  async getStoriesCountByCategory() {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          category_id,
          categories!inner(name)
        `)
        .eq('is_active', true)

      if (error) throw error

      const counts = data.reduce((acc, story) => {
        const categoryName = story.categories.name
        acc[categoryName] = (acc[categoryName] || 0) + 1
        return acc
      }, {})

      return {
        data: counts,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error.message
      }
    }
  },

  // Get active categories for dropdowns (exclude default from deletion)
  async getActiveCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, display_name, is_default')
        .eq('is_active', true)
        .order('is_default', { ascending: false }) // Default category first
        .order('display_name')

      if (error) throw error

      return {
        data: data || [],
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error.message
      }
    }
  },

  // Get default category
  async getDefaultCategory() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, display_name')
        .eq('is_default', true)
        .eq('is_active', true)
        .single()

      if (error) throw error

      return {
        data: data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error.message
      }
    }
  }
} 