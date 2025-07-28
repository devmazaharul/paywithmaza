export interface Register {
  name:string,
  email:string,
  address:string,
  pin:number
}
export interface Sendmoney {
  email:string,
  amount:number,
  message?:string,
}