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
import { Store } from "vuex-mock-store";
import { toDateTime } from "@/utils/datetime";

import { generateGroup } from "@/__mocks__/data/groups";

import GroupDetailActions from "./GroupDetailActions.vue";

const getStore = () => {
  return new Store({
    state: {
      group: {},
    },
    getters: {
      "group/leaveError": false as boolean | string,
      "group/leaveIsLoading": false,
    },
  });
};

const getWrapper = (...params: any) => {
  return shallowMount(
    GroupDetailActions,
    Object.assign(
      { stubs: { RouterLink: RouterLinkStub } },
      ...params,
    ),
  );
};

describe("View: GroupDetailActions", () => {
  it("show admin actions for user with privileges", () => {
    const group = generateGroup({ isCurrentUserAdmin: true });
    const store = getStore();
    const wrapper = getWrapper({
      propsData: {
        group,
      },
      mocks: {
        $store: store,
      },
    });

    expect(wrapper.contains("[data-testid='action-edit']")).toBe(true);
    expect(wrapper.contains("[data-testid='action-leave']")).toBe(true);
    expect(wrapper.contains("[data-testid='action-delete']")).toBe(true);
  });
  it("dosen't show admin action for no admin user", () => {
    const group = generateGroup({ isCurrentUserAdmin: false });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      propsData: {
        group,
      },
      mocks: {
        $store: store,
        $route: route,
      },
    });

    expect(wrapper.contains("[data-testid='action-edit']")).toBe(false);
    expect(wrapper.contains("[data-testid='action-leave']")).toBe(true);
    expect(wrapper.contains("[data-testid='action-delete']")).toBe(false);
  });

  describe("Action: leave a group", () => {
    it("opens confirm dialog when leave button is clicked", () => {
      const group = generateGroup({
        visibleMemberList: false,
      });
      const store = getStore();
      const wrapper = getWrapper({
        propsData: {
          group,
        },
        mocks: {
          $store: store,
        },
      });
      const vm = wrapper.vm as any;
      vm.$modal.push = jest.fn();

      wrapper.find("[data-testid='action-leave']").trigger("click");
      expect(vm.$modal.push).toBeCalledTimes(1);
      expect(vm.$modal.push).toBeCalledWith("confirm-leave-group");
    });
    it("close confirm dialog if reject handler is called", () => {
      const group = generateGroup({
        visibleMemberList: false,
      });
      const store = getStore();
      const route = { params: { id: group.id } };
      const wrapper = getWrapper({
        propsData: {
          group,
        },
        mocks: {
          $store: store,
          $route: route,
        },
      });
      const vm = wrapper.vm as any;
      vm.$modal.pop = jest.fn();
      vm.$notify.success = jest.fn();
      vm.$notify.error = jest.fn();

      vm.handleLeaveReject();

      expect(vm.$modal.pop).toBeCalledTimes(1);
      expect(vm.$modal.pop).toBeCalledWith();
      expect(vm.$notify.success).toBeCalledTimes(0);
      expect(vm.$notify.error).toBeCalledTimes(0);
    });
    it("leave a group successfully", async () => {
      const group = generateGroup({
        visibleMemberList: false,
      });
      const store = getStore();
      const wrapper = getWrapper({
        propsData: {
          group,
        },
        mocks: {
          $store: store,
        },
      });
      const vm = wrapper.vm as any;
      vm.$modal.pop = jest.fn();
      vm.$notify.success = jest.fn();
      vm.$notify.error = jest.fn();
      vm.$router = { push: jest.fn() };

      store.dispatch.mockResolvedValue(true);

      await vm.handleLeaveAcept();

      expect(vm.$modal.pop).toBeCalledTimes(1);
      expect(vm.$modal.pop).toBeCalledWith();
      expect(vm.$notify.success).toBeCalledTimes(1);
      expect(vm.$notify.success).toBeCalledWith("GROUP_DETAIL_ACTIONS.NOTIFICATIONS.LEAVE_GROUP.SUCCESS");
      expect(vm.$notify.error).toBeCalledTimes(0);
      expect(vm.$router.push).toBeCalledTimes(1);
      expect(vm.$router.push).toBeCalledWith({name: "groups:list"});
    });
    it("can't leave a group, the user is the only admin ", async () => {
      const group = generateGroup({
        visibleMemberList: false,
      });
      const store = getStore();
      const wrapper = getWrapper({
        propsData: {
          group,
        },
        mocks: {
          $store: store,
        },
      });
      const vm = wrapper.vm as any;
      vm.$modal.pop = jest.fn();
      vm.$notify.success = jest.fn();
      vm.$notify.error = jest.fn();
      vm.$router = { push: jest.fn() };

      store.dispatch.mockResolvedValue(false);
      store.getters["group/leaveError"] = "API_ERRORS.UNIQUE_ADMIN";

      await vm.handleLeaveAcept();

      expect(vm.$modal.pop).toBeCalledTimes(1);
      expect(vm.$modal.pop).toBeCalledWith();
      expect(vm.$notify.success).toBeCalledTimes(0);
      expect(vm.$notify.error).toBeCalledTimes(1);
      expect(vm.$notify.error).toBeCalledWith({
        title: "GROUP_DETAIL_ACTIONS.NOTIFICATIONS.LEAVE_GROUP.ERROR.TITLE",
        message: "GROUP_DETAIL_ACTIONS.NOTIFICATIONS.LEAVE_GROUP.ERROR.MESSAGE_UNIQUE_ADMIN",
      });
      expect(vm.$router.push).toBeCalledTimes(0);
    });
    it("can't leave a group because reasons xD", async () => {
      const group = generateGroup({
        visibleMemberList: false,
      });
      const store = getStore();
      const wrapper = getWrapper({
        propsData: {
          group,
        },
        mocks: {
          $store: store,
        },
      });
      const vm = wrapper.vm as any;
      vm.$modal.pop = jest.fn();
      vm.$notify.success = jest.fn();
      vm.$notify.error = jest.fn();
      vm.$router = { push: jest.fn() };

      store.dispatch.mockResolvedValue(false);
      store.getters["group/leaveError"] = "OTHER_API_ERROR";

      await vm.handleLeaveAcept();

      expect(vm.$modal.pop).toBeCalledTimes(1);
      expect(vm.$modal.pop).toBeCalledWith();
      expect(vm.$notify.success).toBeCalledTimes(0);
      expect(vm.$notify.error).toBeCalledTimes(1);
      expect(vm.$notify.error).toBeCalledWith({
        title: "GROUP_DETAIL_ACTIONS.NOTIFICATIONS.LEAVE_GROUP.ERROR.TITLE",
        message: undefined,
      });
      expect(vm.$router.push).toBeCalledTimes(0);
    });
  });
});
