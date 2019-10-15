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
import { GetUserInput, ListUserVotesInGroupInput } from "@/services/api/types";

import { User, Vote } from "@/domain";

import { RootState } from "@/store/types";
import { ProfileState } from "./types";

const getInitialState = (): ProfileState => ({
  profile: undefined,
  getProfileIsLoading: false,
  getProfileError: false,
  votes: [] as Vote[],
  getVotesIsLoading: false,
  getVotesError: false,
});

const initialState = getInitialState();

const getters: GetterTree<ProfileState, RootState> = {
  profile(state: ProfileState) { return state.profile; },
  getProfileIsLoading(state: ProfileState) { return state.getProfileIsLoading; },
  getProfileError(state: ProfileState) { return state.getProfileError; },
  votes(state: ProfileState) { return state.votes; },
  getVotesIsLoading(state: ProfileState) { return state.getVotesIsLoading; },
  getVotesError(state: ProfileState) { return state.getVotesError; },
};

const mutations: MutationTree<ProfileState> = {
  // getProfile
  getProfileRequest(state: ProfileState) {
    state.getProfileIsLoading = true;
    state.getProfileError = false;
  },
  getProfileSuccess(state: ProfileState, profile: User ) {
    state.getProfileIsLoading = false;
    state.getProfileError = false;

    state.profile = profile;
  },
  getProfileFail(state: ProfileState, error: string) {
    state.getProfileIsLoading = false;
    state.getProfileError = error;
  },
  // getVotes
  getVotesRequest(state: ProfileState) {
    state.getVotesIsLoading = true;
    state.getVotesError = false;
  },
  getVotesSuccess(state: ProfileState, votes: Vote[] ) {
    state.getVotesIsLoading = false;
    state.getVotesError = false;

    state.votes.push(...votes);
  },
  getVotesFail(state: ProfileState, error: string) {
    state.getVotesIsLoading = false;
    state.getVotesError = error;
  },
  // reset
  resetState(state: ProfileState) {
    Object.assign(state, getInitialState());
  },
};

const actions: ActionTree<ProfileState, RootState> = {
  async getProfile(
    {commit, state}: {commit: Commit, state: ProfileState},
    input: GetUserInput,
  ) {
    commit("getProfileRequest");
    try {
      const profile = await api.profiles.get(input);
      commit("getProfileSuccess", profile);
      return profile;
    } catch (error) {
      commit("getProfileFail", error.code);
      return;
    }
  },
  async getVotes(
    {commit, state}: {commit: Commit, state: ProfileState},
    input: ListUserVotesInGroupInput,
  ) {
    commit("getVotesRequest");
    try {
      const stats = await api.profiles.listUserVotesInGroup(input);
      commit("getVotesSuccess", stats);
      return stats;
    } catch (error) {
      commit("getVotesFail", error.code);
      return;
    }
  },

};

const module: Module<ProfileState, RootState> = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};

export default module;
