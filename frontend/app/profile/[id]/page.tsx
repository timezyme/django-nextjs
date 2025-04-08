// app/profile/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchUser, fetchUserPosts, followUser, unfollowUser } from '@/utils/api';
import { useAuth } from '@/utils/auth-context';
import Post from '@/components/Post';
import Pagination from '@/components/Pagination';
import { UserPlus, UserMinus } from 'lucide-react';

interface UserData {
  id: number;
  username: string;
  bio: string;
  profile_picture: string;
  follower_count: number;
  following_count: number;
  date_joined: string;
}

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

export default function ProfilePage({ params }: { params: { id: string } }) {
  const userId = parseInt(params.id, 10);
  const { user } = useAuth();
  const [profileUser, setProfileUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userData = await fetchUser(userId);
      setProfileUser(userData);
      setFollowerCount(userData.follower_count);
      
      // Check if current user is following this profile
      if (user) {
        // This would require an additional API endpoint to check follow status
        // For now, we'll mock this based on the followers list
        try {
          const response = await fetch(`http://localhost:8000/api/users/${user.id}/following/`);
          const following = await response.json();
          setIsFollowing(following.some((f: any) => f.id === userId));
        } catch (err) {
          console.error('Error checking follow status:', err);
        }
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Failed to load user profile.');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchProfilePosts = async (page = 1) => {
    try {
      const data: PaginatedResponse = await fetchUserPosts(userId);
      setPosts(data.results);
      setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 posts per page
    } catch (err) {
      console.error('Error fetching user posts:', err);
    }
  };
  
  useEffect(() => {
    fetchUserData();
    fetchProfilePosts(currentPage);
  }, [userId, currentPage]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleFollowToggle = async () => {
    if (!user) return;
    
    try {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false);
        setFollowerCount((prev) => prev - 1);
      } else {
        await followUser(userId);
        setIsFollowing(true);
        setFollowerCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };
  
  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }
  
  if (error || !profileUser) {
    return <div className="text-center py-8 text-error-500">{error || 'User not found'}</div>;
  }
  
  const isOwnProfile = user?.id === userId;
  
  return (
    <div>
      <div className="border rounded-lg p-6 mb-6 bg-surface-50 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{profileUser.username}</h1>
            {profileUser.bio && <p className="mt-2">{profileUser.bio}</p>}
            <p className="text-sm text-surface-500 mt-1">
              Joined {new Date(profileUser.date_joined).toLocaleDateString()}
            </p>
            <div className="flex mt-3">
              <div className="mr-4">
                <span className="font-semibold">{followerCount}</span>{' '}
                <span className="text-surface-500">Followers</span>
              </div>
              <div>
                <span className="font-semibold">{profileUser.following_count}</span>{' '}
                <span className="text-surface-500">Following</span>
              </div>
            </div>
          </div>
          
          {user && !isOwnProfile && (
            <button
              onClick={handleFollowToggle}
              className={`mt-4 sm:mt-0 flex items-center px-4 py-2 rounded-md ${
                isFollowing
                  ? 'bg-error-500 text-error-contrast-500 hover:bg-error-600'
                  : 'bg-primary text-primary-contrast-500 hover:bg-primary-600'
              } transition-colors`}
            >
              {isFollowing ? (
                <>
                  <UserMinus size={18} className="mr-1" />
                  Unfollow
                </>
              ) : (
                <>
                  <UserPlus size={18} className="mr-1" />
                  Follow
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      
      {posts.length === 0 ? (
        <div className="text-center py-8 border rounded-lg bg-surface-50">
          No posts yet.
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