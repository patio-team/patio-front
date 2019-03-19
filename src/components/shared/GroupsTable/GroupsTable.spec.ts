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
import { mount, RouterLinkStub } from "@vue/test-utils";

import { Group } from "@/domain";
import { generateGroup } from "@/__mocks__/data/groups";

import GroupsTable from "./GroupsTable.vue";


const getStore = () => {
  return new Store({
    state: {
      groups: {},
    },
    getters: {
      "groups/groupList": [] as Group[],
      "groups/groupListIsLoading": false,
      "groups/groupListError": false,
    },
  });
};

const getWrapper = ({...params}) => {
  return mount(
    GroupsTable,
    {
      stubs: { RouterLink: RouterLinkStub },
      ...params,
    },
  );
};

describe("Component: shared/GroupsTable", () => {
  it("show empty for initial state", () => {
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store } });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("groups/getGroupList");
    expect(wrapper.contains("[data-testid='loading']")).toBe(false);
    expect(wrapper.contains("[data-testid='row-empty']")).toBe(true);
    expect(wrapper.contains("[data-testid='row']")).toBe(false);
  });
  it("show loading if API call is pending", () => {
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store } });

    store.getters["groups/groupListIsLoading"] = true;

    expect(wrapper.contains("[data-testid='loading']")).toBe(true);
    expect(wrapper.contains("[data-testid='row-empty']")).toBe(false);
    expect(wrapper.contains("[data-testid='row']")).toBe(false);
  });
  it("list two groups", () => {
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store } });
    const groupList = [generateGroup(), generateGroup()];

    store.getters["groups/groupList"] = groupList;

    const rows = wrapper.findAll("[data-testid='row']");
    expect(rows.length).toBe(2);
    expect(rows.at(0).find("[data-testid='name']").text()).toEqual(groupList[0].name);
    expect(rows.at(0).contains("[data-testid='action-edit']")).toBe(true);
    expect(rows.at(0).contains("[data-testid='action-delete']")).toBe(true);
    expect(rows.at(1).find("[data-testid='name']").text()).toEqual(groupList[1].name);
    expect(rows.at(1).contains("[data-testid='action-edit']")).toBe(true);
    expect(rows.at(1).contains("[data-testid='action-delete']")).toBe(true);
  });
});
