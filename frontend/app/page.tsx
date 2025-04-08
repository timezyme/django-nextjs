import PostForm from "@/components/post-form"
import PostList from "@/components/post-list"

// Mock data for posts
const posts = [
  {
    id: 1,
    username: "johndoe",
    content: "Just launched my new project! Check it out at threads.net",
    timestamp: "2023-04-15T14:30:00Z",
    likes: 42,
    isLiked: true,
    isOwnPost: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    username: "janedoe",
    content: "Beautiful day for a hike! 🏔️ #nature #outdoors",
    timestamp: "2023-04-15T12:15:00Z",
    likes: 28,
    isLiked: false,
    isOwnPost: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    username: "techguru",
    content:
      "Just tried the new AI features in the latest update. Mind blown! 🤯 What do you all think about the direction AI is heading?",
    timestamp: "2023-04-15T10:45:00Z",
    likes: 56,
    isLiked: true,
    isOwnPost: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    username: "traveladdict",
    content: "Just booked my tickets to Japan! Any recommendations for places to visit in Tokyo? #travel #japan",
    timestamp: "2023-04-15T09:20:00Z",
    likes: 35,
    isLiked: false,
    isOwnPost: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    username: "foodie",
    content:
      "Made homemade pasta for the first time today. It was easier than I expected! Recipe in comments. #cooking #homemade",
    timestamp: "2023-04-14T20:10:00Z",
    likes: 19,
    isLiked: false,
    isOwnPost: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">All Posts</h1>

      <PostForm />

      <PostList posts={posts} />
    </div>
  )
}
