"use server"
import { http_instance } from "@/http/axios";
import { meType } from "@/types/Responce";
import { cookies } from "next/headers";


export const getToekn=async()=>{
 const cookie=await cookies()
  const gtoken=cookie.get("mpay_token")?.value
  const token= `Bearer ${gtoken}`
  return token
}

export const requestUser = async (url: string): Promise<meType> => {

    return (
        await http_instance.get(url)
    ).data;
};