import { supabase, logSupabaseError } from './supabase'

export const storiesService = {
  async getAllStories() {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          *,
          categories(name, display_name)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return logSupabaseError('getAllStories', error)
    }
  },

  async getActiveStories() {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          *,
          categories(name, display_name)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return logSupabaseError('getActiveStories', error)
    }
  },

  async getStoryById(id) {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          *,
          categories(name, display_name)
        `)
        .eq('id', id)
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return logSupabaseError('getStoryById', error)
    }
  },

  async createStory(storyData) {
    try {
      const { data, error } = await supabase
        .from('stories')
        .insert([storyData])
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return logSupabaseError('createStory', error)
    }
  },

  async updateStory(id, updateData) {
    try {
      const { data, error } = await supabase
        .from('stories')
        .update(updateData)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return logSupabaseError('updateStory', error)
    }
  },

  async uploadImage(file) {
    try {
      if (!file) throw new Error('No file provided')

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('story-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from('story-images')
        .getPublicUrl(filePath)

      if (urlError) throw urlError

      return { publicUrl, error: null }
    } catch (error) {
      return logSupabaseError('uploadImage', error)
    }
  }
} 