/*!
 * Copyright (C) 2019 Kaleidos Open Source SL
 *
 * This file is part of Dont Worry Be Happy (DWBH).
 * DWBH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DWBH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DWBH.  If not, see <https://www.gnu.org/licenses/>.
 */

import axios, { AxiosInstance } from "axios";
import { localStorage } from "@/services/storage";

import { responseInterceptor, responseErrorInterceptor } from "./interceptors";
import { transformRequest, transformResponse } from "./transforms";

import Auth from "./auth";
import Groups from "./groups";
import Votings from "./votings";

export { ApiError } from "./interceptors";

export const client: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

client.defaults.headers["Content-Type"] = "application/json";
client.defaults.headers.Accept = "application/json";

client.defaults.transformRequest = transformRequest;
client.defaults.transformResponse = transformResponse;

const setAuthorization = (jwtToken?: string) => {
  if (jwtToken) {
    client.defaults.headers.common.Authorization = `JWT ${jwtToken}`;
    localStorage.set("authToken", jwtToken);
  } else {
    delete client.defaults.headers.common.Authorization;
    localStorage.remove("authToken");
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
  votings: Votings(client),
};
