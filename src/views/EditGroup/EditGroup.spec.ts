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

import { shallowMount } from "@vue/test-utils";
import { Store } from "vuex-mock-store";

import { generateGroup } from "@/__mocks__/data/groups";

import EditGroup from "./EditGroup.vue";

const getStore = () => {
  return new Store({
    state: {
      group: {},
    },
    getters: {
      "group/group": undefined as any,
      "group/editIsLoading": false,
      "group/editError": false as boolean | string,
    },
  });
};
const getWrapper = (...params: any) => {
  return shallowMount(
    EditGroup,
    ...params,
  );
};

describe("View: EditGroup", () => {
  it("show the form", () => {
    const group = generateGroup();
    delete group.members;

    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith("group/getGroup", {id: group.id});
    expect(wrapper.contains("[data-testid='group-form']")).toBe(true);
  });
  describe("submit form action", () => {
    it("edit the group successfully", async () => {
      const group = generateGroup();
      delete group.members;

      const store = getStore();
      const route = { params: { id: group.id } };
      const wrapper = getWrapper({
        mocks: {
          $store: store,
          $route: route,
        },
      });
      const vm = wrapper.vm as any;
      vm.$notify.success = jest.fn();
      vm.$notify.error = jest.fn();
      vm.$router = { push: jest.fn() };

      store.getters["group/group"] = group;
      store.dispatch.mockResolvedValue(group);

      await vm.handleSubmit(group);

      expect(vm.$notify.success).toBeCalledTimes(1);
      expect(vm.$notify.success).toBeCalledWith("VIEWS.EDIT_GROUP.NOTIFICATIONS.EDIT.SUCCESS.TITLE");
      expect(vm.$notify.error).toBeCalledTimes(0);
      expect(vm.$router.push).toBeCalledTimes(1);
      expect(vm.$router.push).toBeCalledWith({name: "groups:detail", params: {id: group.id}});
    });
    it("can't edit the group", async () => {
      const group = generateGroup();
      delete group.members;

      const store = getStore();
      const route = { params: { id: group.id } };
      const wrapper = getWrapper({
        mocks: {
          $store: store,
          $route: route,
        },
      });
      const vm = wrapper.vm as any;
      vm.$notify.success = jest.fn();
      vm.$notify.error = jest.fn();
      vm.$router = { push: jest.fn() };

      store.getters["group/group"] = group;
      store.dispatch.mockResolvedValue(false);
      store.getters["group/editError"] = "API_ERROR";

      await vm.handleSubmit(group);

      expect(vm.$notify.success).toBeCalledTimes(0);
      expect(vm.$notify.error).toBeCalledTimes(1);
      expect(vm.$notify.error).toBeCalledWith("VIEWS.EDIT_GROUP.NOTIFICATIONS.EDIT.ERROR.TITLE");
      expect(vm.$router.push).toBeCalledTimes(0);
    });
  });
});
