import React, { useState, useEffect } from 'react'
import { storiesService } from '../../services/stories'
import { categoriesService } from '../../services/categories'
import { Plus, Edit, Trash2, Eye, EyeOff, X } from 'lucide-react'

export default function StoriesList() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingStory, setEditingStory] = useState(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchStories()
    fetchCategories()
  }, [])

  const fetchStories = async () => {
    try {
      const { data, error } = await storiesService.getAllStories()
      if (error) throw error
      setStories(data || [])
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await categoriesService.getActiveCategories()
      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const getDefaultCategoryId = () => {
    const defaultCategory = categories.find(cat => cat.is_default)
    return defaultCategory?.id || ''
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story? This will also delete any associated orders.')) {
      try {
        const { data, error } = await storiesService.deleteStory(id)
        if (error) {
          console.error('Error deleting story:', error)
          alert(`Error deleting story: ${error}`)
          return
        }
        
        // Show success message with details
        if (data?.associatedOrders > 0) {
          alert(`Story "${data.storyName}" deleted successfully. ${data.associatedOrders} associated order(s) were also deleted.`)
        } else {
          alert(`Story "${data.storyName}" deleted successfully.`)
        }
        
        fetchStories()
      } catch (error) {
        console.error('Error deleting story:', error)
        alert(`Error deleting story: ${error.message || 'Unknown error occurred'}`)
      }
    }
  }

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const { error } = await storiesService.toggleStoryStatus(id, !currentStatus)
      if (error) throw error
      fetchStories()
    } catch (error) {
      console.error('Error toggling story status:', error)
    }
  }

  const handleSave = () => {
    setShowForm(false)
    setEditingStory(null)
    fetchStories()
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
          <h1 className="text-2xl font-bold text-gray-900">Stories Management</h1>
          <p className="text-gray-600">Manage your story collection</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#7F7FBD] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#6F6FAD] transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Story</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <StoryForm 
            story={editingStory}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false)
              setEditingStory(null)
            }}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Stories</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {stories.length > 0 ? (
            stories.map((story) => (
              <div key={story.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={story.image_url || (story.images && story.images.length > 0 ? story.images[0] : '/placeholder-image.jpg')} 
                        alt={story.name}
                        className="h-16 w-16 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          // If main image fails, try first image from array
                          if (story.images && story.images.length > 0 && e.target.src !== story.images[0]) {
                            e.target.src = story.images[0]
                          } else {
                            // Show placeholder if all images fail
                            e.target.src = '/placeholder-image.jpg'
                            e.target.onerror = null // Prevent infinite loop
                          }
                        }}
                      />
                      {/* Image count badge if multiple images */}
                      {story.images && story.images.length > 1 && (
                        <div className="absolute -top-1 -right-1 bg-[#7F7FBD] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {story.images.length}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{story.name}</h4>
                      <p className="text-sm text-gray-500">{story.categories?.display_name || story.categories?.name}</p>
                      <p className="text-sm text-gray-600">TND {story.price}</p>
                      {/* Show image status */}
                      {!story.image_url && (!story.images || story.images.length === 0) && (
                        <p className="text-xs text-orange-600">No image</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleStatus(story.id, story.is_active)}
                      className={`p-2 rounded-lg ${
                        story.is_active 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {story.is_active ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => {
                        setEditingStory(story)
                        setShowForm(true)
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No stories found. Add your first story!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Enhanced StoryForm component with multiple image uploads
function StoryForm({ story, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: story?.name || '',
    description: story?.description || '',
    paragraph: story?.paragraph || '',
    price: story?.price || '',
    old_price: story?.old_price || '',
    category_id: story?.category_id || '',
    story_link: story?.story_link || '',
    image_url: story?.image_url || '',
    images: story?.images || [] // Array of image URLs
  })
  const [loading, setLoading] = useState(false)
  const [newImageUrl, setNewImageUrl] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await categoriesService.getActiveCategories()
      if (error) throw error
      setCategories(data || [])
      
      // Set default category if no category is selected
      if (!formData.category_id && data.length > 0) {
        const defaultCategory = data.find(cat => cat.is_default)
        if (defaultCategory) {
          setFormData(prev => ({ ...prev, category_id: defaultCategory.id }))
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleAddImageUrl = () => {
    if (newImageUrl.trim() && !formData.images.includes(newImageUrl.trim())) {
      setFormData({
        ...formData,
        images: [...formData.images, newImageUrl.trim()]
      })
      setNewImageUrl('')
    }
  }

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const storyData = {
        ...formData,
        price: parseFloat(formData.price),
        old_price: formData.old_price ? parseFloat(formData.old_price) : null
      }

      if (story) {
        await storiesService.updateStory(story.id, storyData)
      } else {
        await storiesService.createStory(storyData)
      }

      onSave()
    } catch (error) {
      console.error('Error saving story:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={formData.category_id}
            onChange={(e) => setFormData({...formData, category_id: e.target.value})}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.display_name}{category.is_default ? ' (Default)' : ''}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Old Price (Optional)</label>
          <input
            type="number"
            step="0.01"
            value={formData.old_price}
            onChange={(e) => setFormData({...formData, old_price: e.target.value})}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          rows="3"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Paragraph</label>
        <textarea
          rows="3"
          value={formData.paragraph}
          onChange={(e) => setFormData({...formData, paragraph: e.target.value})}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Story Link</label>
        <input
          type="url"
          value={formData.story_link}
          onChange={(e) => setFormData({...formData, story_link: e.target.value})}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Main Image URL</label>
        <input
          type="url"
          value={formData.image_url}
          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
        />
        {/* Main Image Preview */}
        {formData.image_url && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-2">Preview:</p>
            <div className="relative inline-block">
              <img
                src={formData.image_url}
                alt="Main image preview"
                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 text-xs hidden">
                Invalid URL
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add URL Button */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Image URL
        </label>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter image URL"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddImageUrl();
              }
            }}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
          />
          <button
            type="button"
            onClick={handleAddImageUrl}
            className="px-4 py-2 bg-[#7F7FBD] border border-transparent rounded-md text-sm font-medium text-white hover:bg-[#6F6FAD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7F7FBD] disabled:opacity-50"
            disabled={!newImageUrl.trim() || formData.images.includes(newImageUrl.trim())}
          >
            Add URL
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      {formData.images.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Added Images:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Story image ${index + 1}`}
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-xs hidden">
                  <div className="text-center">
                    <div className="mb-1">Invalid URL</div>
                    <div className="text-xs">{image}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-500 rounded-full hover:bg-red-600"
                    title="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-[#7F7FBD] border border-transparent rounded-md text-sm font-medium text-white hover:bg-[#6F6FAD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7F7FBD] disabled:opacity-50"
        >
          {loading ? 'Saving...' : (story ? 'Update Story' : 'Create Story')}
        </button>
      </div>
    </form>
  )
} 