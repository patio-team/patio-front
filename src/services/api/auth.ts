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

import { AxiosInstance } from "axios";
import { LoginInput, LoginOauth2Input, ResetInput } from "./types";
import { LoginQuery, MyProfileQuery, LoginOauth2Query, ResetQuery } from "./queries/auth";
import { Login, User } from "@/domain";

export default (client: AxiosInstance) => ({
  login(input: LoginInput) {
    return client
      .post("", { query: LoginQuery, variables: input })
      .then((data: any): Login => {
        return data.login;
      });
  },
  loginOauth2(input: LoginOauth2Input) {
    return client
    .post("", { query: LoginOauth2Query, variables: input})
    .then((data: any): Login => {
      return data.loginOauth2;
    });
  },
  myProfile() {
    return client
      .post("", { query: MyProfileQuery, variables: {} })
      .then((data: any): User => {
        return data.myProfile;
      });
  },
  resetPassword(input: ResetInput) {
    return client
    .post("", { query: ResetQuery, variables: input })
    .then((data: any): boolean => {
      return data.reset;
    });
  },
});
