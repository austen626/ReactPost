import React from 'react'

interface Comment {
  id: number
  author: {
    id: number
    name: string
    avatar: string
  }
  content: string
  publishedAt: string
  likes: number
  replies: Comment[]
  level: number
}

interface CommentListProps {
  postId: number
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  // Mock comments data - in a real app, this would come from an API
  const mockComments: Comment[] = [
    {
      id: 1,
      author: {
        id: 1,
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      content: "This is a really insightful post! I've been working with React for a while now and this approach makes a lot of sense. The way you've structured the components is clean and maintainable.",
      publishedAt: "2024-01-15T10:30:00Z",
      likes: 12,
      replies: [
        {
          id: 2,
          author: {
            id: 2,
            name: "Jane Smith",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
          },
          content: "I completely agree! The component structure is well thought out. Have you tried implementing this pattern in larger applications?",
          publishedAt: "2024-01-15T11:15:00Z",
          likes: 5,
          replies: [
            {
              id: 3,
              author: {
                id: 1,
                name: "John Doe",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              },
              content: "Yes, I've used this pattern in a few production apps. It scales really well and makes testing much easier.",
              publishedAt: "2024-01-15T11:45:00Z",
              likes: 3,
              replies: [],
              level: 2
            }
          ],
          level: 1
        }
      ],
      level: 0
    },
    {
      id: 4,
      author: {
        id: 3,
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
      },
      content: "Great article! I especially liked the section about state management. Zustand is indeed a great choice for smaller to medium-sized applications.",
      publishedAt: "2024-01-15T12:00:00Z",
      likes: 8,
      replies: [],
      level: 0
    },
    {
      id: 5,
      author: {
        id: 4,
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
      },
      content: "This is exactly what I needed! I've been struggling with form validation in React, and the Zod integration looks really clean. Can't wait to try it out.",
      publishedAt: "2024-01-15T13:20:00Z",
      likes: 15,
      replies: [],
      level: 0
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return date.toLocaleDateString()
  }

  const renderComment = (comment: Comment) => (
    <div key={comment.id} className={`mb-6 ${comment.level > 0 ? 'ml-6 md:ml-8 lg:ml-12' : ''}`}>
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="w-10 h-10 rounded-full"
          />
        </div>
        
        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 rounded-2xl p-4">
            {/* Comment Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900 text-sm">
                  {comment.author.name}
                </span>
                <span className="text-gray-500 text-xs">
                  {formatDate(comment.publishedAt)}
                </span>
              </div>
            </div>
            
            {/* Comment Text */}
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              {comment.content}
            </p>
            
            {/* Comment Actions */}
            <div className="flex items-center space-x-4 text-xs">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{comment.likes}</span>
              </button>
              
              <button className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
                Reply
              </button>
              
              <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                Share
              </button>
            </div>
          </div>
          
          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map(reply => renderComment(reply))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Comment Input Placeholder */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
        <div className="text-blue-600 text-lg font-medium mb-2">
          💬 Join the Discussion
        </div>
        <p className="text-blue-700 text-sm mb-4">
          Share your thoughts and experiences with the community
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200">
          Write a Comment
        </button>
        <p className="text-blue-600 text-xs mt-2">
          Comment writing functionality coming in the next task!
        </p>
      </div>

      {/* Comments List */}
      {mockComments.length > 0 ? (
        <div className="space-y-4">
          {mockComments.map(comment => renderComment(comment))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">💭</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
          <p className="text-gray-500">Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  )
}

export default CommentList 