'use client';

import useAuth from '@/app/__hooks/useAuth';
import { useAuthentication } from '@/store/useAuthentication';
import React, { useEffect } from 'react';

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useAuth();
  const { setAuthenticatedUser } = useAuthentication();

  useEffect(() => {
    if (data) {
      setAuthenticatedUser(data);
    } else {
      setAuthenticatedUser(null);
    }
  }, [data, setAuthenticatedUser]);

  // Optional fallback UI
  if (isLoading) {
    return (
      <p className="text-yellow-500 text-center mt-10">⚠️ Reconnecting....</p>
    );
  }
  if (!data?.item) {
    return (
      <p className="text-yellow-500 text-center mt-10">
        ⚠️ No Connection found.
      </p>
    );
  }

  return <>{children}</>;
}
