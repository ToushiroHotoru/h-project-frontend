import axios from "axios";
import { LINK as API_URL } from "./changeApiUrl";

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default instance;
