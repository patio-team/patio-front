import { ActionTree, GetterTree, Module, MutationTree, Commit } from "vuex";

import api from "@/services/api";

import { Group } from "@/domain";

import { RootState } from "@/store/types";
import { GroupsState } from "./types";

const initialState: GroupsState = {
  groupList: [] as Group[],
  groupListIsLoading: false,
  groupListError: false,
};

const getters: GetterTree<GroupsState, RootState> = {
  groupList(state: GroupsState): Group[] { return state.groupList; },
  groupListIsLoading(state: GroupsState): boolean { return state.groupListIsLoading; },
  groupListError(state: GroupsState): string | boolean { return state.groupListError; },
};

const mutations: MutationTree<GroupsState> = {
  getGroupListRequest(state: GroupsState) {
    state.groupListIsLoading = true;
    state.groupListError = false;
  },
  getGroupListSuccess(state: GroupsState, groupList: Group []) {
    state.groupListIsLoading = false;
    state.groupList = groupList;
  },
  getGroupListFail(state: GroupsState, error: string) {
    state.groupListIsLoading = false;
    state.groupListError = error;
  },
};

const actions: ActionTree<GroupsState, RootState> = {
  async getGroupList({commit, state}: {commit: Commit, state: GroupsState}) {
    commit("getGroupListRequest");
    try {
      const groupList = await api.groups.list();
      commit("getGroupListSuccess", groupList);
    } catch (error) {
      commit("getGroupListFail", error.code);
    }
  },
};

const module: Module<GroupsState, RootState> = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};

export default module;
