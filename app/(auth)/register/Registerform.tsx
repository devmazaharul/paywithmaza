'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Topinfo from '@/app/_components/Topinfo';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Registerschema } from '@/utils/validation';
import { http_instance } from '@/http/axios';
import axios from 'axios';

export default function Registerform() {
  type RegisterField = z.infer<typeof Registerschema>;
  const {
    register,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterField>({
    resolver: zodResolver(Registerschema),
  });


const onsubmit = async (
  data: RegisterField
) => {
  try {
    const response = await http_instance.post("/new", data);
    console.log("Success response:", response.data);
    alert("Create success")
  } catch (error: unknown) {
    // Axios error detect
    if (axios.isAxiosError(error)) {
      // API থেকে আসা message থাকলে সেটাকে দেখাও
      const msg = error.response?.data?.message || error.message || "HTTP request error";
      setError("root", { message: msg });
    } else {
      // অন্য কোনো error হলে generic message
      setError("root", { message: "An unexpected error occurred" });
    }
  }
};


  return (
    <div className=" flex items-center justify-center p-4">
      <div className="my-8 p-5 bg-gray-800 rounded-lg shadow-2xl max-w-sm w-full border border-gray-700">
        <Topinfo title="Register" desc="Create new account and enjoy now" />

        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-5">
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register('name')}
              id="name"
              placeholder="John Doe"
              type="text"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition duration-200 ease-in-out"
            />

            {errors.name && (
              <p className="text-red-400 pt-1">{errors.name?.message}</p>
            )}
          </div>
          <div className="mb-5">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register('email')}
              name="email"
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
          <div className="mb-5">
            <Label
              htmlFor="address"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Current Address <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register('address')}
              id="address"
              placeholder="California-USA"
              type="text"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition duration-200 ease-in-out"
            />
            {errors.address && (
              <p className="text-red-400 pt-1">{errors.address?.message}</p>
            )}
          </div>

          <div className="mb-8">
            <Label
              htmlFor="pin"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Pin <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register('pin')}
              id="pin"
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

          <Button
            disabled={isSubmitting}
            className="cursor-pointer w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-md shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            {isSubmitting ? 'Registering' : 'Register'}
          </Button>
        </form>

        <div className=" pt-4  w-full ">
          <p className="text-center text-red-400"> {errors.root?.message}</p>
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{' '}
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
