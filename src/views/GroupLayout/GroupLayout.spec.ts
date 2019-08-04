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

import { shallowMount } from "@vue/test-utils";
import { Store } from "vuex-mock-store";
import { toDateTime } from "@/utils/datetime";

import { generateGroup } from "@/__mocks__/data/groups";

import GroupLayout from "./GroupLayout.vue";

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
    GroupLayout,
    Object.assign(
      { stubs: ["router-link", "router-view"] },
      ...params,
    ),
  );
};

describe("View: GroupLayout", () => {
  it("call getGroup action after is monted", () => {
    const group = generateGroup();
    const store = getStore();
    const route = { params: { groupId: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });
    const vm = wrapper.vm as any;

    store.getters["group/group"] = group;

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("group/getGroup", {
      id: group.id,
    });
  });
  it("set a new subtitle", () => {
    const group = generateGroup();
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });
    const vm = wrapper.vm as any;

    store.getters["group/group"] = group;

    expect(wrapper.contains("[data-testid='subtitle']")).toBe(false);

    vm.setSubtitle("test subtitle");

    expect(wrapper.find("[data-testid='subtitle']").text()).toEqual("test subtitle");
  });
});

