// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/utils/auth-context';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Social Network',
  description: 'A social media platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="theme">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto py-8 px-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}