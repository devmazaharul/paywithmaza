import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React from 'react';
import Topinfo from '@/app/_components/Topinfo';
import Link from 'next/link';

export default function Resetform() {
  return (
    <div className=" flex items-center justify-center p-4">
      <div className="my-8 p-5 bg-gray-800 rounded-lg shadow-2xl max-w-sm w-full border border-gray-700">
        <Topinfo title="Reset" desc="Restore your important account" />

        <div className="mb-6">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address <span className='text-red-500'>*</span>
          </Label>
          <Input
            name="email"
            id="email"
            placeholder="example@gmail.com"
            type="email"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition duration-200 ease-in-out"
          />
        </div>

 
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
          Reset
        </Button>

        <p className="text-center text-sm text-gray-400 mt-6">
         I remembered my password.{' '}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
