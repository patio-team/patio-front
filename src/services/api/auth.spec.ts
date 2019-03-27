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

import MockAdapter from "axios-mock-adapter";
import { client } from "@/services/api";
import {
  LoginQuery,
  MyProfileQuery,
} from "./queries/auth";
import api from "./auth";

const mock = new MockAdapter(client);

describe("API Auth Services", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("API Auth Services: login", () => {
    it("should get token from a successful login", async () => {
      const payload = {
        token: "TOKEN",
        profile: {
          email: "some@email.com",
        },
      };
      const input = {
        email: "aaaa@email.com",
        password: "password",
      };

      mock
        .onPost("", { query: LoginQuery, variables: input })
        .reply(
          200,
          JSON.stringify({
            data: { login: payload },
          }),
        );

      const data = await api(client).login(input);
      expect(data).toEqual(payload);
    });

    it("should throw an error", async () => {
      const input = {
        email: "",
        password: "",
      };

      mock
        .onPost("", { query: LoginQuery, variables: input })
        .reply(
          200,
          JSON.stringify({
            errors: [{ extensions: { code: "API_ERRORS.BAD_CREDENTIALS" } }],
          }),
        );

      let err;

      try {
        await api(client).login(input);
      } catch (e) { err = e; }

      expect(err.code).toBe("API_ERRORS.BAD_CREDENTIALS");
    });
  });
  describe("API Auth Services: myProfile", () => {
    it("should get user profile from a successful call", async () => {
      const payload = {
        email: "some@email.com",
      };

      mock
        .onPost("", { query: MyProfileQuery, variables: {} })
        .reply(
          200,
          JSON.stringify({
            data: { myProfile: payload },
          }),
        );

      const data = await api(client).myProfile();
      expect(data).toEqual(payload);
    });

    it("should throw an error", async () => {
      mock
        .onPost("", { query: MyProfileQuery, variables: {} })
        .reply(
          200,
          JSON.stringify({
            errors: [{ extensions: { code: "API_ERRORS.BAD_CREDENTIALS" } }],
          }),
        );

      let err;

      try {
        await api(client).myProfile();
      } catch (e) { err = e; }

      expect(err.code).toBe("API_ERRORS.BAD_CREDENTIALS");
    });
  });
});
