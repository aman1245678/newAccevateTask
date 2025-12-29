import axios from "axios";

const BASE_URL = "https://aapsuj.accevate.co/flutter-api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
