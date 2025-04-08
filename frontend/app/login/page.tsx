// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/utils/auth-context';
import Link from 'next/link';

export default function LoginPage() {
  const { login, error: authError, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    await login(username, password);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
      
      <div className="border rounded-lg p-6 bg-surface-50 shadow-sm">
        <form onSubmit={handleSubmit}>
          {authError && (
            <div className="bg-error-100 text-error-800 p-3 rounded-md mb-4">
              {authError}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !username || !password}
            className={`w-full py-2 rounded-md bg-primary text-primary-contrast-500 hover:bg-primary-600 transition-colors ${
              loading || !username || !password ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}