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
import { generateVoting, generateVotingList } from "@/__mocks__/data/votings";

import MockAdapter from "axios-mock-adapter";
import { client } from "@/services/api";

import api from "./votings";

import {
  CreateVoteMutation,
  GetVotingQuery,
} from "./queries/votings";
import {
  CreateVoteInput,
  GetVotingInput,
} from "./types";

const mock = new MockAdapter(client);

describe("API Votings Services", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("API Votings Services: create vote", () => {
    it("should create a vote successfully", async () => {
      const input = {} as CreateVoteInput;

      mock
        .onPost("", { query: CreateVoteMutation, variables: {} })
        .reply(
          200,
          JSON.stringify({
            data: { createVote: {} },
          }),
        );

      const data = await api(client).createVote(input);
      expect(data).toBeTruthy();
    });
    it("should throw an error", async () => {
      const input = {} as CreateVoteInput;

      mock
        // .onPost("", { query: CreateVoteMutation, variables: {} })
        .onPost("")
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).createVote(input);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });
  describe("API Votings Services: get", () => {
    it("should get voting data successfully", async () => {
      const voting = generateVoting();

      const input = {
        id: voting.id,
      };

      mock
        .onPost("", { query: GetVotingQuery, variables: input })
        .reply(
          200,
          JSON.stringify({
            data: { getVoting: voting },
          }),
        );

      const data = await api(client).getVoting(input);
      expect(data).toEqual(voting);
    });

    it("should throw an error", async () => {
      const voting = generateVoting();

      const variables = {
        id: voting.id,
      };

      mock
        .onPost("", { query: GetVotingQuery, variables })
        .reply(
          200,
          JSON.stringify({
            errors: [{extensions: {code: "ERROR_CODE"}, message: "ERROR_MESSAGE"}],
          }),
        );

      let err;
      try {
        await api(client).getVoting(variables);
      } catch (e) { err = e; }

      expect(err.code).toEqual("ERROR_CODE");
    });
  });
});
