import { http_instance } from '@/http/axios';
import { meType } from '@/types/Responce';
import { useQuery } from '@tanstack/react-query';

const requestUser = async (url: string): Promise<meType> => {
  return (await http_instance.get(url)).data;
};

export default function useAuth() {
  const useAuthResponse = useQuery<meType>({
    queryKey: ['user'],
    queryFn: () => requestUser('/me'),
    refetchOnWindowFocus: true, 
    staleTime: 0,
    refetchInterval:20000,
    refetchOnMount: true
  });

  return useAuthResponse;
}
