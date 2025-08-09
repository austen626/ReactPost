import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Post } from '../types/post'
import { postService } from '../services/postService'
import CommentList from '../components/CommentList'

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return
      
      try {
        setIsLoading(true)
        setError(null)
        const fetchedPost = await postService.getPostById(parseInt(id))
        setPost(fetchedPost)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch post')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                to="/posts"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                ← Back to Posts
              </Link>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                Home
              </Link>
            </div>
          </div>
        </nav>

        {/* Loading Skeleton */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                to="/posts"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                ← Back to Posts
              </Link>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                Home
              </Link>
            </div>
          </div>
        </nav>

        {/* Error State */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The post you are looking for does not exist.'}</p>
            <button
              onClick={() => navigate('/posts')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back to Posts
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/posts"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
            >
              ← Back to Posts
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Post Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Post Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {post.category}
              </span>
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-gray-600 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{post.author.name}</span>
              </div>
              <span>•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {post.excerpt}
            </p>
            
            <div className="text-gray-700 leading-relaxed text-base space-y-4">
              {post.content.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.likes} Likes</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{post.comments} Comments</span>
              </button>
            </div>
            
            <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({post.comments})
          </h2>
          
          <CommentList postId={post.id} />
        </div>
      </div>
    </div>
  )
}

export default PostDetail