'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/utils/auth-context';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-700 bg-gray-800 shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-blue-400">
            Network
          </Link>
          
          <div className="hidden md:flex md:items-center md:space-x-1">
            <Link 
              href="/profile/foo"
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname === '/profile/foo' 
                  ? 'bg-gray-700 text-white font-medium' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Foo
            </Link>
            
            <Link 
              href="/"
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname === '/' 
                  ? 'bg-gray-700 text-white font-medium' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              All Posts
            </Link>
            
            <Link 
              href="/following"
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname === '/following' 
                  ? 'bg-gray-700 text-white font-medium' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Following
            </Link>
          </div>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={() => logout()}
            className="rounded-md border border-gray-600 bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-600"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
} 