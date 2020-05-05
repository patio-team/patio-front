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

import { toDateTime, formatToTime24Simple } from "@/utils/datetime";
import { generateGroup } from "@/__mocks__/data/groups";

import GroupForm from "./GroupForm.vue";

const getWrapper = (...params: any) => {
  return mount(GroupForm, ...params);
};

describe("Component: shared/GroupForm", () => {
  it("show empty initial state", () => {
    const props = {
      isLoading: false,
      error: false,
      onSubmit: jest.fn(),
    };
    const wrapper = getWrapper({ propsData: props });
    const vm = wrapper.vm as any;

    expect(props.onSubmit).toHaveBeenCalledTimes(0);
    expect(wrapper.contains("[data-testid='form']")).toBe(true);
    expect(wrapper.contains("[data-testid='error']")).toBe(false);
    expect(vm.input.name).toEqual("");
    expect(vm.input.visibleMemberList).toEqual(false);
    expect(vm.input.anonymousVote).toEqual(false);
    expect(vm.input.votingDays).toEqual(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]);
    expect(vm.input.votingTime).toEqual(toDateTime("12:00"));
  });
  it("show empty initial state with group", () => {
    const group = generateGroup();

    const props = {
      group,
      isLoading: false,
      error: false,
      onSubmit: jest.fn(),
    };
    const wrapper = getWrapper({ propsData: props });
    const vm = wrapper.vm as any;

    expect(props.onSubmit).toHaveBeenCalledTimes(0);
    expect(wrapper.contains("[data-testid='form']")).toBe(true);
    expect(wrapper.contains("[data-testid='error']")).toBe(false);
    expect(vm.input.id).toEqual(group.id);
    expect(vm.input.name).toEqual(group.name);
    expect(vm.input.visibleMemberList).toEqual(group.visibleMemberList);
    expect(vm.input.anonymousVote).toEqual(group.anonymousVote);
    expect(vm.input.votingDays).toEqual(group.votingDays);
    expect(vm.input.votingTime).toEqual(group.votingTime);
  });
  it("show loading state", () => {
    const props = {
      isLoading: false,
      error: false,
      onSubmit: jest.fn(),
    };
    const wrapper = getWrapper({ propsData: props });

    expect(wrapper.contains("[data-testid='submit']:disabled")).toBe(false);

    wrapper.setProps({isLoading: true});

    expect(wrapper.contains("[data-testid='submit']:disabled")).toBe(true);
  });
  it("triggers submit", () => {
    const props = {
      isLoading: false,
      error: false,
      onSubmit: jest.fn(),
    };
    const wrapper = getWrapper({ propsData: props });

    wrapper.find("[data-testid='name']").setValue("TEST NAME");
    wrapper.find("[data-testid='visible-member-list']").setChecked(true);
    wrapper.find("[data-testid='anonymous-vote']").setChecked(false);
    wrapper.find("[data-testid='voting-day-mon']").setChecked(true);
    wrapper.find("[data-testid='voting-day-tue']").setChecked(false);
    wrapper.find("[data-testid='voting-day-wed']").setChecked(true);
    wrapper.find("[data-testid='voting-day-thu']").setChecked(false);
    wrapper.find("[data-testid='voting-day-fri']").setChecked(true);
    wrapper.find("[data-testid='voting-day-sat']").setChecked(false);
    wrapper.find("[data-testid='voting-day-sun']").setChecked(true);
    wrapper.find("[data-testid='voting-time']").setValue("14:35");

    wrapper.find("[data-testid='form']").trigger("submit.prevent");

    expect(wrapper.emitted().submit).toBeTruthy();
    expect(wrapper.emitted().submit[0][0]).toEqual({
      name: "TEST NAME",
      visibleMemberList: true,
      anonymousVote: false,
      votingDays: ["MONDAY", "WEDNESDAY", "FRIDAY", "SUNDAY"],
      votingTime: toDateTime("14:35"),
    });
  });
  it("show error state", () => {
    const props = {
      isLoading: false,
      error: false,
      onSubmit: jest.fn(),
    };
    const wrapper = getWrapper({ propsData: props });

    expect(wrapper.contains("[data-testid='error']")).toBe(false);

    wrapper.setProps({error: "TEST ERROR"});

    expect(wrapper.contains("[data-testid='error']")).toBe(true);
    expect(wrapper.find("[data-testid='error']").text()).toEqual("TEST ERROR");
  });
});
