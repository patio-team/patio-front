import axios, { AxiosInstance } from "axios";
import { localStorage } from "@/services/storage";

import { responseInterceptor, responseErrorInterceptor } from "./interceptors";

import Auth from "./auth";
import Groups from "./groups";

export { ApiError } from "./interceptors";

export const client: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

client.defaults.headers["Content-Type"] = "application/json";
client.defaults.headers.Accept = "application/json";

const setAuthorization = (jwtToken: string) => {
  if (jwtToken) {
    client.defaults.headers.common.Authorization = `JWT ${jwtToken}`;
  } else {
    delete client.defaults.headers.common.Authorization;
  }
};

const token: string = localStorage.get("authToken");
if (token) {
  setAuthorization(token);
}

client.interceptors.response.use(responseInterceptor, responseErrorInterceptor);


export default {
  setAuthorization,
  auth: Auth(client),
  groups: Groups(client),
};
