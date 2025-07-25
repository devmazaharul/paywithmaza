'use client'
import { Send } from 'lucide-react';

export default function SendmoneyForm() {


  return (
    <div className="border border-gray-800 p-4 rounded-lg shadow-md w-full max-w-2xl my-4">
      <h1 className="text-xl font-semibold">Transfer Details</h1>

      <form  className="mt-4 space-y-4">
        <div className="grid md:grid-cols-2 gap-3 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Recipient Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter recipient email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Amount
            </label>
            <input
              type="number"
              className="mt-1 block w-full p-2  border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Description (Optional)
          </label>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="What this for"
          />
        </div>

        <button
          type="submit"
          className="w-fit flex gap-1 cursor-pointer items-center  bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 rounded-md transition-colors"
        >
          Send Money <Send size={19} />
        </button>
      </form>
    </div>
  );
}
