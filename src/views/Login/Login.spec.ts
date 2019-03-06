import { shallowMount } from "@vue/test-utils";

import Login from "./Login.vue";

const getWrapper = (...params: any) => {
  return shallowMount(Login, ...params);
};

describe("View: Login", () => {
  it("show the logo", () => {
    const wrapper = getWrapper();

    expect(wrapper.contains("[data-testid='form']")).toBe(true);
  });
});
