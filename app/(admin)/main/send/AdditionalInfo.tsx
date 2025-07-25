import { History, Users } from 'lucide-react';
import React from 'react';

const recipients = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    amount: '$1200',
    lastAction: 'last sent',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    amount: '$850',
    lastAction: 'last sent',
  },
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    amount: '$1,430',
    lastAction: 'last sent',
  },
];

export default function AdditionalInfo() {
  return (
    <div className="p-4 border border-gray-800 rounded-2xl shadow-2xl ">
      <h1 className="text-lg font-semibold py-2 text-white">Quick Stats</h1>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between text-gray-300">
          <span>Available Balance</span>
          <b className="text-emerald-500 text-base">$45,832.00</b>
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
          {recipients.map((recipient, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-900 p-3 rounded-lg border border-gray-800 hover:bg-gray-800 transition-all shadow"
            >
              <div>
                <p className="font-medium text-white capitalize">{recipient.name}</p>
                <p className="text-gray-400 text-sm lowercase">{recipient.email}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">{recipient.amount}</p>
                <span className="text-gray-400 flex items-center gap-1 text-sm">
                  <History size={13} /> {recipient.lastAction}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
