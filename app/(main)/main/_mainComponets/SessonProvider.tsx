'use client';

import useAuth from '@/app/__hooks/useAuth';
import { setItems } from '@/app/__hooks/useStore';
import React, { useEffect } from 'react';

export default function SessonProvider({ children }: { children: React.ReactNode }) {
  const { data } = useAuth();

  useEffect(() => {
    if (data?.item) {
      setItems('hasUser', data);
    }
  }, [data]);


  // if (!data?.item) {
  //   return <p className="text-yellow-500 text-center mt-10">⚠️ No Connection found.</p>;
  // }

  return <div>{children}</div>;
}
