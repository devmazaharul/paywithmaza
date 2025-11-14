'use client';
import {
 History,
  Key,
  LayoutDashboard,
  LogOut,
  SendIcon,
  Settings,
  User,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import Link from 'next/link';
import { AuroraText } from '@/components/magicui/aurora-text';
import { usePathname } from 'next/navigation';


const items = [
  {
    title: 'Dashboard',
    url: '/main',
    icon: LayoutDashboard,
  },
  {
    title: 'Send Money',
    url: '/main/send',
    icon: SendIcon,
  },
  {
    title: 'Transactions',
    url: '/main/transactions',
    icon: History,
  },
  {
    title: 'Profile',
    url: '/main/profile',
    icon: User,
  },
  {
    title: 'Api Settings',
    url: '/main/api',
    icon: Key,
  },
  {
    title: 'Settings',
    url: '/main/settings',
    icon: Settings,
  },
  {
    title: 'Logout',
    url: '/main/logout',
    icon: LogOut,
  },
];



export function AppSidebar() {

  const pathName=usePathname()

  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-gray-900 border-none text-white min-h-screen px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              <AuroraText>MazaPay</AuroraText>
            </h1>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1 rounded-lg">
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-3 px-4 py-6 transition-all duration-200 hover:bg-gray-800 rounded-lg ${pathName==item.url && 'bg-gray-700 text-white'}`}
                  >
                    <Link href={item.url}>
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                        <span className="text-gray-200 font-medium text-base">{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
