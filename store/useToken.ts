import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TokenState {
    token: string | null;
    setToekn: (user: string | null) => void;
}

export const useTokenStore = create<TokenState>()(
    persist(
        (set) => ({
            token: null,
            setToekn: (user) => set({ token: user }),
        }),
        {
            name: 'mazapay-token-storage',
        },
    ),
);
