export interface Post {
  id: number
  title: string
  content: string
  excerpt: string
  author: {
    id: number
    name: string
    avatar: string
  }
  category: string
  tags: string[]
  publishedAt: string
  readTime: number
  likes: number
  comments: number
  imageUrl?: string
}

export interface PostListResponse {
  posts: Post[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface PostFilters {
  category?: string
  search?: string
  page?: number
  limit?: number
} 