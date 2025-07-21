import Header from "../_components/Header"
import "../globals.css"
export default function Adminlayout({children}:Readonly<{
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
          </body>
        </html>
  )
}
