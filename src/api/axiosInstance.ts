import axios from "axios";
// import { history } from "../navigate";

export const axiosInstance = axios.create({
  baseURL: "http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавление interceptor для ответов
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Удаляем токен
      localStorage.removeItem("token");
      // Редирект на страницу логина
      // history.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
