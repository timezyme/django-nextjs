"use client"

import { useState } from "react"
import type { Post } from "@/types/post"
import PostItem from "@/components/post-item"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PostListProps {
  posts: Post[]
  postsPerPage?: number
}

export default function PostList({ posts, postsPerPage = 10 }: PostListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [editingPostId, setEditingPostId] = useState<number | null>(null)

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleEditPost = (postId: number) => {
    setEditingPostId(postId)
  }

  const handleSaveEdit = (postId: number, newContent: string) => {
    // In a real app, this would send an API request to update the post
    console.log("Saving edit for post", postId, "with content:", newContent)
    setEditingPostId(null)
  }

  const handleCancelEdit = () => {
    setEditingPostId(null)
  }

  const handleToggleLike = (postId: number) => {
    // In a real app, this would send an API request to toggle the like status
    console.log("Toggling like for post", postId)
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No posts to display</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {currentPosts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          isEditing={post.id === editingPostId}
          onEdit={() => handleEditPost(post.id)}
          onSaveEdit={(content) => handleSaveEdit(post.id, content)}
          onCancelEdit={handleCancelEdit}
          onToggleLike={() => handleToggleLike(post.id)}
        />
      ))}

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevPage}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            <PaginationItem className="flex items-center">
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
