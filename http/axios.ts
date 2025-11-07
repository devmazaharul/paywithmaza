
import axios from "axios";
import { httpConfig } from "./http.config";
import { getToekn } from "@/server";



export const http_instance= axios.create({
  baseURL:httpConfig.url,
 
})

http_instance.interceptors.request.use(
  async (config) => {
    const token = await getToekn();
    if (token) {
      config.headers.Authorization =token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export const getTransactions = async (url:string) => {
   const token=await getToekn()
  const response = await http_instance.get(url,{
    headers:{
      "Authorization":token
    }
  });
  return response.data?.items || [];
};
