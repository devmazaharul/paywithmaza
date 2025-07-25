'use client';

import { Transactions } from '@/types/Responce';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { http_instance } from '@/http/axios';
import axios from 'axios';
import { transactionsDumyData } from '@/data/trData';

type StatusType = 'debit' | 'credit';

const statusColors: Record<StatusType, string> = {
  debit: 'text-red-600',
  credit: 'text-green-600',
};

const bgColors: Record<StatusType, string> = {
  debit: 'bg-red-100/10',
  credit: 'bg-green-100/10',
};

const TransactionCard = () => {
  const [trxItems, setTrxItems] = useState<Transactions[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const transactionsList = async () => {
      try {
        const response = await http_instance.get('/pay/transactions');
        if (response.status === 200) {
          setTrxItems(response.data?.items || []);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setErrorMsg(error.response.data?.message || "❌ Server responded with an error.");
          } else if (error.request) {
            setErrorMsg("❌ No response from server. Network issue?");
          } else {
            setErrorMsg("⚠️ Request error: " + error.message);
          }
        } else {
          setErrorMsg("💥 Unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    transactionsList();
  }, []);

  const formatAmount = (amount: number | string) => {
    const parsed = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parsed);
  };


  return (
    <div className="space-y-4 my-6">
      {loading && <p className="text-sm text-gray-400">Loading transactions...</p>}
      {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
      {!loading && trxItems.length === 0 && !errorMsg && (
        <p className="text-sm text-gray-400">No transactions found.</p>
      )}

      {transactionsDumyData.map((trx, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-800 bg-gray-900 text-gray-100 shadow-md border border-gray-800 transition"
        >
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full ${bgColors[trx.type]}`}>
              {trx.type === 'debit' ? (
                <ArrowUpRight size={20} className="text-red-500" />
              ) : (
                <ArrowDownLeft size={20} className="text-green-500" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-medium">{trx.relatedUserID?.name || 'Unknown User'}</h1>
                <span className={`text-xs px-2 py-0.5 rounded-md ${statusColors[trx.type]}`}>
                  ({trx.type})
                </span>
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
};

export default TransactionCard;
