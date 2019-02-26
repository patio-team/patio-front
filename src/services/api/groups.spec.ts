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
