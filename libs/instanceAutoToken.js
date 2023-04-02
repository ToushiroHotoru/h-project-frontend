import axios from "axios";
import { LINK as API_URL } from "./API_URL";

const instanceAutoToken = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

instanceAutoToken.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instanceAutoToken;
