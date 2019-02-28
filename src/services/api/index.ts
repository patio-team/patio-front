import axios, { AxiosInstance } from "axios";
import { localStorage } from "@/services/storage";

import Auth from "./auth";

const client: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

client.defaults.headers.common["Content-Type"] = "application/json";
client.defaults.headers.common.Accept = "application/json";

const setAuthorization = (jwtToken: string) => {
  if (jwtToken) {
    client.defaults.headers.common.Authorization = `JWT ${jwtToken}`;
  } else {
    delete client.defaults.headers.common.Authorization;
  }
};

const token = localStorage.get("authToken");
if (token) {
  setAuthorization(token);
}

export default {
  setAuthorization,
  auth: Auth(client),
};
