'use client';
import { useAuthentication } from '@/store/useAuthentication';
import { useTransactionList } from '@/store/useTransaction';
import { History, Users } from 'lucide-react';
import React from 'react';

export default function AdditionalInfo() {
  const userIno=useAuthentication((state) => state.authenticatedUser);
  const transInfo=useTransactionList((state) => state.transactions).filter((item)=>item.type=="debit").slice(0,3)
  return (
    <div className="p-3 border border-gray-800 rounded-2xl shadow-2xl ">
      <h1 className="text-lg font-semibold py-2 text-white">Quick Stats</h1>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between text-gray-300">
          <span>Available Balance</span>
          <b className="text-emerald-500 text-base">${userIno?.item.balance}</b>
        </div>
        <div className="flex items-center justify-between text-gray-300">
          <span>This Month Sent</span>
          <span>$12,400.00</span>
        </div>
        <div className="flex items-center justify-between text-gray-300">
          <span>Transfer Limit</span>
          <span>$500,000.00</span>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-300">
          <Users size={18} /> Recent Recipients
        </h2>

        <div className="mt-2 space-y-3">
          {transInfo && transInfo.map((recipient, index) => (
            <div
              key={index}
              className="flex gap-2 items-center justify-between bg-gray-900 p-2 rounded-lg border border-gray-800 hover:bg-gray-800 transition-all shadow"
            >
              <div>
                <p className="font-medium text-white capitalize">{recipient.relatedUserID.name}</p>
                <p className="text-gray-400 text-sm lowercase">{recipient.relatedUserID.email}</p>
              </div>
              <div className="text-right">
                <p className={ `${recipient.type=="debit"?"text-red-500":" text-white"} font-medium`}>${recipient.amount}</p>
                <span className="text-gray-400 flex items-center  text-sm">
                  <History size={13} /> {recipient.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
