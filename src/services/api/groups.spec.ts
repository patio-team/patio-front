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
import { generateGroup, generateGroupList } from "@/__mocks__/data/groups";

import { client } from "@/services/api";

import api from "./groups";

import {
  CreateGroupMutation,
  EditGroupMutation,
  GetGroupQuery,
  GetGroupWithNoMembersQuery,
  ListMyGroupsQuery,
  AddUserToGroupMutation,
  LeaveGroupMutation,
} from "./queries/groups";
import { CreateGroupInput } from "./types";

const mock = new MockAdapter(client);

describe("API Groups Services", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("API Groups Services: list", () => {
    it("should get data from API", async () => {
      const groupList = generateGroupList();

      mock
        .onPost("", { query: ListMyGroupsQuery })
        .reply(
          200,
          JSON.stringify({
            data: { listMyGroups: groupList },
          }),
        );

      const data = await api(client).list();
      expect(data).toEqual(groupList);
    });

    it("should throw an error", async () => {
      mock
        .onPost("", { query: ListMyGroupsQuery })
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

  describe("API Groups Services: create", () => {
    it("should get data from API", async () => {
      const group = generateGroup();
      delete group.members;

      const input = {
        name: group.name,
        visibleMemberList: group.visibleMemberList,
        anonymousVote: group.anonymousVote,
        votingDays: group.votingDays,
        votingTime: group.votingTime,
      };

      mock
        // .onPost("", { query: CreateGroupMutation, variables: input })
        .onPost("")
        .reply(
          200,
          JSON.stringify({
            data: { createGroup: group },
          }),
        );

      const data = await api(client).create(input);
      expect(data).toEqual(group);
    });

    it("should throw an error", async () => {
      const group = generateGroup();
      delete group.members;

      const variables = {
        name: group.name,
        visibleMemberList: group.visibleMemberList,
        anonymousVote: group.anonymousVote,
        votingDays: group.votingDays,
        votingTime: group.votingTime,
      };

      mock
        // .onPost("", { query: CreateGroupMutation, variables })
        .onPost("")
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).create(variables);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });

  describe("API Groups Services: edit", () => {
    it("should get data from API", async () => {
      const group = generateGroup();
      delete group.members;

      const input = {
        id: group.id,
        name: group.name,
        visibleMemberList: group.visibleMemberList,
        anonymousVote: group.anonymousVote,
        votingDays: group.votingDays,
        votingTime: group.votingTime,
      };

      mock
        // .onPost("", { query: EditGroupMutation, variables: input })
        .onPost("")
        .reply(
          200,
          JSON.stringify({
            data: { updateGroup: group },
          }),
        );

      const data = await api(client).edit(input);
      expect(data).toEqual(group);
    });

    it("should throw an error", async () => {
      const group = generateGroup();
      delete group.members;

      const variables = {
        id: group.id,
        name: group.name,
        visibleMemberList: group.visibleMemberList,
        anonymousVote: group.anonymousVote,
        votingDays: group.votingDays,
        votingTime: group.votingTime,
      };

      mock
        // .onPost("", { query: EditGroupMutation, variables: input })
        .onPost("")
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).edit(variables);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });

  describe("API Groups Services: get", () => {
    it("should get data from API", async () => {
      const group = generateGroup();
      delete group.members;

      const input = {
        id: group.id,
      };

      mock
        .onPost("", { query: GetGroupQuery, variables: input })
        .reply(
          200,
          JSON.stringify({
            data: { getGroup: group },
          }),
        );

      const data = await api(client).get(input);
      expect(data).toEqual(group);
    });

    it("should throw an error", async () => {
      const group = generateGroup();
      delete group.members;

      const variables = {
        id: group.id,
      };

      mock
        .onPost("", { query: GetGroupQuery, variables })
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).get(variables);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });

  describe("API Groups Services: getWithNoMembers", () => {
    it("should get data from API", async () => {
      const group = generateGroup();
      delete group.members;
      delete group.votingTime;
      delete group.visibleMemberList;
      delete group.anonymousVote;
      delete group.isCurrentUserAdmin;

      const input = {
        id: group.id,
      };

      mock
        .onPost("", { query: GetGroupWithNoMembersQuery, variables: input })
        .reply(
          200,
          JSON.stringify({
            data: { getGroup: group },
          }),
        );

      const data = await api(client).getWithNoMembers(input);
      expect(data).toEqual(group);
    });

    it("should throw an error", async () => {
      const group = generateGroup();
      delete group.members;
      delete group.votingTime;

      const variables = {
        id: group.id,
      };

      mock
        .onPost("", { query: GetGroupWithNoMembersQuery, variables })
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).getWithNoMembers(variables);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });
  describe("API Groups Services: addUserToGroup", () => {
    it("should get data from API", async () => {
      const input = {
        groupId: "GRPOOUP_ID",
        email: "example@email.com",
      };

      mock
        .onPost("", { query: AddUserToGroupMutation, variables: input })
        .reply(
          200,
          JSON.stringify({
            data: { addUserToGroup: true },
          }),
        );

      const data = await api(client).addUserToGroup(input);
      expect(data).toEqual(true);
    });

    it("should throw an error", async () => {
      const variables = {
        groupId: "GRPOOUP_ID",
        email: "example@email.com",
      };

      mock
        .onPost("", { query: AddUserToGroupMutation, variables })
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).addUserToGroup(variables);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });
  describe("API Groups Services: leave", () => {
    it("should get data from API", async () => {
      const input = {
        groupId: "GRPOOUP_ID",
      };

      mock
        .onPost("", { query: LeaveGroupMutation, variables: input })
        .reply(
          200,
          JSON.stringify({
            data: { leaveGroup: true },
          }),
        );

      const data = await api(client).leave(input);
      expect(data).toEqual(true);
    });

    it("should throw an error", async () => {
      const variables = {
        groupId: "GRPOOUP_ID",
      };

      mock
        .onPost("", { query: LeaveGroupMutation, variables })
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).leave(variables);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });
});
