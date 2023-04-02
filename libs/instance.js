import axios from "axios";
import { LINK as API_URL } from "./API_URL";

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default instance;
