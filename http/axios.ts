
import axios from "axios";
import { httpConfig } from "./http.config";

export const http_instance=axios.create({
  baseURL:httpConfig.url,
  withCredentials:true
})



