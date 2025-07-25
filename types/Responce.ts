export interface Transactions {
  _id: string;
  userId: string;
  amount: number;
  type: 'debit'  | 'credit';
  updatedAt: string;
  trxID: string;
  relatedUserID:{
    name: string;
    email: string;
    _id: string;
  },
  status: 'success' | 'failed' | 'pending';
  typeTitle: string;
}
