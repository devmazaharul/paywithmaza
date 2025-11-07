import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../globals.css";
import Header from "../_components/Header";
import { Toaster } from "@/components/ui/sonner"
import Footer from "../_components/Footer";

const Font=Space_Grotesk({
  weight: '400',
  subsets:["latin"],
  style:"normal"
})


export const metadata: Metadata = {
  title: "Pay with maza",
  description: "Developed by mazaharul islam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={`${Font.className}  antialiased bg-gray-800 text-white`}
      >
    
       <div className="w-[90%] mx-auto">
            <Header/>
         {children}
        
       </div>
        <Footer/>
       <Toaster position="top-right" />
      </body>
    </html>
  );
}
