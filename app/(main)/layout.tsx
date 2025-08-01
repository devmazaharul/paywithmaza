import '../globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './main/_mainComponets/Sidebar';
import { Space_Grotesk } from 'next/font/google';
import QueryProvier from './main/_mainComponets/QueryProvier';
import SessonProvider from './main/_mainComponets/SessonProvider';
import { Toaster } from "@/components/ui/sonner"

const Font = Space_Grotesk({
  weight: '400',
  subsets: ['latin'],
  style: 'normal',
});

export default function Adminlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${Font.className} bg-gray-900 text-white`}>
        <QueryProvier>
          <SessonProvider>
            <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <SidebarTrigger className="cursor-pointer bg-gray-700 relative top-4" />
              <div className="p-6">{children}</div>
            </main>
          </SidebarProvider>
          </SessonProvider>
        </QueryProvier>
        <Toaster position='top-center'/>
      </body>
    </html>
  );
}
