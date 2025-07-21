import { supabase, logSupabaseError } from './supabase'

export const categoriesService = {
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
      return logSupabaseError('getAllCategories', error)
    }
  },

  async getActiveCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('is_default', { ascending: false })
        .order('display_name')

      if (error) throw error

      return {
        data: data || [],
        error: null
      }
    } catch (error) {
      return logSupabaseError('getActiveCategories', error)
    }
  },

  async createCategory(categoryData) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([categoryData])
        .select()

      if (error) throw error

      return {
        data: data?.[0] || null,
        error: null
      }
    } catch (error) {
      return logSupabaseError('createCategory', error)
    }
  },

  async updateCategory(id, updateData) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(updateData)
        .eq('id', id)
        .select()

      if (error) throw error

      return {
        data: data?.[0] || null,
        error: null
      }
    } catch (error) {
      return logSupabaseError('updateCategory', error)
    }
  },

  async deleteCategory(id) {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) throw error

      return {
        error: null
      }
    } catch (error) {
      return logSupabaseError('deleteCategory', error)
    }
  },

  async getStoriesCountByCategory() {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          category_id,
          categories(name)
        `)
        .eq('is_active', true)

      if (error) throw error

      const counts = data.reduce((acc, story) => {
        const categoryName = story.categories?.name || 'Uncategorized'
        acc[categoryName] = (acc[categoryName] || 0) + 1
        return acc
      }, {})

      return {
        data: counts,
        error: null
      }
    } catch (error) {
      return logSupabaseError('getStoriesCountByCategory', error)
    }
  }
} 