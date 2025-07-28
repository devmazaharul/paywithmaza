import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React from 'react'

export default function Savetransaction() {
  return (
    <div>
      <Button className="w-fit flex gap-1 bg-green-500/5 text-green-600 cursor-pointer items-center  border border-green-500 font-medium  py-2 px-4 rounded-md transition-colors hover:bg-green-500 hover:text-white " variant={"default"}><Download size={16}/> Export PDF </Button>
    </div>
  )
}
