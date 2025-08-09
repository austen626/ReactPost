import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/PostCard'
import { Post } from '../types/post'
import { postService } from '../services/postService'

const Posts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [categories, setCategories] = useState<string[]>([])
  
  const { posts, isLoading, error, total, hasMore, refetch, setFilters, loadMore, isLoadingMore } = usePosts({
    search: searchTerm,
    category: selectedCategory,
    page: 1,
    limit: 6
  })

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await postService.getCategories()
        setCategories(cats)
      } catch (err) {
        console.error('Failed to fetch categories:', err)
      }
    }
    fetchCategories()
  }, [])

  // Handle search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ search: searchTerm, category: selectedCategory, page: 1 })
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategory, setFilters])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category)
  }

  const handlePostClick = (post: Post) => {
    // In a real app, this would navigate to the post detail page
    console.log('Post clicked:', post.title)
  }

  const handleRetry = () => {
    refetch()
  }

  const handleLoadMore = () => {
    loadMore()
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest Posts
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover insightful articles about React, TypeScript, and modern web development
            </p>
          </div>

          {/* Create Post Button */}
          <div className="text-center mb-6">
            <Link
              to="/create-post"
              className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Create New Post
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleCategoryChange('')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === ''
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {isLoading ? 'Loading posts...' : `Showing ${posts.length} of ${total} posts`}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={handlePostClick}
              />
            ))}
          </div>
        )}

        {/* Loading More Posts Indicator */}
        {isLoadingMore && posts.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading more posts...
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && posts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory 
                ? `No posts match your search criteria. Try adjusting your filters.`
                : 'There are no posts available at the moment.'
              }
            </p>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('')
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className={`px-8 py-3 rounded-xl font-medium border-2 transition-all duration-200 ${
                isLoadingMore
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-50 text-gray-900 border-gray-300 hover:border-gray-400'
              }`}
            >
              {isLoadingMore ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading more posts...
                </div>
              ) : (
                'Load More Posts'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Posts 