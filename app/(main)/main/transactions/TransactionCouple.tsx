'use client';
import React, { useEffect, useState } from 'react';
import FilterTrx from './FilterTrx';
import Refresh from '../_mainComponets/Refresh';
import TransactionCard from './TransactionCard';
import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '@/http/axios';
import { Transactions } from '@/types/Responce';
import { useAuthentication } from '@/store/useAuthentication';
import { useTransactionList } from '@/store/useTransaction';

interface filerType {
  type: string;
  text: string;
}

export default function TransactionCouple() {
  const [alltranaction, setalltransaction] = useState<Transactions[]>([]);
  const [tranaction, settransaction] = useState<Transactions[]>([]);
  const [filter, setFilter] = useState<filerType>({
    type: '',
    text: '',
  });

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<Transactions[]>({
    queryKey: ['transactions'],
    queryFn: () => getTransactions('/pay/transactions'),
    staleTime: 0,
    refetchInterval: 1000 * 60,
  });

  const { authenticatedUser } = useAuthentication();
  const balance = authenticatedUser?.item.balance;
  const { transactions, setTransactions } = useTransactionList();

  // Save original data in zustand
  useEffect(() => {
    if (JSON.stringify(transactions) !== JSON.stringify(data)) {
      setTransactions(data);
    }
  }, [data]);

  // Save to local state
useEffect(() => {
  if (data.length > 0) {
    setalltransaction(data);
    settransaction(data); // default show all
  }
}, [data]);


  // ✅ Apply filter only on `alltranaction`
  useEffect(() => {
    let filtered = alltranaction;

    if (filter.text) {
      filtered = filtered.filter((trx: Transactions) =>
        (trx.relatedUserID.name+" "+trx.trxID.toString()).toLowerCase().includes(filter.text.toLocaleLowerCase())

      );
    }

    if (filter.type && filter.type !== 'all') {
      filtered = filtered.filter((trx) => trx.type === filter.type);
    }

    settransaction(filtered);
  }, [filter, alltranaction]);


  return (
    <>
      <div>
        <FilterTrx
          onchange={(item) =>
            setFilter((pre) => ({
              ...pre,
              type: item.type,
              text: item.text,
            }))
          }
        />
      </div>

      <div className="py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Transaction History
          </h1>
          <Refresh />
        </div>

        <div>
          <div className="my-3">
            <h1>
              Total balance:{' '}
              <span
                className={`${
                  Number(balance) > 50 ? 'text-emerald-500' : 'text-red-500'
                } font-semibold text-xl`}
              >
                {balance} BDT
              </span>
            </h1>
          </div>

          {isLoading && (
            <p className="text-sm text-gray-400">Loading transactions...</p>
          )}
          {isError && (
            <p className="text-sm text-red-500">Failed to load transactions.</p>
          )}
          {!isLoading && tranaction.length === 0 && !isError && (
            <p className="text-sm text-red-400">No transactions found.</p>
          )}

          {/* ✅ Show filtered transactions */}
          <TransactionCard trxItems={tranaction} />
        </div>
      </div>
    </>
  );
}
