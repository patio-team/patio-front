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

import { mount } from "@vue/test-utils";
import { Store } from "vuex-mock-store";
import flushPromises from "flush-promises";

import { generateGroup } from "@/__mocks__/data/groups";
import { generateVoting } from "@/__mocks__/data/votings";

import VoteForm from "./VoteForm.vue";

const getStore = () => {
  return new Store({
    state: {
      votings: {},
    },
    getters: {
      "votings/createVoteIsLoading": false,
      "votings/createVoteError": false,
    },
  });
};

const getWrapper = (...params: any) => {
  return mount(VoteForm, ...params);
};

describe("Component: shared/VoteForm", () => {
  it("show empty initial statei when anonymous vote are anabled", () => {
    const store = getStore();
    const group = generateGroup({anonymousVote: true});
    const voting = generateVoting();
    const wrapper = getWrapper({
      propsData: { group, voting },
      mocks: { $store: store },
    });

    expect(wrapper.contains("[data-testid='form']")).toBeTruthy();
    expect(wrapper.contains("[data-testid='commentlabel']")).toBeTruthy();
    expect(wrapper.contains("[data-testid='comment']")).toBeTruthy();

    expect(wrapper.contains("[data-testid='anonymouscontainer']")).toBeTruthy();
  });

  it("show empty initial statei when anonymous vote are disabled", () => {
    const store = getStore();
    const group = generateGroup({anonymousVote: false});
    const voting = generateVoting();
    const wrapper = getWrapper({
      propsData: { group, voting },
      mocks: { $store: store },
    });

    expect(wrapper.contains("[data-testid='form']")).toBeTruthy();
    expect(wrapper.contains("[data-testid='commentlabel']")).toBeTruthy();
    expect(wrapper.contains("[data-testid='comment']")).toBeTruthy();

    expect(wrapper.contains("[data-testid='anonymouscontainer']")).toBeFalsy();
  });


  it("create vote successfully", async () => {
    const store = getStore();
    const group = generateGroup({id: "groupId"});
    const voting = generateVoting({id: "votingId"});
    const router = { push: jest.fn() };
    const wrapper = getWrapper({
      propsData: { group, voting },
      mocks: { $store: store, $router: router },
    });

    store.dispatch.mockClear();
    store.dispatch.mockResolvedValue(true);

    wrapper.find("[data-testid='one']").setChecked();
    wrapper.find("[data-testid='comment']").setValue("comment");
    wrapper.find("[data-testid='submit']").trigger("submit.prevent");

    await flushPromises();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      "votings/createVote",
      {
        anonymous: false,
        comment: "comment",
        groupId: "groupId",
        score: "1",
        votingId: "votingId",
      },
    );
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(
      {name: "groups:votings:detail", params: {groupId: "groupId", votingId: "votingId"}},
    );
  });

  it("create vote error", async () => {
    const store = getStore();
    const group = generateGroup({id: "groupId"});
    const voting = generateVoting({id: "votingId"});
    const router = { push: jest.fn() };
    const wrapper = getWrapper({
      propsData: { group, voting },
      mocks: { $store: store, $router: router },
    });

    store.dispatch.mockClear();
    store.dispatch.mockResolvedValue(undefined);

    wrapper.find("[data-testid='one']").setChecked();
    wrapper.find("[data-testid='comment']").setValue("comment");
    wrapper.find("[data-testid='submit']").trigger("submit.prevent");

    await flushPromises();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      "votings/createVote",
      {
        anonymous: false,
        comment: "comment",
        groupId: "groupId",
        score: "1",
        votingId: "votingId",
      },
    );
    expect(router.push).toHaveBeenCalledTimes(0);
  });
});
