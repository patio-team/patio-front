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

import { generateGroup } from "@/__mocks__/data/groups";
import { generateUser } from "@/__mocks__/data/users";

import GroupMemberList from "./GroupMemberList.vue";

const getWrapper = (...params: any) => {
  return mount(GroupMemberList, ...params);
};

describe("Component: shared/GroupMemberList", () => {
  it("show empty list of members", () => {
    const group = generateGroup({ members: [] });
    const props = { group };
    const wrapper = getWrapper({ propsData: props });

    expect(wrapper.contains("[data-testid='row-empty']")).toBe(true);
    expect(wrapper.contains("[data-testid='row']")).toBe(false);
  });
  it("show two members for admin users", () => {
    const members = [generateUser(), generateUser()];
    const group = generateGroup({ members, isCurrentUserAdmin: true });
    const props = { group };
    const wrapper = getWrapper({ propsData: props });

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
    const props = { group };
    const wrapper = getWrapper({ propsData: props });

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
});
