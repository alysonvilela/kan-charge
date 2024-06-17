import { envs } from "@/lib/envs";
import axios from "axios";

export const api = axios.create({
  baseURL: envs.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization",
    "Access-Control-Allow-Methods": "GET, POST",
  },
});
