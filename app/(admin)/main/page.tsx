"use client"
import { useGetAccessFromStore } from '@/hooks/useStore'
import React from 'react'

export default function Page() {
  const getData = useGetAccessFromStore()

  return (
    <div>
      <h1>Hi, {getData?.data?.item?.name}</h1>
      <h1>Addrss, {getData?.data?.item?.address}</h1>
      <h1>Email, {getData?.data?.item?.email}</h1>
      
    </div>
  )
}
