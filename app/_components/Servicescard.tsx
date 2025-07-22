import React from 'react'

export default function Servicescard({icon,title,desc}:{icon:React.ReactNode,title:string,desc:string}) {
  return (
    <div className="text-center w-full mx-auto border border-gray-700 shadow-2xl rounded-2xl p-5 hover:bg-gray-700">
      <p>{icon}</p>
      <h1 className="text-3xl font-bold py-2">{title}</h1>
      <p className="text-gray-400">{desc}</p>
    </div>
  )
}
