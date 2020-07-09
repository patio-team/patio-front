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

import MyProfile from "./MyProfile.vue";

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
    MyProfile,
    {
      stubs: { RouterLink: RouterLinkStub },
      ...params,
    },
  );
};

describe("View: MyProfile", () => {
  it("initial status", () => {
    const me = generateUser({email: "email@email.com"});
    const store = getStore();
    const wrapper = getWrapper({ mocks: { $store: store }});

    store.getters["auth/myProfile"] = me;

    expect(wrapper.find("[data-testid='user-name']").text()).toEqual(me.name);
    expect(wrapper.find("[data-testid='user-email']").text()).toEqual(me.email);
    expect(wrapper.find("[data-testid='user-avatar']").exists());
  });
});
