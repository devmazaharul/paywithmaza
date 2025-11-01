import { meType } from '@/types/Responce';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthenticationState {
  authenticatedUser: meType | null;
  setAuthenticatedUser: (user: meType | null) => void;
}

export const useAuthentication = create<AuthenticationState>()(
  persist(
    (set) => ({
      authenticatedUser: null,
      setAuthenticatedUser: (user) => set({ authenticatedUser: user }),
    }),
    {
      name: 'mazapay-auth-storage'
    }
  )
);
