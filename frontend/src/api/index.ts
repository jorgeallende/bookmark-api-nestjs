import axios from "axios";

const BASE_URL = "http://localhost:3333";

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
