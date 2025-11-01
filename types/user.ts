type status = 'PENDING' | 'VERIFIED' | 'DISABLED';
type role='ADMIN'| 'USER'
export interface userInfo {
  id:string;
  name: string;
  email: string;
  pin: string;
  status: status;
  balance:number;
  isActive:boolean;
  apiKeyLimit:number;
  address:string;
  role:role
}
