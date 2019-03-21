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

import "@/filters";

import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { Store } from "vuex-mock-store";
import { toDateTime } from "@/utils/datetime";

import { generateGroup } from "@/__mocks__/data/groups";

import GroupDetail from "./GroupDetail.vue";

const getStore = () => {
  return new Store({
    state: {
      group: {},
    },
    getters: {
      "group/group": undefined as any,
      "group/getGroupError": false,
      "group/getGroupIsLoading": false,
    },
  });
};

const getWrapper = (...params: any) => {
  return shallowMount(
    GroupDetail,
    Object.assign(
      { stubs: { RouterLink: RouterLinkStub } },
      ...params,
    ),
  );
};

describe("View: GroupDetail", () => {
  it("call getGroup action after is monted", () => {
    const group = generateGroup();
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("group/getGroup", {id: group.id});
  });
  it("show edit action for admin user", () => {
    const group = generateGroup({ isCurrentUserAdmin: true });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;

    expect(wrapper.contains("[data-testid='action-edit']")).toBe(true);
  });
  it("dosen't show the edit action for no admin user", () => {
    const group = generateGroup({ isCurrentUserAdmin: false });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;

    expect(wrapper.contains("[data-testid='action-edit']")).toBe(false);
  });
  it("show voting days and voting time values", () => {
    const group = generateGroup({
      votingDays: ["MONDAY", "TUESDAY"],
      votingTime: toDateTime("12:00"),
    });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;
    expect(wrapper.find("[data-testid='voting-days']").text()).toEqual("COMMON.DAYS.MONDAY, COMMON.DAYS.TUESDAY");
    expect(wrapper.find("[data-testid='voting-time']").text()).toEqual("12:00 PM");
  });
  it("has anonymous vote allowed", () => {
    const group = generateGroup({
      anonymousVote: true,
    });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;
    expect(wrapper.contains("[data-testid='anonymous-vote-allowed']")).toBe(true);
    expect(wrapper.contains("[data-testid='anonymous-vote-deny']")).toBe(false);
  });
  it("has anonymous vote deny", () => {
    const group = generateGroup({
      anonymousVote: false,
    });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;
    expect(wrapper.contains("[data-testid='anonymous-vote-allowed']")).toBe(false);
    expect(wrapper.contains("[data-testid='anonymous-vote-deny']")).toBe(true);
  });
  it("has member list visible", () => {
    const group = generateGroup({
      visibleMemberList: true,
    });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;
    expect(wrapper.contains("[data-testid='member-list']")).toBe(true);
  });
  it("has member list hidden", () => {
    const group = generateGroup({
      visibleMemberList: false,
    });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;
    expect(wrapper.contains("[data-testid='member-list']")).toBe(false);
  });
});

