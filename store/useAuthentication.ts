import { meType, Transactions } from '@/types/Responce';
import { create } from 'zustand';

export interface AuthenticationState {
  authenticatedUser: meType | null;
  setAuthenticatedUser: (user: meType | null) => void
}

export const useAuthentication = create<AuthenticationState>((set) => ({
  authenticatedUser: null,
  setAuthenticatedUser: (user) => set({ authenticatedUser: user }),
}));
