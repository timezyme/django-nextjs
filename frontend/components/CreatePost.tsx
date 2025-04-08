// components/CreatePost.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/utils/auth-context';
import { createPost } from '@/utils/api';

interface CreatePostProps {
  onPostCreated: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;
    
    setIsSubmitting(true);
    try {
      await createPost(content);
      setContent('');
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!user) {
    return (
      <div className="border rounded-lg p-4 mb-6 bg-surface-50 text-center">
        <p>Please log in to create a post.</p>
      </div>
    );
  }
  
  return (
    <div className="border rounded-lg p-4 mb-6 bg-surface-50 shadow-sm">
      <h2 className="text-lg font-medium mb-3">Create a new post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-primary focus:outline-none"
          rows={4}
          required
        />
        
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className={`px-4 py-2 rounded-md bg-primary text-primary-contrast-500 hover:bg-primary-600 transition-colors ${
              isSubmitting || !content.trim() ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}