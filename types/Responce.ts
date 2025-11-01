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


export interface meType{
  messgae:string,
  status:number,
  item:{
    name:string,
    email:string,
    address:string;
    _id:string,
    balance:number,
    role:string,
  }
}
