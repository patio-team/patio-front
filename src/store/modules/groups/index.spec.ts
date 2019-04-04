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

import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import cloneDeep from "lodash.clonedeep";

import { generateGroup, generateGroupList } from "@/__mocks__/data/groups";

import api, { ApiError } from "@/services/api";

import groupsModule from "@/store/modules/groups";

const getStore = () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  return new Vuex.Store({
    modules: {
      groups: cloneDeep(groupsModule),
    },
  });
};


describe("Groups Store Module", () => {
  describe("Groups Store Module: Mutations", () => {
    // list group
    describe("Mutation: groupListRequest", () => {
      it("change to pending state when 'get group list' API request is started", () => {
        const store = getStore();

        store.commit("groups/groupListRequest");

        expect(store.getters["groups/groupList"]).toEqual([]);
        expect(store.getters["groups/groupListIsLoading"]).toEqual(true);
        expect(store.getters["groups/groupListError"]).toEqual(false);
      });
    });
    describe("Mutation: groupListSuccess", () => {
      it("change to success state when 'get group list' API request finish successfully", () => {
        const store = getStore();
        const groupList = generateGroupList();

        store.commit("groups/groupListSuccess", groupList);

        expect(store.getters["groups/groupList"]).toEqual(groupList);
        expect(store.getters["groups/groupListIsLoading"]).toEqual(false);
        expect(store.getters["groups/groupListError"]).toEqual(false);
      });
    });
    describe("Mutation: groupListFail", () => {
      it("change to error state when 'get group list' API request fail", () => {
        const store = getStore();

        store.commit("groups/groupListFail", "ERROR");

        expect(store.getters["groups/groupList"]).toEqual([]);
        expect(store.getters["groups/groupListIsLoading"]).toEqual(false);
        expect(store.getters["groups/groupListError"]).toEqual("ERROR");
      });
    });

    // create group
    describe("Mutation: createGroupRequest", () => {
      it("change to pending state when 'create group' API request is started", () => {
        const store = getStore();

        store.commit("groups/createGroupRequest");

        expect(store.getters["groups/createGroupIsLoading"]).toEqual(true);
        expect(store.getters["groups/createGroupError"]).toEqual(false);
      });
    });
    describe("Mutation: createGroupSuccess", () => {
      it("change to success state when 'create group' API request finish successfully", () => {
        const store = getStore();

        store.commit("groups/createGroupSuccess");

        expect(store.getters["groups/createGroupIsLoading"]).toEqual(false);
        expect(store.getters["groups/createGroupError"]).toEqual(false);
      });
    });
    describe("Mutation: createGroupFail", () => {
      it("change to error state when 'create group' API request fail", () => {
        const store = getStore();

        store.commit("groups/createGroupFail", "ERROR");

        expect(store.getters["groups/createGroupIsLoading"]).toEqual(false);
        expect(store.getters["groups/createGroupError"]).toEqual("ERROR");
      });
    });
  });

  describe("Groups Store Module: Actions", () => {
    describe("Action: getGroupList", () => {
      it("get a groupList on success", async () => {
        const store = getStore();
        const groupList = generateGroupList();

        api.groups.list = jest.fn().mockResolvedValue(groupList);

        await store.dispatch("groups/getGroupList");

        expect(api.groups.list).toBeCalledTimes(1);
        expect(api.groups.list).toBeCalledWith();
        expect(store.getters["groups/groupList"]).toEqual(groupList);
        expect(store.getters["groups/groupListIsLoading"]).toEqual(false);
        expect(store.getters["groups/groupListError"]).toEqual(false);
      });
      it("get a groupList on error", async () => {
        const store = getStore();

        api.groups.list = jest.fn().mockRejectedValue(new ApiError("ERROR"));

        await store.dispatch("groups/getGroupList");

        expect(api.groups.list).toBeCalledTimes(1);
        expect(api.groups.list).toBeCalledWith();
        expect(store.getters["groups/groupList"]).toEqual([]);
        expect(store.getters["groups/groupListIsLoading"]).toEqual(false);
        expect(store.getters["groups/groupListError"]).toEqual("ERROR");
      });
    });
    describe("Action: createGroup", () => {
      it("create a group successfuly", async () => {
        const store = getStore();
        const group = generateGroup();
        const input = {
          name: group.name,
          anonymousVote: group.anonymousVote,
          visibleMemberList: group.visibleMemberList,
          votingDays: group.votingDays,
          votingTime: group.votingTime,
        };

        api.groups.create = jest.fn().mockResolvedValue(group);

        await store.dispatch("groups/createGroup", input);

        expect(api.groups.create).toBeCalledTimes(1);
        expect(api.groups.create).toBeCalledWith(input);
        expect(store.getters["groups/createGroupIsLoading"]).toEqual(false);
        expect(store.getters["groups/createGroupError"]).toEqual(false);
      });
      it("create a group throw an error", async () => {
        const store = getStore();
        const group = generateGroup();
        const input = {
          name: group.name,
          anonymousVote: group.anonymousVote,
          visibleMemberList: group.visibleMemberList,
          votingDays: group.votingDays,
          votingTime: group.votingTime,
        };

        api.groups.create = jest.fn().mockRejectedValue(new ApiError("ERROR"));

        await store.dispatch("groups/createGroup", input);

        expect(api.groups.create).toBeCalledTimes(1);
        expect(api.groups.create).toBeCalledWith(input);
        expect(store.getters["groups/createGroupIsLoading"]).toEqual(false);
        expect(store.getters["groups/createGroupError"]).toEqual("ERROR");
      });
    });
  });
});
