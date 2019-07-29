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

import { generateVoting } from "@/__mocks__/data/votings";

import api, { ApiError } from "@/services/api";

import votingModule from "@/store/modules/voting";

const getStore = () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  return new Vuex.Store({
    modules: {
      voting: cloneDeep(votingModule),
    },
  });
};


describe("Voting Store Module", () => {
  describe("Voting Store Module: Mutations", () => {
    // get voting
    describe("Mutation: getVotingRequest", () => {
      it("change to pending state when 'get voting' API request is started", () => {
        const store = getStore();

        store.commit("voting/getVotingRequest");

        expect(store.getters["voting/voting"]).toEqual(undefined);
        expect(store.getters["voting/getVotingIsLoading"]).toEqual(true);
        expect(store.getters["voting/getVotingError"]).toEqual(false);
      });
    });
    describe("Mutation: getVotingSuccess", () => {
      it("change to success state when 'get voting' API request finish successfully", () => {
        const store = getStore();
        const voting = generateVoting();

        store.commit("voting/getVotingSuccess", voting);

        expect(store.getters["voting/voting"]).toEqual(voting);
        expect(store.getters["voting/getVotingIsLoading"]).toEqual(false);
        expect(store.getters["voting/getVotingError"]).toEqual(false);
      });
    });
    describe("Mutation: getVotingFail", () => {
      it("change to error state when 'get voting' API request fail", () => {
        const store = getStore();

        store.commit("voting/getVotingFail", "ERROR");

        expect(store.getters["voting/voting"]).toEqual(undefined);
        expect(store.getters["voting/getVotingIsLoading"]).toEqual(false);
        expect(store.getters["voting/getVotingError"]).toEqual("ERROR");
      });
    });
  });

  describe("Voting Store Module: Actions", () => {
    describe("Action: getVoting", () => {
      it("get a voting successfuly", async () => {
        const store = getStore();
        const voting = generateVoting();
        const input = { id: voting.id };

        api.votings.getVoting = jest.fn().mockResolvedValue(voting);

        await store.dispatch("voting/getVoting", input);

        expect(api.votings.getVoting).toBeCalledTimes(1);
        expect(api.votings.getVoting).toBeCalledWith(input);
        expect(store.getters["voting/getVotingIsLoading"]).toEqual(false);
        expect(store.getters["voting/getVotingError"]).toEqual(false);
      });
      it("get a voting throw an error", async () => {
        const store = getStore();
        const voting = generateVoting();
        const input = { id: voting.id };

        api.votings.getVoting = jest.fn().mockRejectedValue(new ApiError("ERROR"));

        await store.dispatch("voting/getVoting", input);

        expect(api.votings.getVoting).toBeCalledTimes(1);
        expect(api.votings.getVoting).toBeCalledWith(input);
        expect(store.getters["voting/getVotingIsLoading"]).toEqual(false);
        expect(store.getters["voting/getVotingError"]).toEqual("ERROR");
      });
    });
  });
});
