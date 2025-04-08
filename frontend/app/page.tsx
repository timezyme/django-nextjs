// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchAllPosts } from '@/utils/api';
import Post from '@/components/Post';
import CreatePost from '@/components/CreatePost';
import Pagination from '@/components/Pagination';

interface PostData {
  id: number;
  user: number;
  username: string;
  content: string;
  timestamp: string;
  like_count: number;
  is_liked: boolean;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PostData[];
}

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const data: PaginatedResponse = await fetchAllPosts(page);
      setPosts(data.results);
      setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 posts per page
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handlePostCreated = () => {
    fetchPosts(1);
    setCurrentPage(1);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Posts</h1>
      
      <CreatePost onPostCreated={handlePostCreated} />
      
      {loading ? (
        <div className="text-center py-8">Loading posts...</div>
      ) : error ? (
        <div className="text-center py-8 text-error-500">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8">No posts found. Be the first to post!</div>
      ) : (
        <div>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              userId={post.user}
              username={post.username}
              content={post.content}
              timestamp={post.timestamp}
              likeCount={post.like_count}
              isLiked={post.is_liked}
            />
          ))}
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}