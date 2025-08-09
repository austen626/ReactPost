import { useState, useEffect, useCallback } from 'react'
import { Post, PostListResponse, PostFilters } from '../types/post'
import { postService } from '../services/postService'

interface UsePostsReturn {
  posts: Post[]
  isLoading: boolean
  error: string | null
  total: number
  hasMore: boolean
  refetch: () => void
  setFilters: (filters: PostFilters) => void
  invalidateQueries: () => void
  loadMore: () => void
  isLoadingMore: boolean
}

export const usePosts = (initialFilters: PostFilters = {}): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [filters, setFiltersState] = useState<PostFilters>(initialFilters)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await postService.getPosts(filters)
      
      setPosts(response.posts)
      setTotal(response.total)
      setHasMore(response.hasMore)
      setCurrentPage(1) // Reset to page 1 for new filters
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts')
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  const setFilters = useCallback((newFilters: PostFilters) => {
    setFiltersState(newFilters)
  }, [])

  const refetch = useCallback(() => {
    fetchPosts()
  }, [fetchPosts])

  const invalidateQueries = useCallback(() => {
    // Reset to first page and refetch
    setFiltersState(prev => ({ ...prev, page: 1 }))
    setCurrentPage(1)
  }, [])

  const loadMore = useCallback(async () => {
    if (hasMore && !isLoadingMore) {
      try {
        setIsLoadingMore(true)
        setError(null)
        
        const nextPage = currentPage + 1
        const nextFilters = { ...filters, page: nextPage }
        
        const response = await postService.getPosts(nextFilters)
        
        // Append new posts to existing list
        setPosts(prevPosts => [...prevPosts, ...response.posts])
        setTotal(response.total)
        setHasMore(response.hasMore)
        setCurrentPage(nextPage)
        
        // Don't update filters state to avoid triggering useEffect
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load more posts')
      } finally {
        setIsLoadingMore(false)
      }
    }
  }, [hasMore, isLoadingMore, filters, currentPage])

  // Fetch posts when filters change (but not for pagination)
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return {
    posts,
    isLoading,
    error,
    total,
    hasMore,
    refetch,
    setFilters,
    invalidateQueries,
    loadMore,
    isLoadingMore
  }
} 