'use client';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Button } from '@/components/ui/button';
import { ListCollapse } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsopen] = useState<boolean>(false);
  return (
    <div className="   py-6 grid grid-cols-4 items-center justify-between">
      <div className="col-span-1">
        <Link
          href={'/'}
          className="text-3xl font-bold tracking-tighter md:text-3xl lg:text-3xl"
        >
          <AuroraText>Transaction</AuroraText>
        </Link>
      </div>

      <div className=" col-span-3   ">
        <div className=" hidden md:block md:flex items-center justify-between">
          <div>
            <ul className="flex items-center relative left-10  gap-8">
              <li>
                <Link href={'/payment'}>Fetures</Link>
              </li>
              <li>
                <Link href={'/payment'}>Security</Link>
              </li>
              <li>
                <Link href={'/payment'}>Pricing</Link>
              </li>
              <li>
                <Link href={'/payment'}>Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-5">
              <Button
                className=" bg-pink-600 cursor-pointer hover:bg-pink-700 text-white font-semibold py-3 rounded-md shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
                
              >
                <Link href={'/login'}>Access</Link>
              </Button>
              <Button className="cursor-pointer text-white" variant={'link'}>
                Get started
              </Button>
            </div>
          </div>
        </div>

        {/*Mobile view*/}
        <div className="md:hidden  text-right">
          <Button  className="cursor-pointer bg-gray-700" onClick={() => setIsopen(!isOpen)}>
            <ListCollapse />
          </Button>

          {isOpen && <h1>Hellow </h1>}
        </div>
      </div>
    </div>
  );
}
