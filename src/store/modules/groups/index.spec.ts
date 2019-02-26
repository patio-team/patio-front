import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import cloneDeep from "lodash.clonedeep";

import { generateGroupList } from "@/__mocks__/data/groups";

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
    describe("Mutation: getGroupListRequest", () => {
      it("change to pending state when 'get group list' API request is started", () => {
        const store = getStore();

        store.commit("groups/getGroupListRequest");

        expect(store.getters["groups/groupList"]).toEqual([]);
        expect(store.getters["groups/groupListIsLoading"]).toEqual(true);
        expect(store.getters["groups/groupListError"]).toEqual(false);
      });
    });
    describe("Mutation: getGroupListSuccess", () => {
      it("change to success state when 'get group list' API request finish successfully", () => {
        const store = getStore();
        const groupList = generateGroupList();

        store.commit("groups/getGroupListSuccess", groupList);

        expect(store.getters["groups/groupList"]).toEqual(groupList);
        expect(store.getters["groups/groupListIsLoading"]).toEqual(false);
        expect(store.getters["groups/groupListError"]).toEqual(false);
      });
    });
    describe("Mutation: getGroupListFail", () => {
      it("change to error state when 'get group list' API request fail", () => {
        const store = getStore();

        store.commit("groups/getGroupListFail", "ERROR");

        expect(store.getters["groups/groupList"]).toEqual([]);
        expect(store.getters["groups/groupListIsLoading"]).toEqual(false);
        expect(store.getters["groups/groupListError"]).toEqual("ERROR");
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

        expect(store.getters["groups/groupList"]).toEqual(groupList);
        expect(store.getters["groups/groupListIsLoading"]).toEqual(false);
        expect(store.getters["groups/groupListError"]).toEqual(false);
      });
      it("get a groupList on error", async () => {
        const store = getStore();

        api.groups.list = jest.fn().mockRejectedValue(new ApiError("ERROR"));

        await store.dispatch("groups/getGroupList");

        expect(store.getters["groups/groupList"]).toEqual([]);
        expect(store.getters["groups/groupListIsLoading"]).toEqual(false);
        expect(store.getters["groups/groupListError"]).toEqual("ERROR");
      });
    });
  });
});
