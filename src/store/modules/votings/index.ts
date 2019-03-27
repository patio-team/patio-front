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
import router from "@/router";
import { RootState } from "@/store/types";
import { VotingsState } from "./types";
import { Voting } from "@/domain";
import { CreateVoteInput } from "@/services/api/types";

const initialState: VotingsState = {
  createVoteIsLoading: false,
  createVoteError: false,
};

const getters: GetterTree<VotingsState, RootState> = {
  createVoteIsLoading(state: VotingsState): boolean { return state.createVoteIsLoading; },
  createVoteError(state: VotingsState): string | boolean { return state.createVoteError; },
};

const mutations: MutationTree<VotingsState> = {
  createVoteRequest(state: VotingsState) {
    state.createVoteIsLoading = true;
    state.createVoteError = false;
  },
  createVoteSuccess(state: VotingsState, voting: Voting) {
    state.createVoteIsLoading = false;
    state.createVoteError = false;

    router.push({name: "groups:votings:detail", params: {group: voting.groupId, voting: voting.id}});
  },
  createVoteError(state: VotingsState, error: string) {
    state.createVoteIsLoading = false;
    state.createVoteError = error;
  },
};

const actions: ActionTree<VotingsState, RootState> = {
  async createVote(
    {commit, state}: {commit: Commit, state: VotingsState},
    input: CreateVoteInput) {
    commit("createVoteRequest");
    try {
      await api.votings.createVote(input);
      commit("createVoteSuccess", {id: input.votingId, groupId: input.groupId} as Voting);
    } catch (error) {
      commit("createVoteError", error.code);
    }
  },
};

const module: Module<VotingsState, RootState> = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};

export default module;
