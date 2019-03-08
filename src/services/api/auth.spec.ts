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
import { login } from "@/__mocks__/data/auth";
import { LoginQuery } from "./queries/auth";
import api from "./auth";

const mock = new MockAdapter(client);

describe("API Auth Services", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("API Auth Services: login", () => {
    it("should get token from a successful login", async () => {
      const token = login("e@mail.com", "secret");
      const email = "aaaa@email.com";
      const password = "password";

      mock
        .onPost("", { query: LoginQuery, variables: { email, password } })
        .reply(
          200,
          JSON.stringify({
            data: { login: { token } },
          }),
        );

      const data = await api(client).login(email, password);
      expect(data).toEqual(token);
    });

    it("should throw an error", async () => {
      const email = "";
      const password = "";

      mock
        .onPost("", { query: LoginQuery, variables: { email, password } })
        .reply(
          200,
          JSON.stringify({
            errors: [{ extensions: { code: "API_ERRORS.BAD_CREDENTIALS" } }],
          }),
        );

      let err;

      try {
        await api(client).login(email, password);
      } catch (e) { err = e; }

      expect(err.code).toBe("API_ERRORS.BAD_CREDENTIALS");
    });
  });
});
