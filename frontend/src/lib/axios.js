import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials for CORS requests or cookies (if applicable)
});

export default axiosInstance;