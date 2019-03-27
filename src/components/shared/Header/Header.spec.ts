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

import { generateUser } from "@/__mocks__/data/users";

import Header from "./Header.vue";

const getStore = () => {
  return new Store({
    state: {
      auth: {},
    },
    getters: {
      "auth/myProfile": undefined as any,
    },
  });
};

const getWrapper = ({...params} = {}) => {
  return mount(
    Header,
    {
      stubs: { RouterLink: RouterLinkStub },
      ...params,
    },
  );
};

describe("Component: shared/Header", () => {
  it("initial status for anonymous user", () => {
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store }});

    expect(wrapper.contains("[data-testid='logo']")).toBe(true);
    expect(wrapper.contains("[data-testid='actions']")).toBe(false);
  });
  it("initial status for authenticated user", () => {
    const me = generateUser({email: "email@email.com"});
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store }});

    store.getters["auth/myProfile"] = me;

    expect(wrapper.contains("[data-testid='logo']")).toBe(true);
    expect(wrapper.contains("[data-testid='actions']")).toBe(true);
    expect(wrapper.find("[data-testid='user-name']").text()).toEqual(me.name);
    expect(wrapper.find("[data-testid='user-avatar']").attributes("src")).toEqual(
      "https://www.gravatar.com/avatar/4f64c9f81bb0d4ee969aaf7b4a5a6f40?s=50&d=robohash");
  });
  it("logout from m the app", () => {
    const me = generateUser({email: "email@email.com"});
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store }});

    store.getters["auth/myProfile"] = me;
    wrapper.find("[data-testid='user-menu'").trigger("mouseover");
    wrapper.find("[data-testid='action-logout'").trigger("click");

    expect(store.dispatch).toBeCalledTimes(1);
    expect(store.dispatch).toBeCalledWith("auth/logout");
  });
  it("gets empty gravatar url for non user", () => {
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store } });
    const vm: any = wrapper.vm;

    expect(vm.gravatarImageSrc).toEqual("");
  });
  it("gets empty gravatar url for non user email", () => {
    const me = generateUser({email: undefined});
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store }});
    const vm: any = wrapper.vm;

    store.getters["auth/myProfile"] = me;

    expect(vm.gravatarImageSrc).toEqual("");
  });

});
