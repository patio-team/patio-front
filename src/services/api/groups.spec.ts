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

import { now } from "@/utils/datetime";

import { client } from "@/services/api";

import api from "./groups";

import {
  CreateGroupMutation,
  EditGroupMutation,
  GetGroupQuery,
  GetGroupStatsQuery,
  GetGroupMembersQuery,
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
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).create(input);
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
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).edit(input);
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
      const input = {
        id: "GROUP_ID",
      };

      mock
        .onPost("", { query: GetGroupQuery, variables: input })
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).get(input);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });

  describe("API Groups Services: getGroupMembers", () => {
    it("should get data from API", async () => {
      const group = generateGroup();

      const input = {
        id: group.id,
      };

      mock
        .onPost("", { query: GetGroupMembersQuery, variables: input })
        .reply(
          200,
          JSON.stringify({
            data: { getGroup: { members: group.members } },
          }),
        );

      const data = await api(client).getGroupMembers(input);
      expect(data).toEqual(group.members);
    });

    it("should throw an error", async () => {
      const input = {
        id: "GROUP_ID",
      };

      mock
        .onPost("", { query: GetGroupMembersQuery, variables: input })
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).getGroupMembers(input);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });

  describe("API Groups Services: getGroupStats", () => {
    it("should get data from API", async () => {
      const group = generateGroup();

      const input = {
        id: group.id,
        startDateTime: now(),
        endDateTime: now(),
      };

      mock
        // .onPost("", { query: GetGroupStatsQuery, variables: input })
        .onPost("")
        .reply(
          200,
          JSON.stringify({
            data: { getGroup: { votings: group.votings } },
          }),
        );

      const data = await api(client).getGroupStats(input);
      expect(data).toEqual(group.votings);
    });

    it("should throw an error", async () => {
      const input = {
        id: "GROUP_ID",
        startDateTime: now(),
        endDateTime: now(),
      };

      mock
        // .onPost("", { query: GetGroupStatsQuery, variables: input })
        .onPost("")
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).getGroupStats(input);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });
  describe("API Groups Services: addUserToGroup", () => {
    it("should get data from API", async () => {
      const input = {
        groupId: "GROUP_ID",
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
      const input = {
        groupId: "GROUP_ID",
        email: "example@email.com",
      };

      mock
        .onPost("", { query: AddUserToGroupMutation, variables: input })
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).addUserToGroup(input);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });
  describe("API Groups Services: leave", () => {
    it("should get data from API", async () => {
      const input = {
        groupId: "GROUP_ID",
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
      const input = {
        groupId: "GROUP_ID",
      };

      mock
        .onPost("", { query: LeaveGroupMutation, variables: input })
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).leave(input);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });
});
