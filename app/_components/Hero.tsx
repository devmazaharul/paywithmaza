import React from 'react';
import { AnimatedText } from './Animatedtext';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Button } from '@/components/ui/button';
import {
  BatteryCharging,
  Earth,
  Play,
  Send,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <main className=" max-h-screen py-10">
      <section className="md:flex items-center justify-around py-6">
        <div>
        <div className='my-3'>
            <AnimatedText title="Instant Global Payments" />
        </div>
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-5xl py-6">
            Payment Made <AuroraText>Simple</AuroraText>
          </h1>
          <p className='text-gray-400 w-2/3 pb-4'>
            Send money anywhere in the world instantly. No hidden fees,
            bank-level security, and trusted by millions of users globally.
          </p>
          <div className="flex items-center gap-6 py-6">
            <Button className="flex items-center gap-1 text-white  hover:bg-gray-800 cursor-pointer" variant={'default'}>
              Start sending money <Send />
            </Button>
            <Button className="flex items-center gap-1 hover:bg-gray-300 text-black border cursor-pointer" variant={"outline"}>
              <Play /> Watch demo
            </Button>
          </div>
          <div className="flex items-center gap-3 md:gap-5 text-gray-400">
            <div className="flex items-center gap-1">
              <ShieldCheck color='#219be8' size={16} /> Bank-level Security{' '}
            </div>
            <div className="flex items-center gap-1">
              <Earth color='#219be8' size={16} /> Bank-level Security{' '}
            </div>
            <div className="flex items-center gap-1">
              <BatteryCharging  color='#219be8' size={16}/> Instant Transfer{' '}
            </div>
          </div>
        </div>

        <div>
          <Image
            src={'/pay.png'}
            width={400}
            height={500}
            alt="hero image"
          />
        </div>
      </section>
    </main>
  );
}
