import axios from "axios";
import { LINK as API_URL } from "./changeApiUrl";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default $api;
