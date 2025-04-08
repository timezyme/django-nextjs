// components/Post.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/utils/auth-context';
import { likePost, unlikePost, updatePost } from '@/utils/api';
import { Heart, Edit, Check } from 'lucide-react';

interface PostProps {
  id: number;
  userId: number;
  username: string;
  content: string;
  timestamp: string;
  likeCount: number;
  isLiked: boolean;
}

export default function Post({
  id,
  userId,
  username,
  content,
  timestamp,
  likeCount,
  isLiked: initialIsLiked,
}: PostProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(likeCount);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [postContent, setPostContent] = useState(content);
  
  const isOwner = user?.id === userId;
  const formattedDate = new Date(timestamp).toLocaleString();
  
  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await unlikePost(id);
        setLikes((prev) => prev - 1);
      } else {
        await likePost(id);
        setLikes((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  
  const handleEditSave = async () => {
    try {
      await updatePost(id, editContent);
      setPostContent(editContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  
  return (
    <div className="border rounded-lg p-4 mb-4 bg-surface-50 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <Link href={`/profile/${userId}`} className="text-primary font-medium hover:underline">
            {username}
          </Link>
          <p className="text-sm text-surface-500">{formattedDate}</p>
        </div>
        
        {isOwner && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-surface-500 hover:text-primary"
            aria-label="Edit post"
          >
            <Edit size={18} />
          </button>
        )}
        
        {isEditing && (
          <button
            onClick={handleEditSave}
            className="text-success-600 hover:text-success-700"
            aria-label="Save edits"
          >
            <Check size={18} />
          </button>
        )}
      </div>
      
      <div className="mt-2">
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
            rows={3}
          />
        ) : (
          <p className="whitespace-pre-wrap">{postContent}</p>
        )}
      </div>
      
      <div className="mt-4 flex items-center">
        <button
          onClick={handleLikeToggle}
          disabled={!user}
          className={`flex items-center ${
            isLiked ? 'text-error-500' : 'text-surface-500 hover:text-error-500'
          } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          <span className="ml-1">{likes}</span>
        </button>
      </div>
    </div>
  );
}