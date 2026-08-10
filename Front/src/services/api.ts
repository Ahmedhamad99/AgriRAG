import axios from "axios";

import { API } from "@/constants/api";

export const api = axios.create({
  baseURL: API.BASE_URL,

  timeout: 30000,
});