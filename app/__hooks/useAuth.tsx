import { requestUser } from '@/server';
import { meType } from '@/types/Responce';
import { useQuery } from '@tanstack/react-query';

export default function useAuth() {
    const useAuthResponse = useQuery<meType>({
        queryKey: ['user'],
        queryFn: () => requestUser('/me'),
        refetchOnWindowFocus: true,
        staleTime: 0,
        refetchInterval: 20000,
        refetchOnMount: true,
    });

    return useAuthResponse;
}
