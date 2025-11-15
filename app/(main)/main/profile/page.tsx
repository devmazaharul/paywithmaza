'use client';
import React, { useEffect, useState } from 'react';

import {
  CheckCircle,
  ShieldCheck,
  CreditCard,
  ArrowUpCircle,
  Edit2,
  Camera,
  DollarSign,
} from 'lucide-react';
import { toast } from 'sonner';
import { http_instance } from '@/http/axios';
import { userInfo } from '@/types/user';
import { CustomError } from '@/responce/error';
import { useTransactionList } from '@/store/useTransaction';
import { formatBDT } from '@/utils/validation';
import TransactionCard from '../transactions/TransactionCard';
import Link from 'next/link';


export default function ProfilePage() {

const [info,setInfo]=useState<userInfo & {createdAt:Date,_id:string}>()

const transactions=useTransactionList((state)=>state.transactions)

const totalSendAmount = transactions.reduce((acc, curr) => {
  return curr.type === "debit" ? acc + curr.amount : acc;
}, 0);


const totalReceivedAmount = transactions.reduce((acc, curr) => {
  return curr.type === "credit" ? acc + curr.amount : acc;
}, 0);

useEffect(()=>{
  const getInfo=async()=>{
    try {
        const callUserApi=await http_instance.get("/me")
        if(callUserApi.status!==200) throw new CustomError("invalid users info")
       if(callUserApi.data && callUserApi.data.status==200){
         setInfo(callUserApi.data.item)
       }
    } catch  {
      toast.error("Something went wrong")
    }
  }
  getInfo()
},[])




  return (
<>
{info &&     <div className="min-h-screen  text-white p-6">
      <div className="mx-auto max-w-4xl">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: profile card */}
          <div className="col-span-2 rounded-2xl p-5 ">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center overflow-hidden">
               
                  <div className="text-2xl font-bold text-white">
                    {info?.name
                      .split(' ')
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
         
                <button
                  title="Change avatar"
                  className="absolute bottom-0 right-0 -translate-y-1/2 translate-x-1/2 bg-black/40 p-1 rounded-full border border-zinc-700"
                  onClick={() => alert('Open avatar upload modal')}
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{info.name}</h2>
                  {info.isActive && (
                    <span
                      title="Verified"
                      className="inline-flex items-center gap-1 text-sm text-emerald-300"
                    >
                      <CheckCircle className="w-4 h-4" /> Verified
                    </span>
                  )}
                </div>

                <p className="text-sm text-zinc-400 mt-1">{info.email}</p>
                <p className="text-sm text-zinc-400 truncate">{info.address.slice(0,30)}</p>

                <div className="mt-3 flex gap-2">
              
                  <button
                    onClick={() => alert('Edit profile')}
                    className="ml-auto flex items-center gap-2 px-2 py-2 bg-transparent border border-zinc-700 rounded-lg hover:border-zinc-600 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Balance card */}
            <div className="mt-6  p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Available balance</p>
                  <p className="text-2xl font-semibold mt-1">
              
                    {formatBDT(info.balance)}
                  </p>
                </div>
                <div className="flex  items-end gap-2">
                  <div className="text-xs text-zinc-400">Account ID: </div>
                  <div className="font-mono text-xs text-zinc-300 mt-1">
                    {info._id.slice(0,8) || 'xxxxxxxx'}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-800 rounded-full">
                  <CreditCard className="w-4 h-4 text-zinc-300" />
                  <span className="text-zinc-300">Linked: Bank • Bkash</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-800 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  
                </div>
              </div>
            </div>
          </div>

          {/* Middle: stats */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 gap-6">
            <div className="shadow p-4 ">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Account Overview</h3>
                <div className="text-sm text-zinc-400">Last 30 days</div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-gray-800/40">
                  <div className="text-sm text-zinc-300">Sent</div>
                  <div className="text-xl font-semibold mt-1 text-red-700">
               {formatBDT(totalSendAmount)}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">transactions</div>
                </div>

                <div className="p-4 rounded-lg bg-gray-800/40">
                  <div className="text-sm text-zinc-300">Received</div>
                  <div className="text-xl font-semibold mt-1 text-emerald-600">
                   {formatBDT(totalReceivedAmount)}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">transactions</div>
                </div>

                <div className="p-4 rounded-lg bg-gray-800/40">
                  <div className="text-sm text-zinc-300">Net balance</div>
                  <div className="text-xl font-semibold mt-1 text-pink-600">
                   {formatBDT(totalReceivedAmount-totalSendAmount)}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">transactions</div>
                </div>

               
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gray-900/60   p-4 ">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <div >
              
               
               <TransactionCard trxItems={transactions.slice(0,5)}/>
              </div>

              {/* <div className="mt-3 divide-y divide-gray-800">
                {u.recentTransactions && u.recentTransactions.length > 0 ? (
                  u.recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="py-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-md grid place-items-center ${
                            tx.type === 'in' ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                        >
                          {tx.type === 'in' ? (
                            <ArrowDownCircle className="w-5 h-5 text-white" />
                          ) : (
                            <ArrowUpCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{tx.title}</div>
                          <div className="text-xs text-zinc-400">
                            {new Date(tx.date).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`font-semibold ${
                            tx.type === 'in'
                              ? 'text-emerald-300'
                              : 'text-red-300'
                          }`}
                        >
                          {tx.type === 'in' ? '+' : '-'}{' '}
                          {formatMoney(tx.amount, tx.currency ?? u.currency)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-zinc-400">
                    No recent transactions
                  </div>
                )}
              </div>
           */}
            </div>
          </div>
        </div>

        {/* Footer / actions */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-zinc-500">
            Account created on <span className="text-zinc-300">{new Date(info.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex gap-2">
           <Link href={"/main/send"} className='cursor-pointer'>
            <button
            
              className="px-4 py-2 rounded-lg cursor-pointer bg-pink-600 hover:bg-pink-700 transition"
            >
              <DollarSign className="w-4 h-4 inline-block mr-2" /> Send Money
            </button>
           </Link>

           <Link href={"/main/settings"}>
            <button
              
              className="px-4 py-2 rounded-lg cursor-pointer border border-zinc-800 hover:border-zinc-700 transition"
            >
              Settings
            </button>
           </Link>
          </div>
        </div>
      </div>
    </div>}
</>
  );
}
