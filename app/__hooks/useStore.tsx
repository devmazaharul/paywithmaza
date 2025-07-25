import { meType } from "@/types/Responce";


export const setItems=(key:string="user",items:meType)=>{
  try {
    const exist=sessionStorage.getItem(key)
    if(exist!==JSON.stringify(items)){
      sessionStorage.setItem(key,JSON.stringify(items))
    }
  } catch  {
    console.log("Add error storage");
  }
}


export const getItems=(key:string)=>{
  try {
    const exist=sessionStorage.getItem(key)
    if(exist) {
      return JSON.parse(exist)
    }else{
      return null
    }
  } catch {
    console.log("Sessonstrage data persist error");
  }
}