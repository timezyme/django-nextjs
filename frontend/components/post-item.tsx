"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import type { Post } from "@/types/post"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, MessageCircle, MoreHorizontal, Pencil, Trash } from "lucide-react"

interface PostItemProps {
  post: Post
  isEditing: boolean
  onEdit: () => void
  onSaveEdit: (content: string) => void
  onCancelEdit: () => void
  onToggleLike: () => void
}

export default function PostItem({ post, isEditing, onEdit, onSaveEdit, onCancelEdit, onToggleLike }: PostItemProps) {
  const [editContent, setEditContent] = useState(post.content)

  const handleSave = () => {
    if (editContent.trim()) {
      onSaveEdit(editContent)
    }
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    } catch {
      // Error occurred formatting timestamp
      return "some time ago"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-y-0 gap-3 pb-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.avatar} alt={`@${post.username}`} />
          <AvatarFallback>{post.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <Link href={`/profile/${post.username}`} className="font-semibold hover:underline">
              @{post.username}
            </Link>
            {post.isOwnPost && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEdit} className="flex items-center">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center text-destructive focus:text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{formatTimestamp(post.timestamp)}</p>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="resize-none min-h-[100px]"
          />
        ) : (
          <p className="whitespace-pre-wrap">{post.content}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        {isEditing ? (
          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" size="sm" onClick={onCancelEdit}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary"
              onClick={onToggleLike}
            >
              <Heart className={`h-4 w-4 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span>{post.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Reply</span>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
