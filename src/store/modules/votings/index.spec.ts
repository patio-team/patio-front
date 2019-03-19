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
import groupsModule from "@/store/modules/groups";
import votingsModule from "@/store/modules/votings";
import api, { ApiError } from "@/services/api";

const getStore = () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  return new Vuex.Store({
    modules: {
      groups: cloneDeep(groupsModule),
      votings: cloneDeep(votingsModule),
    },
  });
};


describe("Votings Store Module", () => {
  describe("Votings Store Module: Mutations", () => {
    it("createVoteRequest(state)", () => {
      const store = getStore();

      store.commit("votings/createVoteRequest");

      expect(store.getters["votings/createVoteIsLoading"]).toEqual(true);
      expect(store.getters["votings/createVoteError"]).toBe(false);
    });

    it("createVoteSuccess(state, voting)", () => {
      const store = getStore();
      const voting = {groupId: "groupId", id: "id"};

      store.commit("votings/createVoteSuccess", voting);

      expect(store.getters["votings/createVoteIsLoading"]).toBe(false);
      expect(store.getters["votings/createVoteError"]).toBe(false);
    });

    it("createVoteFail(state, error)", () => {
      const store = getStore();

      store.commit("votings/createVoteError", "ERROR");

      expect(store.getters["votings/createVoteIsLoading"]).toBe(false);
      expect(store.getters["votings/createVoteError"]).toEqual("ERROR");
    });
  });

  describe("Votings Store Module: Actions", () => {
    it("createVote(input): success", async () => {
      const store = getStore();
      const vote = {};

      api.votings.createVote = jest.fn().mockResolvedValue({});

      await store.dispatch("votings/createVote", {votingId: "votingId", groupId: "groupId"});

      expect(api.votings.createVote).toBeCalledTimes(1);
      expect(store.getters["votings/createVoteIsLoading"]).toBe(false);
      expect(store.getters["votings/createVoteError"]).toBe(false);
    });

    it("createVote(input): error", async () => {
      const store = getStore();
      const vote = {};

      api.votings.createVote = jest.fn().mockRejectedValue(new ApiError("ERROR"));

      await store.dispatch("votings/createVote", {votingId: "votingId", groupId: "groupId"});

      expect(api.votings.createVote).toBeCalledTimes(1);
      expect(store.getters["votings/createVoteIsLoading"]).toBe(false);
      expect(store.getters["votings/createVoteError"]).toEqual("ERROR");
    });
  });
});
