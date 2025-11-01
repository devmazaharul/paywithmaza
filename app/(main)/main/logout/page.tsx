'use client';
import { Button } from '@/components/ui/button';
import { http_instance } from '@/http/axios';
import { useAuthentication } from '@/store/useAuthentication';
import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle2Icon, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();

  const queryclient = useQueryClient();
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication();
  const handlelogout = async () => {
    await http_instance.post('/logout', {});
    queryclient.clear();
    setAuthenticatedUser(null);
    
    toast.warning('Logout successfully', {
      duration: 2000,
      description: 'You have been logged out successfully.',
      icon: <CheckCircle2Icon className="h-5 w-5 bg-grau-900" />,
    });

    router.replace('/login');
  };

  return (
    <div className="flex items-center justify-center ">
      <Button
        variant="outline"
        onClick={handlelogout}
        className="flex items-center gap-2 border bg-red-500/10 border-red-500 text-red-600 hover:bg-red-600/10 cursor-pointer hover:text-red-700 transition-colors duration-200 px-6 py-3  rounded-md"
      >
        <LogOut className="h-5 w-5" />
        <span className="font-medium">
          Logout {authenticatedUser?.item.name}
        </span>
      </Button>
    </div>
  );
}
