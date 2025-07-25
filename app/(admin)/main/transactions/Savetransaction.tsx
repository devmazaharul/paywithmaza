import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React from 'react'

export default function Savetransaction() {
  return (
    <div>
      <Button className="w-fit flex gap-1 text-blue-500 cursor-pointer items-center  border border-blue-500 font-medium  py-2 px-4 rounded-md transition-colors hover:bg-blue-500 hover:text-white " variant={"default"}><Download size={16}/> Export PDF </Button>
    </div>
  )
}
