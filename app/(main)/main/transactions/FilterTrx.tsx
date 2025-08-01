'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function FilterTrx({
  onchange,
}: {
  onchange: ({ text, type }: { text: string; type: string }) => void;
}) {
  const [filter, setfilter] = useState({
    type: '',
    text: '',
  });

const handleChange = (name: string, value: string) => {
  const newFilter = {
    ...filter,
    [name]: value,
  };

  setfilter(newFilter);
  onchange(newFilter); // এখানেই আপডেটেড ডাটা পাঠাও
};


  return (
    <div className="p-6 rounded-lg">
      <form className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Search Input */}
          <div className="w-full">
            <div
              className="flex items-center w-full py-2 px-4 border border-gray-700 rounded-lg
               text-gray-100 placeholder-gray-400
               focus-within:ring-1 focus-within:ring-pink-500 focus-within:border-pink-500
               transition duration-200 ease-in-out"
            >
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                value={filter.text}
                onChange={(e) => handleChange('text', e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm"
                placeholder="Search by ID or name..."
              />
            </div>
          </div>

          <div>
            <Select
              value={filter.type}
              onValueChange={(val) => handleChange('type', val)}
            >
              <SelectTrigger
                className="w-full py-2.5 px-4 border border-gray-700 rounded-lg
                           text-gray-100 placeholder-gray-400
                           focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500
                           transition duration-200 ease-in-out"
              >
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border border-gray-600 text-gray-100">
                <SelectItem
                  value="all"
                  className="hover:bg-gray-600 cursor-pointer"
                >
                  All Types
                </SelectItem>
                <SelectItem
                  value="debit"
                  className="hover:bg-gray-600 cursor-pointer"
                >
                  Sent
                </SelectItem>
                <SelectItem
                  value="credit"
                  className="hover:bg-gray-600 cursor-pointer"
                >
                  Received
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Selector */}
          {/* <div>
            <Select
              value={value.status}
              onValueChange={(val) =>
                onchange((prev: any) => ({ ...prev, status: val }))
              }
            >
              <SelectTrigger className="w-full py-2.5 px-4 border border-gray-700 rounded-lg
                           text-gray-100 placeholder-gray-400
                           focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500
                           transition duration-200 ease-in-out">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border border-gray-600 text-gray-100">
                <SelectItem value="all" className="hover:bg-gray-600 cursor-pointer">All Statuses</SelectItem>
                <SelectItem value="pending" className="hover:bg-gray-600 cursor-pointer">Pending</SelectItem>
                <SelectItem value="completed" className="hover:bg-gray-600 cursor-pointer">Completed</SelectItem>
                <SelectItem value="failed" className="hover:bg-gray-600 cursor-pointer">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>
      </form>
    </div>
  );
}
