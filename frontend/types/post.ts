export interface Post {
  id: number
  username: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
  isOwnPost: boolean
  avatar: string
}