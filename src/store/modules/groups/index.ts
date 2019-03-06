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
