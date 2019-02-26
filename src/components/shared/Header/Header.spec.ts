import { mount } from "@vue/test-utils";

import Header from "./Header.vue";

const getWrapper = (...params: any) => {
  return mount(Header, ...params);
};

describe("Component: shared/Header", () => {
  it("show the logo", () => {
    const wrapper = getWrapper();

    expect(wrapper.contains("[data-testid='logo']")).toBe(true);
  });
});
