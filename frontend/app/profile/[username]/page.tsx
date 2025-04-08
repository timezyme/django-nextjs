"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostList from "@/components/post-list"
import { UserPlus, UserMinus } from "lucide-react"

// Mock user data
const userData = {
  username: "johndoe",
  displayName: "John Doe",
  bio: "Software developer | Photography enthusiast | Coffee lover",
  avatar: "/placeholder.svg?height=100&width=100",
  followers: 1024,
  following: 512,
  isFollowing: false,
  isOwnProfile: true,
}

// Mock posts data
const userPosts = [
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
    id: 6,
    username: "johndoe",
    content: "Working on some exciting new features for my app. Can't wait to share them with you all!",
    timestamp: "2023-04-13T16:45:00Z",
    likes: 31,
    isLiked: false,
    isOwnPost: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    username: "johndoe",
    content: "Just finished reading 'Atomic Habits'. Highly recommend it to anyone looking to build better habits!",
    timestamp: "2023-04-10T09:15:00Z",
    likes: 24,
    isLiked: false,
    isOwnPost: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ProfilePage() {
  const params = useParams()
  const username = params.username as string

  // In a real app, you would fetch user data based on the username
  const user = { ...userData, isOwnProfile: username === "johndoe" }

  const [isFollowing, setIsFollowing] = useState(user.isFollowing)
  const [followerCount, setFollowerCount] = useState(user.followers)

  const handleToggleFollow = () => {
    // In a real app, this would send an API request to follow/unfollow
    setIsFollowing(!isFollowing)
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>{user.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-bold">{user.displayName}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
                {!user.isOwnProfile && (
                  <Button
                    onClick={handleToggleFollow}
                    variant={isFollowing ? "outline" : "default"}
                    className="rounded-full"
                  >
                    {isFollowing ? (
                      <>
                        <UserMinus className="h-4 w-4 mr-2" />
                        Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>
                )}
              </div>
              <p>{user.bio}</p>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="font-semibold">{followerCount}</span>{" "}
                  <span className="text-muted-foreground">followers</span>
                </div>
                <div>
                  <span className="font-semibold">{user.following}</span>{" "}
                  <span className="text-muted-foreground">following</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="posts">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="replies">Replies</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-6">
              <PostList posts={userPosts} />
            </TabsContent>
            <TabsContent value="replies" className="mt-6">
              <div className="text-center py-10">
                <p className="text-muted-foreground">No replies yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
