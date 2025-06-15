'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Allow access to login and signup pages without authentication
  const publicPaths = ['/login', '/signup'];

  useEffect(() => {
    if (!user && !publicPaths.includes(pathname)) {
      router.push('/login');
    }
  }, [user, pathname, router]);

  // Optionally show a loading or redirecting message
  if (!user && !publicPaths.includes(pathname)) {
    return <div>Redirecting to login...</div>;
  }

  return children;
}