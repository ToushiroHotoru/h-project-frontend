import axios from "axios";
import { LINK as API_URL } from "./changeApiUrl";

const axiosPrivate = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

axiosPrivate.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("token")
      : false;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosPrivate;
