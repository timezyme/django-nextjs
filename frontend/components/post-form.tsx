"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ImageIcon, Smile } from "lucide-react"

export default function PostForm() {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)

    // Mock API call - in a real app, this would send data to your Django backend
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Reset form after successful submission
      setContent("")
      console.log("Post submitted:", content)
    } catch (error) {
      console.error("Error submitting post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@johndoe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's happening?"
                className="resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 min-h-[100px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex gap-2">
            <Button type="button" size="icon" variant="ghost" className="rounded-full h-9 w-9">
              <ImageIcon className="h-5 w-5 text-gray-500" />
              <span className="sr-only">Add image</span>
            </Button>
            <Button type="button" size="icon" variant="ghost" className="rounded-full h-9 w-9">
              <Smile className="h-5 w-5 text-gray-500" />
              <span className="sr-only">Add emoji</span>
            </Button>
          </div>
          <Button type="submit" disabled={!content.trim() || isSubmitting} className="rounded-full">
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
