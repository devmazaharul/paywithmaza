'use client'
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';

export default function Refresh() {
  const refechCall = useQueryClient();
  const [ref, setRef] = useState(false);

  const handleRefresh = () => {
    try {
      setRef(true);
      setTimeout(() => {
        refechCall.invalidateQueries({ queryKey: ['user'] });
        refechCall.invalidateQueries({ queryKey: ['transactions'] });
        setRef(false);
      }, 200);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        variant={'outline'}
        className="text-blue-500 hover:bg-blue-500/20 hover:text-blue-400 bg-blue-500/5 border-blue-600 cursor-pointer"
        onClick={handleRefresh}
      >
        <RefreshCcw className={`${ref && 'animate-spin'}`} />{' '}
        {ref ? 'refreshing...' : ' Refresh'}
      </Button>
    </div>
  );
}
