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

import { generateGroup } from "@/__mocks__/data/groups";

import api, { ApiError } from "@/services/api";

import groupModule from "@/store/modules/group";

const getStore = () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  return new Vuex.Store({
    modules: {
      group: cloneDeep(groupModule),
    },
  });
};


describe("Group Store Module", () => {
  describe("Group Store Module: Mutations", () => {
    // get group
    describe("Mutation: getGroupRequest", () => {
      it("change to pending state when 'get group' API request is started", () => {
        const store = getStore();

        store.commit("group/getGroupRequest");

        expect(store.getters["group/group"]).toEqual(undefined);
        expect(store.getters["group/getGroupIsLoading"]).toEqual(true);
        expect(store.getters["group/getGroupError"]).toEqual(false);
      });
    });
    describe("Mutation: getGroupSuccess", () => {
      it("change to success state when 'get group' API request finish successfully", () => {
        const store = getStore();
        const group = generateGroup();

        store.commit("group/getGroupSuccess", group);

        expect(store.getters["group/group"]).toEqual(group);
        expect(store.getters["group/getGroupIsLoading"]).toEqual(false);
        expect(store.getters["group/getGroupError"]).toEqual(false);
      });
    });
    describe("Mutation: getGroupFail", () => {
      it("change to error state when 'get group' API request fail", () => {
        const store = getStore();

        store.commit("group/getGroupFail", "ERROR");

        expect(store.getters["group/group"]).toEqual(undefined);
        expect(store.getters["group/getGroupIsLoading"]).toEqual(false);
        expect(store.getters["group/getGroupError"]).toEqual("ERROR");
      });
    });
    // edit group
    describe("Mutation: editRequest", () => {
      it("change to pending state when 'edit group' API request is started", () => {
        const store = getStore();

        store.commit("group/editRequest");

        expect(store.getters["group/editIsLoading"]).toEqual(true);
        expect(store.getters["group/editError"]).toEqual(false);
      });
    });
    describe("Mutation: editSuccess", () => {
      it("change to initial state for 'edit group' API request", () => {
        const store = getStore();

        store.commit("group/editSuccess");

        expect(store.getters["group/editIsLoading"]).toEqual(false);
        expect(store.getters["group/editError"]).toEqual(false);
      });
    });
    describe("Mutation: editFail", () => {
      it("change to error state when 'edit group'' API request fail", () => {
        const store = getStore();

        store.commit("group/editFail", "ERROR");

        expect(store.getters["group/editIsLoading"]).toEqual(false);
        expect(store.getters["group/editError"]).toEqual("ERROR");
      });
    });
    // add user to group
    describe("Mutation: addUserToGroupRequest", () => {
      it("change to pending state when 'add user to group' API request is started", () => {
        const store = getStore();

        store.commit("group/addUserToGroupRequest");

        expect(store.getters["group/addUserToGroupIsLoading"]).toEqual(true);
        expect(store.getters["group/addUserToGroupError"]).toEqual(false);
      });
    });
    describe("Mutation: addUserToGroupFail", () => {
      it("change to error state when 'add user to group' API request fail", () => {
        const store = getStore();

        store.commit("group/addUserToGroupFail", "ERROR");

        expect(store.getters["group/addUserToGroupIsLoading"]).toEqual(false);
        expect(store.getters["group/addUserToGroupError"]).toEqual("ERROR");
      });
    });
    describe("Mutation: addUserToGroupReset", () => {
      it("change to initial state for 'add user to group' API request", () => {
        const store = getStore();

        store.commit("group/addUserToGroupReset");

        expect(store.getters["group/addUserToGroupIsLoading"]).toEqual(false);
        expect(store.getters["group/addUserToGroupError"]).toEqual(false);
      });
    });
    // leave group
    describe("Mutation: leaveRequest", () => {
      it("change to pending state when 'leave group' API request is started", () => {
        const store = getStore();

        store.commit("group/leaveRequest");

        expect(store.getters["group/leaveIsLoading"]).toEqual(true);
        expect(store.getters["group/leaveError"]).toEqual(false);
      });
    });
    describe("Mutation: leaveFail", () => {
      it("change to error state when 'leave group'' API request fail", () => {
        const store = getStore();

        store.commit("group/leaveFail", "ERROR");

        expect(store.getters["group/leaveIsLoading"]).toEqual(false);
        expect(store.getters["group/leaveError"]).toEqual("ERROR");
      });
    });
    describe("Mutation: leaveReset", () => {
      it("change to initial state for 'leave group' API request", () => {
        const store = getStore();

        store.commit("group/leaveReset");

        expect(store.getters["group/leaveIsLoading"]).toEqual(false);
        expect(store.getters["group/leaveError"]).toEqual(false);
      });
    });
  });

  describe("Group Store Module: Actions", () => {
    describe("Action: getGroup", () => {
      it("get a group successfuly", async () => {
        const store = getStore();
        const group = generateGroup();
        const input = { id: group.id };

        api.groups.get = jest.fn().mockResolvedValue(group);

        await store.dispatch("group/getGroup", input);

        expect(api.groups.get).toBeCalledTimes(1);
        expect(api.groups.get).toBeCalledWith(input);
        expect(store.getters["group/getGroupIsLoading"]).toEqual(false);
        expect(store.getters["group/getGroupError"]).toEqual(false);
      });
      it("get a group throw an error", async () => {
        const store = getStore();
        const group = generateGroup();
        const input = { id: group.id };

        api.groups.get = jest.fn().mockRejectedValue(new ApiError("ERROR"));

        await store.dispatch("group/getGroup", input);

        expect(api.groups.get).toBeCalledTimes(1);
        expect(api.groups.get).toBeCalledWith(input);
        expect(store.getters["group/getGroupIsLoading"]).toEqual(false);
        expect(store.getters["group/getGroupError"]).toEqual("ERROR");
      });
    });

    describe("Action: getGroupWithNoMembers", () => {
      it("get a group successfuly", async () => {
        const store = getStore();
        const group = generateGroup();
        const input = { id: group.id };

        api.groups.getWithNoMembers = jest.fn().mockResolvedValue(group);

        await store.dispatch("group/getGroupWithNoMembers", input);

        expect(api.groups.getWithNoMembers).toBeCalledTimes(1);
        expect(api.groups.getWithNoMembers).toBeCalledWith(input);
        expect(store.getters["group/getGroupIsLoading"]).toEqual(false);
        expect(store.getters["group/getGroupError"]).toEqual(false);
      });
      it("get a group throw an error", async () => {
        const store = getStore();
        const group = generateGroup();
        const input = { id: group.id };

        api.groups.getWithNoMembers = jest.fn().mockRejectedValue(new ApiError("ERROR"));

        await store.dispatch("group/getGroupWithNoMembers", input);

        expect(api.groups.getWithNoMembers).toBeCalledTimes(1);
        expect(api.groups.getWithNoMembers).toBeCalledWith(input);
        expect(store.getters["group/getGroupIsLoading"]).toEqual(false);
        expect(store.getters["group/getGroupError"]).toEqual("ERROR");
      });
    });

    describe("Action: edit", () => {
      it("edit a group successfuly", async () => {
        const store = getStore();
        const group = generateGroup();
        const input = {
          id: group.id,
          name: group.name,
          anonymousVote: group.anonymousVote,
          visibleMemberList: group.visibleMemberList,
          votingDays: group.votingDays,
          votingTime: group.votingTime,
        };

        api.groups.edit = jest.fn().mockResolvedValue(group);

        const editedGroup = await store.dispatch("group/edit", input);

        expect(api.groups.edit).toBeCalledTimes(1);
        expect(api.groups.edit).toBeCalledWith(input);
        expect(store.getters["group/editIsLoading"]).toEqual(false);
        expect(store.getters["group/editError"]).toEqual(false);
        expect(editedGroup).toEqual(group);
      });
      it("edit a group throw an error", async () => {
        const store = getStore();
        const group = generateGroup();
        const input = {
          id: group.id,
          name: group.name,
          anonymousVote: group.anonymousVote,
          visibleMemberList: group.visibleMemberList,
          votingDays: group.votingDays,
          votingTime: group.votingTime,
        };

        api.groups.edit = jest.fn().mockRejectedValue(new ApiError("ERROR"));

        const edittedGroup = await store.dispatch("group/edit", input);

        expect(api.groups.edit).toBeCalledTimes(1);
        expect(api.groups.edit).toBeCalledWith(input);
        expect(store.getters["group/editIsLoading"]).toEqual(false);
        expect(store.getters["group/editError"]).toEqual("ERROR");
        expect(edittedGroup).toEqual(false);
      });
    });

    describe("Action: addUserToGroup", () => {
      it("add one user to a group successfuly", async () => {
        const store = getStore();
        const input = { groupId: "group-id", email: "user-email" };

        api.groups.addUserToGroup = jest.fn().mockResolvedValue(true);

        const result = await store.dispatch("group/addUserToGroup", input);

        expect(api.groups.addUserToGroup).toBeCalledTimes(1);
        expect(api.groups.addUserToGroup).toBeCalledWith(input);
        expect(store.getters["group/addUserToGroupIsLoading"]).toEqual(false);
        expect(store.getters["group/addUserToGroupError"]).toEqual(false);
        expect(result).toEqual(true);
      });
      it("add one user to a group throw an error", async () => {
        const store = getStore();
        const input = { groupId: "group-id", email: "user-email" };

        api.groups.addUserToGroup = jest.fn().mockRejectedValue(new ApiError("ERROR"));

        const result = await store.dispatch("group/addUserToGroup", input);

        expect(api.groups.addUserToGroup).toBeCalledTimes(1);
        expect(api.groups.addUserToGroup).toBeCalledWith(input);
        expect(store.getters["group/addUserToGroupIsLoading"]).toEqual(false);
        expect(store.getters["group/addUserToGroupError"]).toEqual("ERROR");
        expect(result).toEqual(false);
      });
    });

    describe("Action: leave", () => {
      it("add one user to a group successfuly", async () => {
        const store = getStore();
        const input = { groupId: "group-id" };

        api.groups.leave = jest.fn().mockResolvedValue(true);

        const result = await store.dispatch("group/leave", input);

        expect(api.groups.leave).toBeCalledTimes(1);
        expect(api.groups.leave).toBeCalledWith(input);
        expect(store.getters["group/leaveIsLoading"]).toEqual(false);
        expect(store.getters["group/leaveError"]).toEqual(false);
        expect(result).toEqual(true);
      });
      it("add one user to a group throw an error", async () => {
        const store = getStore();
        const input = { groupId: "group-id" };

        api.groups.leave = jest.fn().mockRejectedValue(new ApiError("ERROR"));

        const result = await store.dispatch("group/leave", input);

        expect(api.groups.leave).toBeCalledTimes(1);
        expect(api.groups.leave).toBeCalledWith(input);
        expect(store.getters["group/leaveIsLoading"]).toEqual(false);
        expect(store.getters["group/leaveError"]).toEqual("ERROR");
        expect(result).toEqual(false);
      });
    });
  });
});
