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

import { Store } from "vuex-mock-store";
import { mount } from "@vue/test-utils";
import VoteForm from "./VoteForm.vue";

const getStore = () => {
  return new Store({
    state: {
      votings: {},
      group: {},
    },
    getters: {
      "votings/createVoteIsLoading": false,
      "votings/createVoteError": false,
      "group/group": undefined as any,
    },
  });
};

const getWrapper = (...params: any) => {
  return mount(VoteForm, ...params);
};

describe("Component: shared/VoteForm", () => {
  it("show empty initial state", () => {
    const store = getStore();
    const group = { anonymousVote: false };
    const route = { params: { voting: "", group: ""}};
    const wrapper = getWrapper({
      mocks: { $store: store, $route: route},
    });

    store.getters["group/group"] = group;

    expect(store.dispatch).toHaveBeenCalledTimes(1);

    expect(wrapper.contains("[data-testid='form']")).toBeTruthy();
    expect(wrapper.contains("[data-testid='commentlabel']")).toBeTruthy();
    expect(wrapper.contains("[data-testid='comment']")).toBeTruthy();

    expect(wrapper.contains("[data-testid='anonymouscontainer']")).toBeTruthy();
    expect(wrapper.contains("[data-testid='anonymouslabel']")).toBeFalsy();
    expect(wrapper.contains("[data-testid='anonymous']")).toBeFalsy();
  });

  it("create vote successfully", () => {
    const store = getStore();
    const route = { params: { voting: "votingId", group: "groupId"}};
    const wrapper = getWrapper({
      mocks: { $store: store, $route: route},
    });

    store.dispatch.mockClear();

    wrapper.find("[data-testid='one']").setChecked();
    wrapper.find("[data-testid='comment']").setValue("comment");
    wrapper.find("[data-testid='submit']").trigger("submit.prevent");

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      "votings/createVote", {
        anonymous: false,
        comment: "comment",
        groupId: "groupId",
        score: "1",
        votingId: "votingId"});
  });
});
