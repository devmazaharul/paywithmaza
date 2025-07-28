import { Transactions } from '@/types/Responce';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthenticationState {
  transactions: Transactions[];
  setTransactions: (transactions: Transactions[]) => void;
}

export const useTransactionList = create<AuthenticationState>()(
  persist(
    (set) => ({
      transactions: [],
      setTransactions: (transactions) => set({ transactions }),
    }),
    {
      name: 'transaction-storage', // ✅ localStorage key name

      // Optional: customize storage method or version
    }
  )
);
