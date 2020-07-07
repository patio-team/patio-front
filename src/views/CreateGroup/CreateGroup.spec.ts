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

import { generateGroup } from "@/__mocks__/data/groups";

import CreateGroup from "./CreateGroup.vue";

const getStore = () => {
  return new Store({
    state: {
      groups: {},
      auth: {},
    },
    getters: {
      "groups/createGroupIsLoading": false,
      "groups/createGroupError": false,
    },
  });
};
const getWrapper = (...params: any) => {
  return shallowMount(
    CreateGroup,
    ...params,
  );
};

describe("View: CreateGroup", () => {
  it("show the form", () => {
    const store = getStore();
    const wrapper = getWrapper({
      mocks: { $store: store },
      stubs: ["router-link"],
    });

    expect(wrapper.contains("[data-testid='group-form']")).toBe(true);
  });

  it("successfully submit the form", async () => {
    const group = generateGroup();
    delete group.members;
    const createGroupInput = Object.assign({}, {...group});
    delete createGroupInput.id;

    const store = getStore();
    const router = { push: jest.fn() };
    const wrapper = getWrapper({ mocks: { $store: store, $router: router }, stubs: ["router-link"] });
    const vm = wrapper.vm as any;

    store.dispatch.mockResolvedValue(group);

    await vm.handleCreateGroupSubmit(createGroupInput);

    expect(store.dispatch).toHaveBeenCalledWith("groups/createGroup", createGroupInput);
    expect(router.push).toHaveBeenCalledWith({name: "team", params: {groupId: group.id}});
  });
  it("submit the form with errors", async () => {
    const group = generateGroup();
    delete group.members;
    const createGroupInput = Object.assign({}, {...group});
    delete createGroupInput.id;

    const store = getStore();
    const router = { push: jest.fn() };
    const wrapper = getWrapper({ mocks: { $store: store, $router: router }, stubs: ["router-link"] });
    const vm = wrapper.vm as any;

    await vm.handleCreateGroupSubmit(createGroupInput);

    expect(store.dispatch).toHaveBeenCalledWith("groups/createGroup", createGroupInput);
    expect(router.push).toHaveBeenCalledTimes(0);
  });
});
