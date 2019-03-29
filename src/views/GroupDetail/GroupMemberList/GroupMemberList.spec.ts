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

import { Group } from "@/domain";
import { generateGroup } from "@/__mocks__/data/groups";
import { generateUser } from "@/__mocks__/data/users";

import GroupMemberList from "./GroupMemberList.vue";

const getStore = () => {
  return new Store({
    state: {
      group: {},
    },
    getters: {
      "group/group": undefined as any,
      "group/addUserToGroupIsLoading": false,
      "group/addUserToGroupError": false,
    },
  });
};
const getWrapper = (...params: any) => {
  return mount(GroupMemberList, ...params);
};

describe("Component: shared/GroupMemberList", () => {
  it("show empty list of members", () => {
    const group = generateGroup({ members: [] });
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store }});

    store.getters["group/group"] = group;

    expect(wrapper.contains("[data-testid='row-empty']")).toBe(true);
    expect(wrapper.contains("[data-testid='row']")).toBe(false);
  });
  it("show two members for admin users", () => {
    const members = [generateUser(), generateUser()];
    const group = generateGroup({ members, isCurrentUserAdmin: true });
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store }});

    store.getters["group/group"] = group;

    expect(wrapper.contains("[data-testid='row-empty']")).toBe(false);
    expect(wrapper.contains("[data-testid='row']")).toBe(true);
    expect(wrapper.contains("[data-testid='action-add-member']")).toBe(true);

    const rows = wrapper.findAll("[data-testid='row']");
    expect(rows.length).toBe(2);
    expect(rows.at(0).find("[data-testid='name']").text()).toEqual(members[0].name);
    expect(rows.at(0).contains("[data-testid='action-delete-member']")).toBe(true);
    expect(rows.at(1).find("[data-testid='name']").text()).toEqual(members[1].name);
    expect(rows.at(0).contains("[data-testid='action-delete-member']")).toBe(true);
  });
  it("show two members for no-admin users", () => {
    const members = [generateUser(), generateUser()];
    const group = generateGroup({ members, isCurrentUserAdmin: false });
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store }});

    store.getters["group/group"] = group;

    expect(wrapper.contains("[data-testid='row-empty']")).toBe(false);
    expect(wrapper.contains("[data-testid='row']")).toBe(true);
    expect(wrapper.contains("[data-testid='action-add-member']")).toBe(false);

    const rows = wrapper.findAll("[data-testid='row']");
    expect(rows.length).toBe(2);
    expect(rows.at(0).find("[data-testid='name']").text()).toEqual(members[0].name);
    expect(rows.at(0).contains("[data-testid='action-delete-member']")).toBe(false);
    expect(rows.at(1).find("[data-testid='name']").text()).toEqual(members[1].name);
    expect(rows.at(0).contains("[data-testid='action-delete-member']")).toBe(false);
  });
  it("show add member dialog", () => {
    const group = generateGroup({ members: [], isCurrentUserAdmin: true });
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store }});
    const vm = wrapper.vm as any;

    vm.$modal.push = jest.fn();
    store.getters["group/group"] = group;

    wrapper.find("[data-testid='action-add-member']").trigger("click");

    expect(vm.$modal.push).toBeCalledTimes(1);
    expect(vm.$modal.push).toBeCalledWith("add-member");
  });
  it("close add member dialog", () => {
    const group = generateGroup({ members: [], isCurrentUserAdmin: true });
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store }});
    const vm = wrapper.vm as any;

    vm.$modal.pop = jest.fn();
    store.getters["group/group"] = group;

    vm.handleAddMemberCancel();

    expect(wrapper.vm.$modal.pop).toBeCalledTimes(1);
    expect(wrapper.vm.$modal.pop).toBeCalledWith();
    expect(store.commit).toBeCalledTimes(1);
    expect(store.commit).toBeCalledWith("group/addUserToGroupReset");
  });
  it("add a member successfully", async () => {
    const group = generateGroup({ members: [], isCurrentUserAdmin: true });
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store }});
    const vm = wrapper.vm as any;

    vm.$modal.pop = jest.fn();
    vm.$notify.success = jest.fn();
    store.getters["group/group"] = group;
    store.dispatch.mockReturnValue(Promise.resolve(true));

    const input = { groupId: "123", email: "email@email.com" };
    await vm.handleAddMemberSubmit({ groupId: "123", email: "email@email.com" });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, "group/addUserToGroup", input);
    expect(store.dispatch).toHaveBeenNthCalledWith(2, "group/getGroup", {id: group.id});
    expect(store.commit).toBeCalledTimes(1);
    expect(store.commit).toBeCalledWith("group/addUserToGroupReset");
    expect(vm.$modal.pop).toBeCalledTimes(1);
    expect(vm.$modal.pop).toBeCalledWith();
    expect(vm.$notify.success).toBeCalledTimes(1);
  });
  it("add a member throw and error", async () => {
    const group = generateGroup({ members: [], isCurrentUserAdmin: true });
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store }});
    const vm = wrapper.vm as any;

    vm.$modal.pop = jest.fn();
    vm.$notify.error = jest.fn();
    store.getters["group/group"] = group;
    store.dispatch.mockReturnValue(Promise.resolve(false));

    const input = { groupId: "123", email: "email@email.com" };
    await vm.handleAddMemberSubmit({ groupId: "123", email: "email@email.com" });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, "group/addUserToGroup", input);
    expect(store.commit).toBeCalledTimes(0);
    expect(vm.$modal.pop).toBeCalledTimes(0);
    expect(vm.$notify.error).toBeCalledTimes(1);
  });
});
