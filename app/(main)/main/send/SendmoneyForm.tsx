'use client'
import { http_instance } from '@/http/axios';
import { SendMoneyschema } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Alertmessage } from '../_mainComponets/Alertmessage';
import { useQueryClient } from '@tanstack/react-query';
export default function SendmoneyForm() {
    const queryclient = useQueryClient();
 type SendMoneyField = z.infer<typeof SendMoneyschema>;
const [status, setstatus] = useState(false)
  const {register,formState:{errors,isSubmitting},handleSubmit,reset,setError}=useForm<SendMoneyField>({
    resolver:zodResolver(SendMoneyschema)
  })


  const onSubmit=async(data:SendMoneyField)=>{
    try {

      const { status } = await http_instance.post(
              '/pay/send',
              data,
              { withCredentials: true }
            );
            if (status !== 200) {
              throw new Error('Faild to send money');
            }
      await queryclient.invalidateQueries({ queryKey: ['transactions'] });

              setstatus(true)
              reset()
    } catch (error) {
        if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.message ||
          'HTTP request error';
        setError('root', { message: msg });
         setstatus(false)
      } else {
        setError('root', { message: 'An unexpected error occurred' });
         setstatus(false)
      }
    }
  }



  return (
    <div className="border border-gray-800 p-4 rounded-lg shadow-md w-full max-w-2xl my-4">
      <h1 className="text-xl font-semibold">Transfer Details</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div className="grid md:grid-cols-2 gap-3 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Recipient Email
            </label>
            <input
            {...register("email")}
              type="email"
              className="mt-1 block w-full p-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter recipient email"
            />
             {errors.email && (
              <p className="text-red-400 pt-1">{errors.email?.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Amount
            </label>
            <input
              {...register("amount",{
                valueAsNumber:true
              })}
              type="number"
              className="mt-1 block w-full p-2  border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="0.00"
            />
                 {errors.amount && (
              <p className="text-red-400 pt-1">{errors.amount?.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Description (Optional)
          </label>
          <textarea
          {...register("message")}
            className="mt-1 block w-full p-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="What this for"
          />
        </div>

        <button
        disabled={isSubmitting}
          type="submit"
          className="w-fit flex gap-1 cursor-pointer items-center  bg-pink-600 hover:bg-pink-700 text-gray-200  py-2 px-4 rounded-md transition-colors"
        >
          {isSubmitting?"sending":"Send Money"} <Send size={19} />
        </button>
        {status && <Alertmessage type='default' title='send successfull' desc='Send money success to your prio number'/>}
        {errors.root && <Alertmessage type='destructive' title='send Faild' desc={errors?.root?.message || "faild to send money"}/>}
      </form>
    </div>
  );
}
