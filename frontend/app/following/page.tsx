import PostList from "@/components/post-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for following posts
const followingPosts = [
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

export default function FollowingPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Following</CardTitle>
          <CardDescription>Posts from people you follow</CardDescription>
        </CardHeader>
        <CardContent>
          <PostList posts={followingPosts} />
        </CardContent>
      </Card>
    </div>
  )
}
