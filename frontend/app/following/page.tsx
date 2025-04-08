// app/following/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchFollowingPosts } from '@/utils/api';
import { useAuth } from '@/utils/auth-context';
import Post from '@/components/Post';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/navigation';

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

export default function FollowingPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);
  
  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const data: PaginatedResponse = await fetchFollowingPosts(page);
      setPosts(data.results);
      setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 posts per page
    } catch (err) {
      console.error('Error fetching following posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (user) {
      fetchPosts(currentPage);
    }
  }, [currentPage, user]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  if (authLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  
  if (!user) {
    return null; // Will redirect in the useEffect
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Following</h1>
      
      {loading ? (
        <div className="text-center py-8">Loading posts...</div>
      ) : error ? (
        <div className="text-center py-8 text-error-500">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8">
          You don&apos;t have any posts from people you follow yet.
          <br />
          <a href="/" className="text-primary hover:underline">
            Discover more users
          </a>
        </div>
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