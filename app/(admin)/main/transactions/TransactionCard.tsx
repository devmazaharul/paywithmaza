'use client';

import { useQuery } from '@tanstack/react-query';
import { Transactions } from '@/types/Responce';
import { getTransactions } from '@/http/axios';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

type StatusType = 'debit' | 'credit';

const bgColors: Record<StatusType, string> = {
  debit: 'bg-red-100/10',
  credit: 'bg-green-100/10',
};

export default function TransactionCard() {
  const {
    data: trxItems = [],
    isLoading,
    isError,
  } = useQuery<Transactions[]>({
    queryKey: ['transactions'],
    queryFn: () => getTransactions('/pay/transactions'), 
    refetchInterval: 20000,
    staleTime: 0,
  });

  const formatAmount = (amount: number | string) => {
    const parsed = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parsed);
  };

  return (
    <div className="space-y-4 my-6">
      {isLoading && <p className="text-sm text-gray-400">Loading transactions...</p>}
      {isError && <p className="text-sm text-red-500">Failed to load transactions.</p>}
      {!isLoading && trxItems.length === 0 && !isError && (
        <p className="text-sm text-gray-400">No transactions found.</p>
      )}

      {trxItems.map((trx, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-800 bg-gray-900 text-gray-100 shadow-md border border-gray-800 transition"
        >
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full ${bgColors[trx.type]}`}>
              {trx.type === 'debit' ? (
                <ArrowUpRight size={20} className="text-[#d60000]" />
              ) : (
                <ArrowDownLeft size={20} className="text-[#00c32a]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-medium">{trx.relatedUserID?.name || 'Unknown User'}</h1>
              </div>
              <p className="text-sm text-gray-400">{trx.typeTitle}</p>
              <span className="text-xs text-gray-500">
                {format(new Date(trx.updatedAt), 'PPP p')}
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="text-right">
            <h1 className={`text-base font-semibold ${trx.type === 'debit' ? 'text-red-400' : 'text-green-400'}`}>
              {formatAmount(trx.amount)}
            </h1>
            <p className="text-sm text-gray-500">{trx.trxID}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
