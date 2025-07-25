import React from 'react'

export default function Toptitle({title,desc}:{title:string,desc:string}) {
  return (
    <div>
      <h1 className='text-2xl font-bold tracking-tight text-white'>{title}</h1>
      <p className='text-gray-400 text-sm mt-2'>{desc}</p>
    </div>
  )
}
