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

import AddMemberForm from "./AddMemberForm.vue";

const getWrapper = (...params: any) => {
  return mount(AddMemberForm, ...params);
};

describe("Component: shared/AddMemberForm", () => {
  it("show empty initial state", () => {
    const props = {
      isLoading: false,
      error: false,
    };
    const wrapper = getWrapper({ propsData: props });
    const vm = wrapper.vm as any;

    expect(wrapper.contains("[data-testid='form']")).toBe(true);
    expect(wrapper.contains("[data-testid='error']")).toBe(false);
    expect(vm.input.email).toEqual("");
    expect(wrapper.emitted("submit")).toBeFalsy();
    expect(wrapper.emitted("cancel")).toBeFalsy();
  });
  it("show loading state", () => {
    const props = {
      isLoading: false,
      error: false,
    };
    const wrapper = getWrapper({ propsData: props });

    expect(wrapper.contains("[data-testid='submit']:disabled")).toBe(false);

    wrapper.setProps({isLoading: true});

    expect(wrapper.contains("[data-testid='submit']:disabled")).toBe(true);
    expect(wrapper.emitted("submit")).toBeFalsy();
    expect(wrapper.emitted("cancel")).toBeFalsy();
  });
  it("triggers submit", () => {
    const group = generateGroup();
    const props = {
      group,
      isLoading: false,
      error: false,
    };
    const wrapper = getWrapper({ propsData: props });

    wrapper.find("[data-testid='email']").setValue("test@email.com");

    wrapper.find("[data-testid='form']").trigger("submit.prevent");

    expect(wrapper.emitted("submit")).toBeTruthy();
    expect(wrapper.emitted("submit").length).toBe(1);
    expect(wrapper.emitted("submit")[0][0]).toEqual({
      groupId: group.id,
      email: "test@email.com",
    });
    expect(wrapper.emitted("cancel")).toBeFalsy();
  });
  it("triggers cancel", () => {
    const group = generateGroup();
    const props = {
      group,
      isLoading: false,
      error: false,
    };
    const wrapper = getWrapper({ propsData: props });

    wrapper.find("[data-testid='cancel']").trigger("click");

    expect(wrapper.emitted("cancel")).toBeTruthy();
    expect(wrapper.emitted("cancel").length).toBe(1);
    expect(wrapper.emitted("submit")).toBeFalsy();
  });
  it("show error state", () => {
    const props = {
      isLoading: false,
      error: false,
    };
    const wrapper = getWrapper({ propsData: props });

    expect(wrapper.contains("[data-testid='error']")).toBe(false);

    wrapper.setProps({error: "TEST ERROR"});

    expect(wrapper.contains("[data-testid='error']")).toBe(true);
    expect(wrapper.find("[data-testid='error']").text()).toEqual("TEST ERROR");
  });
});
