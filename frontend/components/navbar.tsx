// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/utils/auth-context';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="bg-primary text-primary-contrast-500 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Social Network
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`hover:text-primary-contrast-300 ${
                pathname === '/' ? 'font-bold' : ''
              }`}
            >
              All Posts
            </Link>
            
            {user ? (
              <>
                <Link
                  href="/following"
                  className={`hover:text-primary-contrast-300 ${
                    pathname === '/following' ? 'font-bold' : ''
                  }`}
                >
                  Following
                </Link>
                
                <Link
                  href={`/profile/${user.id}`}
                  className={`hover:text-primary-contrast-300 ${
                    pathname.startsWith('/profile') ? 'font-bold' : ''
                  }`}
                >
                  Profile
                </Link>
                
                <button
                  onClick={() => logout()}
                  className="hover:text-primary-contrast-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`hover:text-primary-contrast-300 ${
                    pathname === '/login' ? 'font-bold' : ''
                  }`}
                >
                  Login
                </Link>
                
                <Link
                  href="/register"
                  className={`hover:text-primary-contrast-300 ${
                    pathname === '/register' ? 'font-bold' : ''
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}