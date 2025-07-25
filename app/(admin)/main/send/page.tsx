import React from 'react'
import Toptitle from '../_mainComponets/Toptitle'
import SendmoneyForm from './SendmoneyForm'
import AdditionalInfo from './AdditionalInfo'

export default function page() {
  return (
    <div className='w-full '>
      <Toptitle title='Send Money' desc='Transfer funds quickly and securely'/>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 items-start'>
         <div className='md:col-span-2 '>
           <SendmoneyForm />
         </div>
         <div className='md:col-span-1'>
           <AdditionalInfo />
         </div>
      </div>
    </div>
  )
}
