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
import { generateGroupList } from "@/__mocks__/data/groups";

import { client } from "@/services/api";
import api from "./groups";

import {
  ListGroupsQuery,
} from "./queries/groups";

const mock = new MockAdapter(client);

describe("API Groups Services", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("API Groups Services: list", () => {
    it("should get data from API", async () => {
      const groupList = generateGroupList();

      mock
        .onPost("", { query: ListGroupsQuery })
        .reply(
          200,
          JSON.stringify({
            data: { listGroups: groupList },
          }),
        );

      const data = await api(client).list();
      expect(data).toEqual(groupList);
    });

    it("should throw an error", async () => {
      mock
        .onPost("", { query: ListGroupsQuery })
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).list();
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });
});
