'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React from 'react';
import Topinfo from '@/app/_components/Topinfo';
import Link from 'next/link';
import { z } from 'zod';
import { Resetschema } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { http_instance } from '@/http/axios';
import axios from 'axios';

export default function Resetform() {
  type ResetField = z.infer<typeof Resetschema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ResetField>({
    resolver: zodResolver(Resetschema),
  });


  const onSubmit = async (data: ResetField) => {
    try {
      const response = await http_instance.post('/genarateapikey', data, {
        withCredentials: true,
      });
      console.log('Success response:', response.data);
      alert('Geanrate api key');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.message ||
          'HTTP request error';
        setError('root', { message: msg });
      } else {
        setError('root', { message: 'An unexpected error occurred' });
      }
    }
  };




  return (
    <div className=" flex items-center justify-center p-4">
      <div className="my-8 p-5 bg-gray-800 rounded-lg shadow-2xl max-w-sm w-full border border-gray-700">
        <Topinfo title="Reset" desc="Restore your important account" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
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

          <Button className="w-full bg-pink-600 cursor-pointer hover:bg-pink-700 text-white font-semibold py-3 rounded-md shadow-lg transition duration-200 ease-in-out transform hover:scale-105 ">
            Reset
          </Button>
        </form>
        <div className=" pt-4  w-full ">
          <p className="text-center text-red-400"> {errors.root?.message}</p>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          I remembered my password.{' '}
          <Link
            href="/login"
            className="text-pink-400 hover:text-pink-300 font-medium transition duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
