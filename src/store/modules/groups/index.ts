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

import { ActionTree, GetterTree, Module, MutationTree, Commit } from "vuex";

import api from "@/services/api";
import { CreateGroupInput } from "@/services/api/types";

import router from "@/router";

import { Group } from "@/domain";

import { RootState } from "@/store/types";
import { GroupsState } from "./types";

const initialState: GroupsState = {
  createGroupIsLoading: false,
  createGroupError: false,
  groupList: [] as Group[],
  groupListIsLoading: false,
  groupListError: false,
};


const getters: GetterTree<GroupsState, RootState> = {
  createGroupIsLoading(state: GroupsState): boolean { return state.createGroupIsLoading; },
  createGroupError(state: GroupsState): string | boolean { return state.createGroupError; },
  groupList(state: GroupsState): Group[] { return state.groupList; },
  groupListIsLoading(state: GroupsState): boolean { return state.groupListIsLoading; },
  groupListError(state: GroupsState): string | boolean { return state.groupListError; },
};

const mutations: MutationTree<GroupsState> = {
  // createGroups
  createGroupRequest(state: GroupsState) {
    state.createGroupIsLoading = true;
    state.createGroupError = false;
  },
  createGroupSuccess(state: GroupsState, group: Group ) {
    state.createGroupIsLoading = false;
    state.createGroupError = false;

    router.push({ name: "groups:detail", params: { id: group.id } });
  },
  createGroupFail(state: GroupsState, error: string) {
    state.createGroupIsLoading = false;
    state.createGroupError = error;
  },

  // groupList
  groupListRequest(state: GroupsState) {
    state.groupListIsLoading = true;
    state.groupListError = false;
  },
  groupListSuccess(state: GroupsState, groupList: Group []) {
    state.groupListIsLoading = false;
    state.groupListError = false;

    state.groupList = groupList;
  },
  groupListFail(state: GroupsState, error: string) {
    state.groupListIsLoading = false;
    state.groupListError = error;
  },
};

const actions: ActionTree<GroupsState, RootState> = {
  async getGroupList({commit, state}: {commit: Commit, state: GroupsState}) {
    commit("groupListRequest");
    try {
      const groupList = await api.groups.list();
      commit("groupListSuccess", groupList);
    } catch (error) {
      commit("groupListFail", error.code);
    }
  },
  async createGroup(
    {commit, state}: {commit: Commit, state: GroupsState},
    input: CreateGroupInput,
  ) {
    commit("createGroupRequest");
    try {
      const group = await api.groups.create(input);
      commit("createGroupSuccess", group);
    } catch (error) {
      commit("createGroupFail", error.code);
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
