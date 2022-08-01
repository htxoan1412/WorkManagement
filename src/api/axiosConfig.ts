import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../utils/localStorageService";
const axiosConfig = axios.create({
  baseURL: "http://dev.timesheetapi.nccsoft.vn/api",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosConfig.interceptors.request.use(
  function (config: any) {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosConfig.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosConfig;
