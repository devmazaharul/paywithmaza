import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Topinfo from '@/app/_components/Topinfo';
import Link from 'next/link';

export default function Registerform() {
  return (
    <div className=" flex items-center justify-center p-4">
      <div className="my-8 p-5 bg-gray-800 rounded-lg shadow-2xl max-w-sm w-full border border-gray-700">
        <Topinfo title="Register" desc="Create new account and enjoy now" />

        <div className="mb-5">
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Full Name <span className='text-red-500'>*</span>
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            type="text"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition duration-200 ease-in-out"
          />
        </div>
        <div className="mb-5">
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
        <div className="mb-5">
          <Label
            htmlFor="number"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Mobile Number <span className='text-red-500'>*</span>
          </Label>
          <Input
            id="number"
            placeholder="0191236544"
            type="number"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition duration-200 ease-in-out"
          />
        </div>

        <div className="mb-8">
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Password <span className='text-red-500'>*</span>
          </Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition duration-200 ease-in-out"
          />
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
          Register
        </Button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{' '}
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
