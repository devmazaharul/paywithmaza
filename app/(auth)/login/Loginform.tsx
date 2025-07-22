'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React from 'react';
import Topinfo from '@/app/_components/Topinfo';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loginschema } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Loginform() {
  type LoginField = z.infer<typeof Loginschema>;

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginField>({
    resolver: zodResolver(Loginschema),
  });

  const onSubmit=async(data:LoginField)=>{
console.log(data);
  }


  return (
    <div className=" flex items-center justify-center p-4">
      <div className="my-8 p-5 bg-gray-800 rounded-lg shadow-2xl max-w-sm w-full border border-gray-700">
        <Topinfo title="Login" desc="Access your account and injoy now" />

     <form onSubmit={handleSubmit(onSubmit)}>
         <div className="mb-5">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            {...register('email')}
            id="email"
            placeholder="example@gmail.com"
            type="email"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition duration-200 ease-in-out"
          />
          {errors.email && (
            <p className="text-red-400 pt-1">{errors.email?.message}</p>
          )}
        </div>

        <div className="mb-8">
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Pin <span className="text-red-500">*</span>
          </Label>
          <Input
            {...register('pin')}
            id="password"
            type="number"
            placeholder="Enter your Pin"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition duration-200 ease-in-out"
          />
          {errors.pin && (
            <p className="text-red-400 pt-1">{errors.pin?.message}</p>
          )}
        </div>

        <Button className="w-full  bg-pink-600 hover:bg-pink-700 cursor-pointer text-white font-semibold py-3 rounded-md shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
          Login
        </Button>
        
     </form>
        <div className=" pt-4  w-full ">
          <p className="text-center text-red-400"> {errors.root?.message}</p>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-pink-400 hover:text-pink-300 font-medium transition duration-200"
          >
            Register
          </Link>
        </p>
        <p className="text-center text-sm text-gray-400 mt-2">
          <Link
            href="/reset"
            className="text-pink-400 hover:text-pink-300 font-medium transition duration-200"
          >
            Reset
          </Link>{' '}
          If You Forget Your Password
        </p>
      </div>
    </div>
  );
}
