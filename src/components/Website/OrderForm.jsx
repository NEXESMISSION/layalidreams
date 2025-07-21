import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { storiesService } from '../../services/stories'
import { ordersService } from '../../services/orders'
import { CheckCircle } from 'lucide-react'

export default function OrderForm() {
  const { storyId } = useParams()
  const navigate = useNavigate()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    child_name: '',
    personalization_notes: '',
    quantity: 1,
    customer_email: 'no-email@layalidreams.com' // Temporary default email
  })

  useEffect(() => {
    fetchStory()
  }, [storyId])

  // Create image arrays for gallery - use actual images from database
  const getImagesFromStory = () => {
    const allImages = []
    
    // First, add the main image_url if it exists
    if (story?.image_url) {
      allImages.push({ url: story.image_url, type: 'image' })
    }
    
    // Then, add any additional images from the images array
    if (story?.images && Array.isArray(story.images) && story.images.length > 0) {
      story.images.forEach(url => {
        // Don't add duplicate URLs
        if (!allImages.some(img => img.url === url)) {
          allImages.push({ url, type: 'image' })
        }
      })
    }
    
    return allImages
  }

  const allImages = getImagesFromStory()
  const thumbnails = allImages
  const previews = allImages

  // Reset current image index if it's out of bounds - FIXED
  useEffect(() => {
    if (allImages.length > 0 && currentImageIndex >= allImages.length) {
      setCurrentImageIndex(0)
    }
  }, [allImages.length, currentImageIndex])

  const fetchStory = async () => {
    try {
      const { data, error } = await storiesService.getStoryById(storyId)
      if (error) throw error
      setStory(data)
    } catch (error) {
      console.error('Error fetching story:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Enhanced Validation
    if (!formData.child_name || formData.child_name.trim().length < 2) {
      alert('Please provide a valid child name (at least 2 characters)')
      setSubmitting(false)
      return
    }

    if (!formData.customer_phone || !/^[0-9]{8,15}$/.test(formData.customer_phone)) {
      alert('Please provide a valid phone number (8-15 digits)')
      setSubmitting(false)
      return
    }

    try {
      // Sanitize input data
      const sanitizedData = {
        customer_name: formData.child_name, // Use child name as customer name
        customer_phone: formData.customer_phone.replace(/\D/g, ''), // Remove non-digit characters
        child_name: formData.child_name,
        personalization_notes: formData.personalization_notes || '',
        customer_email: 'anonymous@layalidreams.com', // Fixed default email
        shipping_address: 'To be confirmed', // Default shipping address
        story_id: storyId,
        story_name: story.name,
        total_price: story.price * formData.quantity,
        quantity: formData.quantity || 1,
        status: 'pending'
      }

      // Upload image if selected
      let imageUrl = null
      if (selectedImage) {
        const maxFileSize = 10 * 1024 * 1024 // 10MB
        if (selectedImage.size > maxFileSize) {
          alert('Image must be less than 10MB')
          setSubmitting(false)
          return
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
        if (!allowedTypes.includes(selectedImage.type)) {
          alert('Only JPEG, PNG, and GIF images are allowed')
          setSubmitting(false)
          return
        }

        const { publicUrl, error: uploadError } = await storiesService.uploadImage(selectedImage)
        if (uploadError) {
          console.error('Image upload error:', uploadError)
          alert('Failed to upload image. Please try again.')
          setSubmitting(false)
          return
        }
        imageUrl = publicUrl
        sanitizedData.personalization_image = imageUrl
      }

      const { data, error } = await ordersService.createOrder(sanitizedData)
      
      if (error) {
        console.error('Order creation error:', error)
        
        // More specific error handling
        if (error.includes('row-level security policy')) {
          alert('Sorry, we are unable to process your order at the moment. Please try again later or contact support.')
        } else {
          alert(`Failed to create order: ${error}`)
        }
        
        setSubmitting(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        navigate('/books')
      }, 3000)
    } catch (error) {
      console.error('Unexpected error creating order:', error)
      alert('An unexpected error occurred. Please try again.')
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A5ACD]"></div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h2>
          <p className="text-gray-600 mb-6">The story you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/books')}
            className="bg-[#6A5ACD] text-white px-6 py-3 rounded-lg hover:bg-[#5A4ABD] transition-colors"
          >
            Back to Books
          </button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for your order. We'll contact you soon with details.</p>
          <p className="text-sm text-gray-500">Redirecting to books page...</p>
        </div>
      </div>
    )
  }

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index)
  }

  // Force re-render when currentImageIndex changes
  const currentImage = allImages[currentImageIndex] || allImages[0]

  return (
    <main className="py-8 px-4">
      <div className="relative flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 w-full justify-center select-none max-w-custom mx-auto">
        {/* Image Gallery Wrapper */}
        <div className="flex flex-col md:flex-row items-start">
          {/* Thumbnails - Only show if there are multiple images */}
          {thumbnails.length > 1 && (
            <div className="flex flex-row md:flex-col flex-shrink-0 w-full md:w-20 overflow-x-auto md:overflow-y-auto max-h-full md:max-h-[450px] no-scrollbar order-2 md:order-1 mt-4 md:mt-0">
              {thumbnails.map((image, index) => (
                <div key={index} className="mb-2.5 mr-2.5 md:mr-0 flex-shrink-0">
                  <button 
                    type="button"
                    onClick={() => handleThumbnailClick(index)} 
                    className={`relative w-20 h-20 flex items-center justify-center rounded-lg overflow-hidden cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6c6cb7] ${
                      currentImageIndex === index ? 'border-4 border-[#6c6cb7] ring-2 ring-[#6c6cb7]' : 'border-4 border-transparent hover:border-gray-300'
                    }`}
                  >
                    {image.type === 'image' && (
                      <img 
                        src={image.url} 
                        alt={`Book Thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover bg-white"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    )}
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs hidden">
                      <div className="text-center">
                        <div>Invalid</div>
                        <div>Image</div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Main Preview */}
          <div className="w-full md:w-[450px] h-[400px] sm:h-[450px] rounded-md overflow-hidden flex-shrink-0 order-1 md:order-2 md:ml-8">
            {currentImage ? (
              <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <img 
                  key={`preview-${currentImageIndex}`} // Force re-render when index changes
                  src={currentImage.url} 
                  alt={`Book Cover Preview ${currentImageIndex + 1}`} 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="h-full w-full flex items-center justify-center bg-gray-100 hidden">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <p className="text-gray-500">Image failed to load</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <p className="text-gray-500">No images available</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Info Column */}
        <div className="w-full lg:max-w-[35%] flex-grow rounded-md p-2 h-full">
          <div className="text-4xl text-black font-marcellus pt-4">
            {story.name}
          </div>
          <div className="ql-editor flex flex-col text-black text-base" style={{ whiteSpace: 'pre-wrap' }}>
            <p>{story.description || 'A magical personalized storybook adventure.'}</p>
          </div>
          <div className="flex items-center text-2xl mt-4 font-semibold space-x-2">
            {story.old_price && (
              <span className="line-through text-stone-600 opacity-75">TND {story.old_price}</span>
            )}
            <span>TND {story.price}</span>
          </div>
          
          {/* Personalization Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6 border-t border-black border-opacity-15 pt-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                name="child_name" 
                required
                value={formData.child_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 text-black text-sm focus:border-[#6c6cb7] focus:ring focus:ring-[#6c6cb7] focus:ring-opacity-50" 
                placeholder="Enter the child's name"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="customer_phone" 
                required
                value={formData.customer_phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 text-black text-sm focus:border-[#6c6cb7] focus:ring focus:ring-[#6c6cb7] focus:ring-opacity-50" 
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">Choose an Image</label>
              <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md border-2 border-dashed border-gray-300 flex flex-col justify-center items-center w-full h-32 hover:border-[#6c6cb7] hover:bg-gray-50 transition-colors">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <p className="pl-1">Upload a file or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input 
                  id="image-upload" 
                  name="image-upload" 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only file-input"
                />
              </label>
              
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            <button 
              type="submit" 
              disabled={submitting}
              className="px-6 h-10 inline-flex items-center justify-center bg-gradient-to-r from-[#6A5ACD] via-[#7A6ADD] to-[#FAC2FF] hover:from-[#5A4ABD] hover:via-[#6A5ACD] hover:to-[#EAB2EF] hover:shadow-lg border border-transparent rounded text-sm text-white transition ease-in-out duration-300 w-full !font-bold mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Processing...' : 'Order Now'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/books')}
              className="px-6 h-10 inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm text-gray-800 transition ease-in-out duration-300 w-full !font-bold"
            >
              Read Story First
            </button>
          </form>
        </div>
      </div>

      {/* Adored by Millions Section */}
      <div className="bg-zinc-100 border border-neutral-200 rounded-xl px-4 md:px-12 mt-12 w-full relative overflow-hidden max-w-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col space-y-4 items-start justify-center py-12 md:px-24 text-center md:text-left">
            <span className="uppercase tracking-widest text-[#6A5ACD] text-xs md:text-sm font-extrabold w-full" style={{ letterSpacing: '3px' }}>
              HOW OTHERS PERSONALISED THEIR STORIES
            </span>
            <h2 className="text-4xl font-marcellus text-black leading-tight w-full">
              Adored by<br /> millions worldwide
            </h2>
          </div>
    
          <div className="flex flex-row gap-12 items-center justify-center relative py-8 md:py-0">
            <div className="relative w-36 h-36 flex-shrink-0 mt-16 md:mt-32">
              <img 
                src="https://storage.wonderwraps.com/09e96f12-f7d1-48d3-8ba5-24b528c98e16/iyzbgYw3ox8YwgNJDRYvZ4zzffZHIA-metaVGhlby5qcGc=-.jpg" 
                alt="Identity Image" 
                className="object-cover w-full h-full rounded-full"
              />
              <svg className="absolute -top-28 right-[-55px] w-36 h-36 text-[#6A5ACD] z-10" width="113" height="112" viewBox="0 0 113 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.4022 52.3076C42.4085 51.9881 41.7313 51.4496 40.8414 52.3401C37.2081 55.983 34.7371 60.283 33.2731 65.1907C32.5052 67.7651 34.6428 70.1531 37.2119 69.5582C38.1997 69.3297 39.1944 69.0532 40.0883 68.5185C45.4049 65.3405 46.5049 60.366 45.363 54.8201C45.132 53.6941 44.4204 52.6827 43.4022 52.3076ZM102.944 40.369C97.9366 39.4253 93.2916 38.9305 88.6551 38.5273C80.4313 37.8145 72.2455 38.2891 64.2011 40.5039C60.0206 41.6546 55.8667 42.892 51.9721 44.8086C49.4863 46.0304 46.9429 47.2109 44.7302 48.9378C44.3403 49.2408 43.5155 49.5763 44.4432 50.2383C47.5378 52.4529 47.9013 55.8223 48.0994 59.2366C48.2476 61.7805 47.8437 64.361 46.5041 66.4515C44.858 69.0173 42.496 71.0355 39.396 71.7658C38.5574 71.9645 37.8328 72.3987 36.9122 72.4862C33.0274 72.8569 29.3966 66.6337 31.2684 62.6238C32.9983 58.9133 34.7975 55.2716 37.379 52.0698C37.5039 51.9161 37.6587 51.7947 37.5367 51.4091C35.2745 51.5241 32.9999 51.8138 30.727 52.2463C25.5886 53.2256 20.8211 55.2252 16.3906 57.9289C12.4848 60.3109 9.097 63.402 7.00055 67.5805C6.04562 69.4837 5.59329 71.6409 5.50628 73.8049C5.43989 75.4502 5.49683 77.0989 5.50644 78.7474C5.50652 78.926 5.65354 79.1585 5.39678 79.2316C5.2309 79.2779 4.9891 79.2492 4.84572 79.1587C4.56075 78.9737 4.39041 78.6975 4.26867 78.3471C2.43378 73.0674 3.14996 68.1529 6.33671 63.5425C9.77191 58.5665 14.6008 55.3835 19.9333 52.9207C26.162 50.0469 32.6781 48.4182 39.5848 48.9173C40.111 48.9569 40.4896 48.8371 40.9034 48.4873C45.3927 44.7172 50.5729 42.2413 55.9768 40.1178C61.2501 38.0466 66.7104 36.7216 72.2468 35.8256C76.8201 35.0878 81.4774 35.0648 86.1166 35.3369C92.1019 35.6888 98.0001 36.6528 103.892 37.67C104.975 37.8566 105.035 37.875 106.18 37.6013C104.257 36.434 102.488 35.2888 100.649 34.2686C98.1811 32.8957 95.8812 31.2684 93.5267 29.7255C92.7049 29.1885 91.8834 28.6547 90.9475 28.3687C90.0144 28.0839 89.639 27.4204 89.5261 26.5348C89.3768 25.3812 89.9886 24.8733 91.1069 25.2686C93.3334 26.0533 95.2559 27.4149 97.2076 28.6857C100.797 31.0262 104.44 33.2584 108.242 35.2353C108.872 35.5617 109.57 35.822 109.978 36.4956C110.786 37.8255 110.512 38.5222 109.262 39.4213C107.085 40.99 105.03 42.7342 102.896 44.3698C100.578 46.1444 98.2524 47.9026 96.1882 49.9838C95.6208 50.5559 94.7986 50.8497 94.2171 50.3343C93.541 49.7325 93.6987 48.8357 94.2091 48.0597C95.6528 45.8733 97.9356 44.6351 99.8527 42.9833C100.796 42.1689 101.756 41.3733 102.941 40.3724" fill="#6A5ACD"/>
              </svg>
            </div>
    
            <div className="w-[300px] h-[300px] rounded-lg overflow-hidden mt-6 transform rotate-6">
              <img 
                src="https://storage.wonderwraps.com/6eeca8a8-3a46-4995-bb9a-d97bfdaa8dad/kYlYjXM9qyld2nhVqtkjoFMsYzkWgj-metaVGhlby5wbmc=-.png" 
                alt="Artwork Image" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 