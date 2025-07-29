import Toptitle from '../_mainComponets/Toptitle';
import Savetransaction from './Savetransaction';
import TransactionCouple from './TransactionCouple';

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

    <TransactionCouple/>
    </div>
  );
}
