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

import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { Store } from "vuex-mock-store";

import { generateGroup } from "@/__mocks__/data/groups";
import { generateVoting } from "@/__mocks__/data/votings";

import Vote from "./Vote.vue";

const getStore = () => {
  return new Store({
    state: {
      group: {},
      voting: {},
    },
    getters: {
      "group/group": undefined as any,
      "voting/voting": undefined as any,
      "voting/getVotingIsLoading": false,
      "voting/getVotingError": false,
    },
  });
};

const getWrapper = (...params: any) => {
  return shallowMount(
    Vote,
    Object.assign(
      { stubs: { RouterLink: RouterLinkStub } },
      ...params,
    ),
  );
};

describe("View: Vote", () => {
  it("show the form", () => {
    const route = { params: { votingId: "voting-dd", groupId: "group-id"}};

    const store = getStore();
    const group = generateGroup();
    const voting = generateVoting();

    store.getters["group/group"] = group;
    store.getters["voting/voting"] = voting;
    store.dispatch.mockReturnValue(voting);

    const wrapper = getWrapper({
      propsData: { group },
      mocks: { $store: store, $route: route},
    });

    expect(wrapper.contains("[data-testid='vote-form']")).toBe(true);
  });
});
