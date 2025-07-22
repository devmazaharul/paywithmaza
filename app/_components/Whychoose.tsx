import { AuroraText } from '@/components/magicui/aurora-text';
import React from 'react';
import Choosecard from './Choosecard';
import { Clock, Earth, LockKeyhole, Users } from 'lucide-react';

export default function Whychoose() {
  return (
    <div className="">
      <div className="w-fit mx-auto">
        <div className="text-center ">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-5xl py-6">
            Why Choose <AuroraText>mazaPay</AuroraText>
          </h1>
          <p className="text-gray-400  w-3/4 mx-auto pb-4">
            Experience the future of digital payments with our cutting-edge
            platform designed for speed, security, and simplicity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 gap-6">
        <Choosecard
          icon={<Users className="text-pink-500 text-2xl w-fit mx-auto" />}
          title="10M+"
          tag="Active Users"
        />
        <Choosecard
          icon={<Earth className="text-pink-500 text-2xl w-fit mx-auto" />}
          title="200+"
          tag="Countries"
        />
        <Choosecard
          icon={
            <LockKeyhole className="text-pink-500 text-2xl w-fit mx-auto" />
          }
          title="99.9%"
          tag="Uptime"
        />
        <Choosecard
          icon={<Clock className="text-pink-500 text-2xl w-fit mx-auto" />}
          title="<5S"
          tag="Average Transfer Time"
        />
      </div>
    </div>
  );
}
