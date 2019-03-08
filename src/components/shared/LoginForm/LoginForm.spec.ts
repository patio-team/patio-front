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
import LoginForm from "./LoginForm.vue";

const getStore = () => {
  return new Store({
    state: {
      auth: {},
    },
    getters: {
      "auth/loginIsLoading": false,
      "auth/loginError": false,
    },
  });
};

const getWrapper = (...params: any) => {
  return mount(LoginForm, ...params);
};

describe("Component: shared/LoginForm", () => {
  it("show empty initial state", () => {
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store } });

    expect(store.dispatch).toHaveBeenCalledTimes(0);

    expect(wrapper.contains("[data-testid='form']")).toBe(true);
    expect(wrapper.contains("[data-testid='email']")).toBe(true);
    expect(wrapper.contains("[data-testid='password']")).toBe(true);
    expect(wrapper.contains("[data-testid='submit']")).toBe(true);
    expect(wrapper.contains("[data-testid='forgot-password']")).toBe(true);
  });
  it("show loading state", () => {
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store } });

    expect(wrapper.contains("[data-testid='submit']:disabled")).toBe(false);

    store.getters["auth/loginIsLoading"] = true;

    expect(wrapper.contains("[data-testid='submit']:disabled")).toBe(true);
  });
  it("triggers login", () => {
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store } });

    wrapper.find("[data-testid='password']").setValue("password");
    wrapper.find("[data-testid='email']").setValue("email@email.com");
    wrapper.find("[data-testid='form']").trigger("submit.prevent");

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("auth/login", { email: "email@email.com", password: "password" });
  });
  it("show error state", () => {
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store } });

    store.getters["auth/loginError"] = true;

    expect(wrapper.contains("[data-testid='error']")).toBe(true);
  });
});
