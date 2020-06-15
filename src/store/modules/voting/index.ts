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
import { GetVotingInput } from "@/services/api/types";

import { Voting } from "@/domain";

import { RootState } from "@/store/types";
import { VotingState } from "./types";

const getInitialState = (): VotingState => ({
  voting: undefined,
  getVotingIsLoading: false,
  getVotingError: false,
});

const initialState = getInitialState();

const getters: GetterTree<VotingState, RootState> = {
  voting(state: VotingState) { return state.voting; },
  stats(state: VotingState) {
    return {
      1: state.voting!.votes!.data!.filter((v) => v.score === 1).length || 0,
      2: state.voting!.votes!.data!.filter((v) => v.score === 2).length || 0,
      3: state.voting!.votes!.data!.filter((v) => v.score === 3).length || 0,
      4: state.voting!.votes!.data!.filter((v) => v.score === 4).length || 0,
      5: state.voting!.votes!.data!.filter((v) => v.score === 5).length || 0,
      count: state.voting!.votes!.total || 0,
    };
  },
  getVotingIsLoading(state: VotingState) { return state.getVotingIsLoading; },
  getVotingError(state: VotingState) { return state.getVotingError; },
};

const mutations: MutationTree<VotingState> = {
  // getVoting
  // getVotingWithNoMembers
  getVotingRequest(state: VotingState) {
    state.getVotingIsLoading = true;
    state.getVotingError = false;
  },
  getVotingSuccess(state: VotingState, voting: Voting ) {
    state.getVotingIsLoading = false;
    state.getVotingError = false;

    state.voting = voting;
  },
  getVotingFail(state: VotingState, error: string) {
    state.getVotingIsLoading = false;
    state.getVotingError = error;
  },
  // reset
  resetState(state: VotingState) {
    Object.assign(state, getInitialState());
  },
};

const actions: ActionTree<VotingState, RootState> = {
  async getVoting(
    {commit, state}: {commit: Commit, state: VotingState},
    input: GetVotingInput,
  ) {
    commit("getVotingRequest");
    try {
      const voting = await api.votings.getVoting(input);
      commit("getVotingSuccess", voting);
      return voting;
    } catch (error) {
      commit("getVotingFail", error.code);
      return;
    }
  },
};

const module: Module<VotingState, RootState> = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};

export default module;
