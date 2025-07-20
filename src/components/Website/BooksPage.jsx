import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { storiesService } from '../../services/stories'
import { categoriesService } from '../../services/categories'

export default function BooksPage() {
  const [stories, setStories] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    // Get category from URL params
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setFilter(categoryFromUrl)
    }
    fetchStories()
    fetchCategories()
  }, [searchParams])

  const fetchStories = async () => {
    try {
      const { data, error } = await storiesService.getActiveStories()
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

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    if (newFilter === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: newFilter })
    }
  }

  const filteredStories = filter === 'all' 
    ? stories 
    : stories.filter(story => story.categories?.name === filter)

  const handleOrder = (story) => {
    navigate(`/order/${story.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A5ACD]"></div>
      </div>
    )
  }

  return (
    <main className="max-w-custom mx-auto px-0 sm:px-6">
      <div id="books-section" className="flex flex-col space-y-0 md:mt-0 px-4 md:px-0">
        {/* Filters and Books Grid */}
        <div className="flex flex-col gap-4 mt-8">
          {/* Filters Section */}
          <div className="lg:flex pt-1 w-full sticky top-[80px] z-40 bg-white/80 backdrop-blur-sm rounded-md p-2">
            <div className="h-full w-full flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
              {/* Category Filters */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Category */}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.2495 1.875H14.1245C13.9587 1.875 13.7997 1.94085 13.6825 2.05806C13.5653 2.17527 13.4995 2.33424 13.4995 2.5C13.4995 2.66576 13.5653 2.82473 13.6825 2.94194C13.7997 3.05915 13.9587 3.125 14.1245 3.125H15.7409L13.776 5.08984C13.1991 4.55218 12.5032 4.15861 11.7451 3.94128C10.987 3.72396 10.1882 3.68903 9.41406 3.83936C8.63989 3.9897 7.91226 4.32102 7.2906 4.80628C6.66894 5.29154 6.17088 5.91696 5.8371 6.63148C5.50332 7.34599 5.34329 8.12932 5.37007 8.9175C5.39686 9.70567 5.6097 10.4763 5.99122 11.1665C6.37273 11.8567 6.9121 12.4469 7.56527 12.8888C8.21844 13.3308 8.96688 13.6119 9.74947 13.7094V15H7.87447C7.70871 15 7.54974 15.0658 7.43253 15.1831C7.31532 15.3003 7.24947 15.4592 7.24947 15.625C7.24947 15.7908 7.31532 15.9497 7.43253 16.0669C7.54974 16.1842 7.70871 16.25 7.87447 16.25H9.74947V18.125C9.74947 18.2908 9.81532 18.4497 9.93253 18.5669C10.0497 18.6842 10.2087 18.75 10.3745 18.75C10.5402 18.75 10.6992 18.6842 10.8164 18.5669C10.9336 18.4497 10.9995 18.2908 10.9995 18.125V16.25H12.8745C13.0402 16.25 13.1992 16.1842 13.3164 16.0669C13.4336 15.9497 13.4995 15.7908 13.4995 15.625C13.4995 15.4592 13.4336 15.3003 13.3164 15.1831C13.1992 15.0658 13.0402 15 12.8745 15H10.9995V13.7094C11.8372 13.6047 12.6348 13.2894 13.3176 12.7928C14.0004 12.2963 14.5461 11.6347 14.9038 10.87C15.2615 10.1052 15.4195 9.26228 15.363 8.4199C15.3065 7.57753 15.0374 6.76324 14.5807 6.05313L16.6245 4.00859V5.625C16.6245 5.79076 16.6903 5.94973 16.8075 6.06694C16.9247 6.18415 17.0837 6.25 17.2495 6.25C17.4152 6.25 17.5742 6.18415 17.6914 6.06694C17.8086 5.94973 17.8745 5.79076 17.8745 5.625V2.5C17.8745 2.33424 17.8086 2.17527 17.6914 2.05806C17.5742 1.94085 17.4152 1.875 17.2495 1.875ZM10.3745 12.5C9.63279 12.5 8.90777 12.2801 8.29108 11.868C7.6744 11.456 7.19375 10.8703 6.90993 10.1851C6.6261 9.49984 6.55183 8.74584 6.69653 8.01841C6.84122 7.29098 7.19838 6.6228 7.72282 6.09835C8.24727 5.5739 8.91546 5.21675 9.64288 5.07206C10.3703 4.92736 11.1243 5.00162 11.8095 5.28545C12.4948 5.56928 13.0804 6.04993 13.4925 6.66661C13.9045 7.2833 14.1245 8.00832 14.1245 8.75C14.1234 9.74424 13.728 10.6975 13.025 11.4005C12.3219 12.1035 11.3687 12.499 10.3745 12.5Z" fill="#4F4D55"/>
                  </svg>
                  <span className="text-sm text-gray-600">Category</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {/* All Categories Filter */}
                  <label 
                    className={`text-gray-600 cursor-pointer border px-3 lg:px-4 py-2 text-sm rounded-md transition-colors ${
                      filter === 'all' ? 'border-[#6A5ACD] bg-[#6A5ACD] text-white' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="category" 
                      value="all" 
                      checked={filter === 'all'}
                      onChange={() => handleFilterChange('all')}
                      className="hidden"
                    />
                    <span>All</span>
                  </label>
                  
                  {/* Dynamic Category Filters */}
                  {categories.map((category) => (
                    <label 
                      key={category.id}
                      className={`text-gray-600 cursor-pointer border px-3 lg:px-4 py-2 text-sm rounded-md transition-colors ${
                        filter === category.name ? 'border-[#6A5ACD] bg-[#6A5ACD] text-white' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="category" 
                        value={category.name} 
                        checked={filter === category.name}
                        onChange={() => handleFilterChange(category.name)}
                        className="hidden"
                      />
                      <span>{category.display_name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Story Cards Grid */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-12 lg:grid-cols-3 xl:gap-x-24 w-full">
              {filteredStories.map((story) => (
                <div key={story.id} className="relative flex flex-col w-full items-center md:items-start space-y-4">
                  <div className="w-full bg-zinc-100 rounded-tr-md rounded-br-md aspect-square overflow-hidden shadow-xl">
                    <button 
                      onClick={() => handleOrder(story)}
                      className="block w-full h-full"
                    >
                      {story.image_url ? (
                        <img 
                          src={story.image_url} 
                          loading="lazy" 
                          alt={story.name} 
                          className="w-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#6A5ACD] to-[#FAC2FF] flex items-center justify-center">
                          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
                  <div className="flex flex-col flex-1 w-full justify-between">
                    <div>
                      <button 
                        onClick={() => handleOrder(story)}
                        className="text-base md:text-lg font-marcellus line-clamp-2 md:line-clamp-1 text-center md:text-left hover:text-[#6A5ACD] transition-colors"
                      >
                        {story.name}
                      </button>
                      {story.description && (
                        <div className="text-xs line-clamp-2 md:line-clamp-2 text-center md:text-left text-black mt-1">
                          {story.description}
                        </div>
                      )}
                    </div>
                    <div className="mt-2 w-fit mx-auto md:mx-0">
                      <button 
                        onClick={() => handleOrder(story)}
                        className="px-8 h-12 inline-flex items-center justify-center bg-gradient-to-r from-[#6A5ACD] via-[#7A6ADD] to-[#FAC2FF] hover:from-[#5A4ABD] hover:via-[#6A5ACD] hover:to-[#EAB2EF] hover:shadow-lg border border-transparent font-figtree rounded-full text-sm text-white transition-all duration-300 w-full font-bold transform hover:scale-105"
                        style={{
                          backgroundSize: '200% 100%',
                          backgroundPosition: '0% 50%'
                        }}
                      >
                        Personalise
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No stories found
              </h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'No stories are available at the moment.' 
                  : `No ${filter} stories are available at the moment.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 