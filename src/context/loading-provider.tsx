'use client';

import LoadingScreen from '@/components/common/loader/loading-screen';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    // Only show loading if path actually changes
    if (pathname !== previousPath.current) {
      setLoading(true);
      previousPath.current = pathname;
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!loading) return;

    // Auto-hide after 1.5s max even if navigation fails
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loading]);

  return (
    <>
      <LoadingScreen loading={loading} />
      {children}
    </>
  );
}
