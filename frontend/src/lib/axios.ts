import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  timeout: 20000,
});

const err = (error: AxiosError) => {
  if (error && error.response && error.response.status) {
    switch (error.response.status) {
      case 401:
        // TODO
        break;

      default:
        return Promise.reject(error.response);
    }
  }
};

api.interceptors.request.use((config) => {
  const key = import.meta.env.VITE_MERCADO_PAGO_SECRET_KEY_DEV;
  const token = `Bearer ${key}`;
  config.headers.Authorization = token;
  if (config.headers["Content-Type"] === undefined) {
    config.headers["Content-Type"] = "application/json";
    config.headers.Accept = "application/json";
  }
  config.headers["cache-control"] = "no-cache";

  return config;
}, err);

export { api };
