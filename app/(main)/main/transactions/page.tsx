import Toptitle from '../_mainComponets/Toptitle';
import Savetransaction from './Savetransaction';
import FilterTrx from './FilterTrx';
import TransactionCard from './TransactionCard';
import Refresh from '../_mainComponets/Refresh';

export default function page() {


  return (
    <div>
      <div className="flex items-center justify-between">
        <Toptitle
          title="Transactions"
          desc="View and manage your payment history"
        />
        <Savetransaction />
      </div>

      <div>
        <FilterTrx />
      </div>

      <div className="py-4">
        <div className='flex items-center justify-between'>
          <h1 className="text-2xl font-bold tracking-tight text-white">
          Transaction History{' '}
        </h1>
      <Refresh/>
        </div>
        <TransactionCard />
      </div>
    </div>
  );
}
