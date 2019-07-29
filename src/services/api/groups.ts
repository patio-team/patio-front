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

import { Group } from "@/domain";
import {
  CreateGroupInput,
  EditGroupInput,
  GetGroupInput,
  GetGroupStatsInput,
  AddUserToGroupInput,
  LeaveGroupInput,
} from "./types";

import {
  CreateGroupMutation,
  EditGroupMutation,
  GetGroupQuery,
  GetGroupMembersQuery,
  GetGroupStatsQuery,
  ListMyGroupsQuery,
  AddUserToGroupMutation,
  LeaveGroupMutation,
} from "./queries/groups";

export default (client: AxiosInstance) => ({
  list() {
    return client
      .post("", { query: ListMyGroupsQuery })
      .then((data: any): Group[] => {
        return data.listMyGroups;
      });
  },
  create(input: CreateGroupInput) {
    return client
      .post("", { query: CreateGroupMutation, variables: input })
      .then((data: any): Group => {
        return data.createGroup;
      });
  },
  edit(input: EditGroupInput) {
    return client
      .post("", { query: EditGroupMutation, variables: input })
      .then((data: any): Group => {
        return data.updateGroup;
      });
  },
  get(input: GetGroupInput) {
    return client
      .post("", { query: GetGroupQuery, variables: input })
      .then((data: any): Group => {
        return data.getGroup;
      });
  },
  getGroupStats(input: GetGroupStatsInput) {
    return client
      .post("", { query: GetGroupStatsQuery, variables: input })
      .then((data: any): Group => {
        return data.getGroup.votings;
      });
  },
  getGroupMembers(input: GetGroupInput) {
    return client
      .post("", { query: GetGroupMembersQuery, variables: input })
      .then((data: any): Group => {
        return data.getGroup.members;
      });
  },
  addUserToGroup(input: AddUserToGroupInput) {
    return client
      .post("", { query: AddUserToGroupMutation, variables: input })
      .then((data: any): boolean => {
        return data.addUserToGroup;
      });
  },
  leave(input: LeaveGroupInput) {
    return client
      .post("", { query: LeaveGroupMutation, variables: input })
      .then((data: any): boolean => {
        return data.leaveGroup;
      });
  },
});
