// utils/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Configure axios with credentials for session cookie support
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API calls
export const fetchUsers = async () => {
  const response = await apiClient.get('/users/');
  return response.data;
};

export const fetchUser = async (id: number) => {
  const response = await apiClient.get(`/users/${id}/`);
  return response.data;
};

export const registerUser = async (userData: any) => {
  const response = await apiClient.post('/users/', userData);
  return response.data;
};

export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await apiClient.post('/login/', credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post('/logout/');
  return response.data;
};

export const fetchUserPosts = async (userId: number) => {
  const response = await apiClient.get(`/users/${userId}/posts/`);
  console.log('User Posts Response:', response.data);
  return response.data;
};

export const followUser = async (userId: number) => {
  const response = await apiClient.post(`/users/${userId}/follow/`);
  return response.data;
};

export const unfollowUser = async (userId: number) => {
  const response = await apiClient.delete(`/users/${userId}/follow/`);
  return response.data;
};

// Post API calls
export const fetchAllPosts = async (page = 1) => {
  const response = await apiClient.get(`/posts/?page=${page}`);
  console.log('API Response:', response.data);
  return response.data;
};

export const fetchFollowingPosts = async (page = 1) => {
  const response = await apiClient.get(`/posts/following/?page=${page}`);
  console.log('Following Posts Response:', response.data);
  return response.data;
};

export const createPost = async (content: string) => {
  const response = await apiClient.post('/posts/', { content });
  return response.data;
};

export const updatePost = async (postId: number, content: string) => {
  const response = await apiClient.patch(`/posts/${postId}/`, { content });
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await apiClient.delete(`/posts/${postId}/`);
  return response.data;
};

export const likePost = async (postId: number) => {
  const response = await apiClient.post(`/posts/${postId}/like/`);
  return response.data;
};

export const unlikePost = async (postId: number) => {
  const response = await apiClient.delete(`/posts/${postId}/like/`);
  return response.data;
};