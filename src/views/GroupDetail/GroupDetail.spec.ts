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

import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { toDateTime } from "@/utils/datetime";

import { generateGroup } from "@/__mocks__/data/groups";

import GroupDetail from "./GroupDetail.vue";

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
  it("change subtitle", () => {
    const group = generateGroup({
      votingDays: ["MONDAY", "TUESDAY"],
      votingTime: toDateTime("12:00"),
    });
    const wrapper = getWrapper({
      propsData: { group },
    });
    expect(wrapper.emitted()["set-subtitle"][0]).toEqual([""]);
  });
  it("show voting days and voting time values", () => {
    const group = generateGroup({
      votingDays: ["MONDAY", "TUESDAY"],
      votingTime: toDateTime("12:00"),
    });
    const wrapper = getWrapper({
      propsData: { group },
    });
    expect(wrapper.emitted()["set-subtitle"][0]).toEqual([""]);

    expect(wrapper.find("[data-testid='voting-days']").text()).toEqual("COMMON.DAYS.MONDAY, COMMON.DAYS.TUESDAY");
    expect(wrapper.find("[data-testid='voting-time']").text()).toEqual("12:00 PM");
  });
  it("has anonymous vote allowed", () => {
    const group = generateGroup({
      anonymousVote: true,
    });
    const wrapper = getWrapper({
      propsData: { group },
    });

    expect(wrapper.contains("[data-testid='anonymous-vote-allowed']")).toBe(true);
    expect(wrapper.contains("[data-testid='anonymous-vote-deny']")).toBe(false);
  });
  it("has anonymous vote deny", () => {
    const group = generateGroup({
      anonymousVote: false,
    });
    const wrapper = getWrapper({
      propsData: { group },
    });

    expect(wrapper.contains("[data-testid='anonymous-vote-allowed']")).toBe(false);
    expect(wrapper.contains("[data-testid='anonymous-vote-deny']")).toBe(true);
  });
  it("has member list visible", () => {
    const group = generateGroup({
      visibleMemberList: true,
    });
    const wrapper = getWrapper({
      propsData: { group },
    });

    expect(wrapper.contains("[data-testid='member-list']")).toBe(true);
  });
  it("has member list hidden", () => {
    const group = generateGroup({
      visibleMemberList: false,
    });
    const wrapper = getWrapper({
      propsData: { group },
    });

    expect(wrapper.contains("[data-testid='member-list']")).toBe(false);
  });
});
