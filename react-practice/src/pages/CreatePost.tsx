import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm'
import Toast, { ToastType } from '../components/Toast'
import { postService } from '../services/postService'

const CreatePost: React.FC = () => {
  const navigate = useNavigate()
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [toast, setToast] = useState<{
    isVisible: boolean
    message: string
    type: ToastType
  }>({
    isVisible: false,
    message: '',
    type: 'info'
  })

  const handleCreatePost = async (data: { title: string; content: string }) => {
    try {
      setIsCreatingPost(true)
      await postService.createPost(data)
      
      // Show success toast
      setToast({
        isVisible: true,
        message: 'Post created successfully! Redirecting to posts...',
        type: 'success'
      })
      
      // Redirect to posts page after a short delay
      setTimeout(() => {
        navigate('/posts')
      }, 2000)
    } catch (error) {
      // Show error toast
      setToast({
        isVisible: true,
        message: 'Failed to create post. Please try again.',
        type: 'error'
      })
    } finally {
      setIsCreatingPost(false)
    }
  }

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                React Practice
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/posts')}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm md:text-base transition-colors duration-200"
              >
                Back to Posts
              </button>
              <button
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm md:text-base transition-colors duration-200"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create New Post
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your knowledge and insights with the community. Write about React, TypeScript, 
            web development, or any topic you're passionate about.
          </p>
        </div>

        {/* Post Form */}
        <PostForm
          onSubmit={handleCreatePost}
          isLoading={isCreatingPost}
        />

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Writing Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>Keep your title clear and descriptive</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>Start with an engaging introduction</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>Use code examples when relevant</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>Break content into digestible sections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost 