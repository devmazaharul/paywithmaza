'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useState } from "react"

export default function QueryProvier({children}:{children:React.ReactNode}) {
    const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
          {children}
    </QueryClientProvider>
  )
}
