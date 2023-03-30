import axios from "axios";
import { LINK as API_URL } from "./changeApiUrl";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

const $api2 = axios.create({
  withCredentials: true,
  baseURL: "",
});

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      console.log(error);
      const response = await axios.get(
        `http://localhost:3000/api/refresh_token`,
        { withCredentials: true }
      );
      // console.log(2);
      // return $api.request(originalRequest);
    }
  }
);

export default $api;
