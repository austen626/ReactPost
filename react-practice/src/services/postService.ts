import { Post, PostListResponse, PostFilters } from '../types/post'

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    content: "TypeScript brings static typing to React, making your components more reliable and easier to maintain...",
    excerpt: "Learn how to set up a React project with TypeScript and understand the benefits of type safety in your React applications.",
    author: {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    category: "Development",
    tags: ["React", "TypeScript", "Frontend"],
    publishedAt: "2024-01-15T10:00:00Z",
    readTime: 8,
    likes: 124,
    comments: 23,
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS: A Complete Guide",
    content: "Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML...",
    excerpt: "Discover the power of utility-first CSS with Tailwind and learn how to create beautiful, responsive designs efficiently.",
    author: {
      id: 2,
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    category: "Design",
    tags: ["CSS", "Tailwind", "Design System"],
    publishedAt: "2024-01-14T14:30:00Z",
    readTime: 12,
    likes: 89,
    comments: 15,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "State Management with Zustand: Simple and Effective",
    content: "Zustand is a small, fast, and scalable state management solution with a comfortable API based on hooks...",
    excerpt: "Explore Zustand as an alternative to Redux and learn how to manage application state with minimal boilerplate.",
    author: {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    category: "Development",
    tags: ["React", "Zustand", "State Management"],
    publishedAt: "2024-01-13T09:15:00Z",
    readTime: 10,
    likes: 156,
    comments: 31,
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Building Modern UIs with React Hook Form",
    content: "React Hook Form is a performant, flexible and extensible form library with easy validation...",
    excerpt: "Learn how to build efficient forms with React Hook Form and integrate it with Zod for type-safe validation.",
    author: {
      id: 4,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    category: "Development",
    tags: ["React", "Forms", "Validation"],
    publishedAt: "2024-01-12T16:45:00Z",
    readTime: 15,
    likes: 203,
    comments: 42,
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop"
  },
  {
    id: 5,
    title: "The Future of Web Development: What's Next?",
    content: "As we move forward in 2024, several trends are shaping the future of web development...",
    excerpt: "Explore the emerging technologies and trends that will define web development in the coming years.",
    author: {
      id: 5,
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    category: "Technology",
    tags: ["Web Development", "Trends", "Future"],
    publishedAt: "2024-01-11T11:20:00Z",
    readTime: 18,
    likes: 267,
    comments: 56,
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Optimizing React Performance: Best Practices",
    content: "Performance optimization is crucial for creating smooth user experiences in React applications...",
    excerpt: "Discover proven techniques to improve React app performance and create better user experiences.",
    author: {
      id: 6,
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    category: "Development",
    tags: ["React", "Performance", "Optimization"],
    publishedAt: "2024-01-10T13:10:00Z",
    readTime: 20,
    likes: 189,
    comments: 28,
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop"
  }
]

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API functions
export const postService = {
  // Get all posts with optional filters
  async getPosts(filters: PostFilters = {}): Promise<PostListResponse> {
    await delay(800) // Simulate network delay
    
    let filteredPosts = [...mockPosts]
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }
    
    // Apply category filter
    if (filters.category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === filters.category!.toLowerCase()
      )
    }
    
    // Apply pagination
    const page = filters.page || 1
    const limit = filters.limit || 6
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)
    
    return {
      posts: paginatedPosts,
      total: filteredPosts.length,
      page,
      limit,
      hasMore: endIndex < filteredPosts.length
    }
  },

  // Get a single post by ID
  async getPostById(id: number): Promise<Post> {
    await delay(500) // Simulate network delay
    
    const post = mockPosts.find(p => p.id === id)
    if (!post) {
      throw new Error('Post not found')
    }
    
    return post
  },
  
  // Get categories
  async getCategories(): Promise<string[]> {
    await delay(300)
    const categories = [...new Set(mockPosts.map(post => post.category))]
    return categories
  },

  // Create a new post
  async createPost(postData: { title: string; content: string }): Promise<Post> {
    await delay(1000) // Simulate network delay
    
    const newPost: Post = {
      id: Math.max(...mockPosts.map(p => p.id)) + 1,
      title: postData.title,
      content: postData.content,
      excerpt: postData.content.length > 150 
        ? postData.content.substring(0, 150) + '...' 
        : postData.content,
      author: {
        id: 1, // Mock user ID
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      category: "Development",
      tags: ["React", "TypeScript"],
      publishedAt: new Date().toISOString(),
      readTime: Math.ceil(postData.content.split(' ').length / 200), // Rough estimate
      likes: 0,
      comments: 0
    }
    
    mockPosts.unshift(newPost) // Add to beginning of array
    return newPost
  }
} 