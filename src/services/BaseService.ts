// import { API_BASE_URL } from "api";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
export const API_BASE_URL = "https://dummyjson.com/";

type Instance = {
  baseApiInstance: AxiosInstance;
};

const requestHandler = (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? {};
  config.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "user_token"
  )}`;

  return config;
};

const responseHandler = (data: any) => {
  return data;
};

const errorHandler = (error: any) => {
  return Promise.reject(error);
};

// add other instnces here if neccesary
// test

const instances: Instance = {
  baseApiInstance: axios.create({ baseURL: API_BASE_URL }),
};

Object.keys(instances).forEach(i => {
  instances[i as keyof Instance].interceptors.request.use(
    requestHandler,
    errorHandler
  );
  instances[i as keyof Instance].interceptors.response.use(
    responseHandler,
    errorHandler
  );
});

export { instances };
