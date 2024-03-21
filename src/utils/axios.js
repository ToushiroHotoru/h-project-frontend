import axios from "axios";

import useAuthStore from "@/zustand/auth.zustand";
import { LINK as API_URL } from "./API_URL";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(
  (req) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      req.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    try {
      if (error.response) {
        if (error.response.status === 401) {
          const { data } = await $api.get("/refresh");

          useAuthStore.setState({
            user: data.data.user,
            accessToken: data.data.user.accessToken,
            isAuth: true,
          });

          config.headers.Authorization = `Bearer ${data.accessToken}`;
          return $api(config);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default $api;
