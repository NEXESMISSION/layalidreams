import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Check, AlertCircle } from 'lucide-react'
import { categoriesService } from '../../services/categories'

export default function CategoriesList() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [newCategory, setNewCategory] = useState({ name: '', display_name: '' })
  const [storyCounts, setStoryCounts] = useState({})

  useEffect(() => {
    fetchCategories()
    fetchStoryCounts()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await categoriesService.getAllCategories()
      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStoryCounts = async () => {
    try {
      const { data, error } = await categoriesService.getStoriesCountByCategory()
      if (error) throw error
      setStoryCounts(data || {})
    } catch (error) {
      console.error('Error fetching story counts:', error)
    }
  }

  const handleAddCategory = async () => {
    if (!newCategory.name.trim() || !newCategory.display_name.trim()) return

    try {
      const { data, error } = await categoriesService.addCategory({
        name: newCategory.name.trim().toLowerCase(),
        display_name: newCategory.display_name.trim()
      })
      
      if (error) throw error
      
      // Refresh data
      await fetchCategories()
      await fetchStoryCounts()
      
      setNewCategory({ name: '', display_name: '' })
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding category:', error)
      alert('Error adding category. Please try again.')
    }
  }

  const handleEditCategory = async (categoryId, oldName, newData) => {
    if (!newData.name.trim() || !newData.display_name.trim()) return

    try {
      const { data, error } = await categoriesService.updateCategory(categoryId, {
        name: newData.name.trim().toLowerCase(),
        display_name: newData.display_name.trim()
      })
      
      if (error) throw error
      
      // Refresh data
      await fetchCategories()
      await fetchStoryCounts()
      
      setEditingCategory(null)
    } catch (error) {
      console.error('Error updating category:', error)
      alert('Error updating category. Please try again.')
    }
  }

  const handleDeleteCategory = async (categoryId, categoryName) => {
    const category = categories.find(cat => cat.id === categoryId)
    
    // Prevent deletion of default category
    if (category?.is_default) {
      alert('Cannot delete the default category. This category is required for the system to function properly.')
      return
    }

    if (window.confirm(`Are you sure you want to delete the category "${categoryName}"? All stories in this category will be moved to the default category.`)) {
      try {
        const { error } = await categoriesService.deleteCategory(categoryId)
        
        if (error) {
          console.error('Delete category error:', error)
          alert(`Error deleting category: ${error}`)
          return
        }
        
        // Refresh data
        await fetchCategories()
        await fetchStoryCounts()
      } catch (error) {
        console.error('Error deleting category:', error)
        alert(`Error deleting category: ${error.message || 'Unknown error occurred'}`)
      }
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
          <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600">Manage story categories</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#7F7FBD] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#6F6FAD] transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Category</span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Name (URL)</label>
              <input
                type="text"
                placeholder="e.g., adventure"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                placeholder="e.g., Adventure"
                value={newCategory.display_name}
                onChange={(e) => setNewCategory({...newCategory, display_name: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={handleAddCategory}
              disabled={!newCategory.name.trim() || !newCategory.display_name.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Check className="h-5 w-5" />
              <span>Add Category</span>
            </button>
            <button
              onClick={() => {
                setShowAddForm(false)
                setNewCategory({ name: '', display_name: '' })
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex items-center space-x-2"
            >
              <X className="h-5 w-5" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Categories</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  {editingCategory === category.id ? (
                    <CategoryEditForm
                      category={category}
                      onSave={(newData) => handleEditCategory(category.id, category.name, newData)}
                      onCancel={() => setEditingCategory(null)}
                    />
                  ) : (
                    <>
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{category.display_name}</h4>
                          <p className="text-sm text-gray-500">
                            {storyCounts[category.name] || 0} active stories • {category.name}
                            {category.is_default && ' • Default Category'}
                          </p>
                        </div>
                        {category.is_default && (
                          <div className="flex items-center space-x-1 text-blue-600">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-xs">Default</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingCategory(category.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id, category.name)}
                          disabled={category.is_default}
                          className={`p-2 rounded-lg ${
                            category.is_default
                              ? 'text-gray-400 cursor-not-allowed' 
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No categories found. Add your first category!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CategoryEditForm({ category, onSave, onCancel }) {
  const [editData, setEditData] = useState({
    name: category.name,
    display_name: category.display_name
  })

  const handleSave = () => {
    if (editData.name.trim() && editData.display_name.trim()) {
      onSave(editData)
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category Name (URL)</label>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({...editData, name: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
          <input
            type="text"
            value={editData.display_name}
            onChange={(e) => setEditData({...editData, display_name: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#7F7FBD] focus:border-[#7F7FBD]"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-4">
        <button
          onClick={handleSave}
          disabled={!editData.name.trim() || !editData.display_name.trim()}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Check className="h-5 w-5" />
          <span>Save</span>
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex items-center space-x-2"
        >
          <X className="h-5 w-5" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  )
} 