import Header from "../_components/Header"
import "../globals.css"
import { Toaster } from "@/components/ui/sonner"

export default function Authlayout({children}:Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en">
          <body className=" bg-gray-800 text-white" 
          >
        
           <div className="w-[90%] mx-auto">
              <Header/>
             {children}
           </div>
           <Toaster position="top-right" />
          </body>
        </html>
  )
}
