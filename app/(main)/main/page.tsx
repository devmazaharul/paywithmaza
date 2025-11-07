'use client';

import React, { useEffect, useState } from 'react';
import { useAuthentication } from '@/store/useAuthentication';
import { meType } from '@/types/Responce';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, CreditCard, Zap, Key } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { http_instance } from '@/http/axios';
import { useTransactionList } from '@/store/useTransaction';


type resType={
    message:string;
    status:number;
    item:string[]
  }

export default function DashboardPage() {
  const user = useAuthentication((state) => state.authenticatedUser) as meType | null;
  const trxItems=useTransactionList((state)=>state.transactions)
  const [apiInfo, setapiInfo] = useState<resType | null>()
  const getApiIno=async()=>{
    try {
        const res=await http_instance.get("/apikeys/me")
        if(res.status!==200) throw new Error("Error call api")
          setapiInfo(res.data)
    } catch (error) {
      console.log(error);
      toast.error("Wrong to api call")
    }
  }


  useEffect(()=>{
getApiIno()
  },[])




  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">
          Welcome to your Dashboard
        </h1>

        {/* User Info */}
        <Card className="bg-gray-900 shadow-none border-none">
          <CardHeader>
            <div className="flex items-center gap-4">
              <User size={28} className="text-gray-400" />
              <div>
                <CardTitle className="text-xl font-bold text-gray-100">
                  {user?.item.name || 'User'}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {user?.item.email || 'user@example.com'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-900 p-4 rounded-lg flex flex-col items-center justify-center shadow-md">
              <CreditCard size={24} className="text-green-400 mb-2" />
              <p className="text-gray-300 text-sm">Balance</p>
              <p className="text-xl font-bold text-white">{user?.item.balance || 0} BDT</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg flex flex-col items-center justify-center shadow-md">
              <Zap size={24} className="text-yellow-400 mb-2" />
              <p className="text-gray-300 text-sm">Transactions</p>
              <p className="text-xl font-bold text-white">{trxItems.length}</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg flex flex-col items-center justify-center shadow-md">
              <Key size={24} className="text-pink-400 mb-2" />
              <p className="text-gray-300 text-sm">API Keys</p>
              <p className="text-xl font-bold text-white">{apiInfo?.item.length} Active</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href={'/main/profile'}>
          <Button className="bg-blue-600 cursor-pointer hover:bg-blue-700 w-full flex items-center justify-center gap-2">
            <User size={18} /> Profile
          </Button>
          </Link>
          <Button className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 w-full flex items-center justify-center gap-2">
            <CreditCard size={18} /> Deposit
          </Button>
       <Link href={"/main/send"}>
          <Button className="bg-pink-600 cursor-pointer hover:bg-pink-700 w-full flex items-center justify-center gap-2">
            <Zap size={18} /> Send Money
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
