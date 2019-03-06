import { shallowMount } from "@vue/test-utils";

import GroupList from "./GroupList.vue";

const getWrapper = (...params: any) => {
  return shallowMount(GroupList, ...params);
};

describe("View: GroupList", () => {
  it("show the groups table", () => {
    const wrapper = getWrapper();

    expect(wrapper.contains("[data-testid='action-add']")).toBe(true);
    expect(wrapper.contains("[data-testid='groups-table']")).toBe(true);
  });
});
