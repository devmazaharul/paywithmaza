'use client';
import axios from "axios";
import { httpConfig } from "./http.config";

export const http_instance=axios.create({
  baseURL:"https://mazapay-production.up.railway.app/api",
  withCredentials:true
})


export const getTransactions = async (url:string) => {
  const response = await http_instance.get(url);
  return response.data?.items || [];
};
