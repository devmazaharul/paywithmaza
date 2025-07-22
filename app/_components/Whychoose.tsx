import { AuroraText } from '@/components/magicui/aurora-text';
import React from 'react';
import Choosecard from './Choosecard';
import {
  ChartNoAxesColumnDecreasing,
  Clock,
  CreditCard,
  Earth,
  Landmark,
  LockKeyhole,
  Send,
  Signal,
  Smartphone,
  Users,
} from 'lucide-react';
import Servicescard from './Servicescard';

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

      <div className="w-fit mx-auto">
        <div className="text-center ">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-5xl py-6">
            <AuroraText>Benifit</AuroraText> Of MazaPay
          </h1>
          <p className="text-gray-400  w-3/4 mx-auto pb-4">
            Experience the future of digital payments with our cutting-edge
            platform designed for speed, security, and simplicity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-10 gap-6">
        <Servicescard
          icon={
            <Send
              size={30}
              className="text-yellow-500 w-fit mx-auto mb-2"
            />
          }
          title="Instant Transfers"
          desc="Send money anywhere in the world in seconds, not days. Our lightning-fast network ensures your payments arrive instantly."
        />
        <Servicescard
          icon={
            <Landmark
              size={30}
              className="text-cyan-500 w-fit mx-auto mb-2"
            />
          }
          title="Bank-Level Security"
          desc="Advanced encryption and fraud protection keep your money safe. Trusted by millions of users worldwide."
        />
        <Servicescard
          icon={
            <Signal
              size={30}
              className="text-fuchsia-500 w-fit mx-auto mb-2"
            />
          }
          title="Global Reach"
          desc="Send money to 200+ countries and territories. Support for multiple currencies with real-time exchange rates."
        />
        <Servicescard
          icon={
            <CreditCard
              size={30}
              className="text-green-500 w-fit mx-auto mb-2"
            />
          }
          title="Multiple Methods"
          desc="Link your bank account, debit card, or credit card. Choose the payment method that works best for you."
        />
        <Servicescard
          icon={
            <Smartphone
              size={30}
              className="text-yellow-500 w-fit mx-auto mb-2"
            />
          }
          title="Mobile First"
          desc="Manage your payments on the go with our intuitive mobile app. Available for iOS and Android."
        />
        <Servicescard
          icon={
            <ChartNoAxesColumnDecreasing
              size={30}
              className="text-pink-500 w-fit mx-auto mb-2"
            />
          }
          title="Low Fee"
          desc="Transparent pricing with no hidden fees. Save money on every transaction compared to traditional banks."
        />
      </div>
    </div>
  );
}
