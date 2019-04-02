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

import GroupDetail from "./GroupDetail.vue";

const getStore = () => {
  return new Store({
    state: {
      group: {},
    },
    getters: {
      "group/group": undefined as any,
      "group/getGroupError": false,
      "group/getGroupIsLoading": false,
      "group/leaveError": false as boolean | string,
      "group/leaveIsLoading": false,
    },
  });
};

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
  it("call getGroup action after is monted", () => {
    const group = generateGroup();
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
  });
  it("show admin actions for user with privileges", () => {
    const group = generateGroup({ isCurrentUserAdmin: true });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;

    expect(wrapper.contains("[data-testid='action-edit']")).toBe(true);
    expect(wrapper.contains("[data-testid='action-leave']")).toBe(true);
    expect(wrapper.contains("[data-testid='action-delete']")).toBe(true);
  });
  it("dosen't show admin action for no admin user", () => {
    const group = generateGroup({ isCurrentUserAdmin: false });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;

    expect(wrapper.contains("[data-testid='action-edit']")).toBe(false);
    expect(wrapper.contains("[data-testid='action-leave']")).toBe(true);
    expect(wrapper.contains("[data-testid='action-delete']")).toBe(false);
  });
  it("show voting days and voting time values", () => {
    const group = generateGroup({
      votingDays: ["MONDAY", "TUESDAY"],
      votingTime: toDateTime("12:00"),
    });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;
    expect(wrapper.find("[data-testid='voting-days']").text()).toEqual("COMMON.DAYS.MONDAY, COMMON.DAYS.TUESDAY");
    expect(wrapper.find("[data-testid='voting-time']").text()).toEqual("12:00 PM");
  });
  it("has anonymous vote allowed", () => {
    const group = generateGroup({
      anonymousVote: true,
    });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;
    expect(wrapper.contains("[data-testid='anonymous-vote-allowed']")).toBe(true);
    expect(wrapper.contains("[data-testid='anonymous-vote-deny']")).toBe(false);
  });
  it("has anonymous vote deny", () => {
    const group = generateGroup({
      anonymousVote: false,
    });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;
    expect(wrapper.contains("[data-testid='anonymous-vote-allowed']")).toBe(false);
    expect(wrapper.contains("[data-testid='anonymous-vote-deny']")).toBe(true);
  });
  it("has member list visible", () => {
    const group = generateGroup({
      visibleMemberList: true,
    });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;
    expect(wrapper.contains("[data-testid='member-list']")).toBe(true);
  });
  it("has member list hidden", () => {
    const group = generateGroup({
      visibleMemberList: false,
    });
    const store = getStore();
    const route = { params: { id: group.id } };
    const wrapper = getWrapper({
      mocks: {
        $store: store,
        $route: route,
      },
    });

    store.getters["group/group"] = group;
    expect(wrapper.contains("[data-testid='member-list']")).toBe(false);
  });

  describe("Action: leave a group", () => {
    it("opens confirm dialog when leave button is clicked", () => {
      const group = generateGroup({
        visibleMemberList: false,
      });
      const store = getStore();
      const route = { params: { id: group.id } };
      const wrapper = getWrapper({
        mocks: {
          $store: store,
          $route: route,
        },
      });
      const vm = wrapper.vm as any;
      vm.$modal.push = jest.fn();

      store.getters["group/group"] = group;

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
        mocks: {
          $store: store,
          $route: route,
        },
      });
      const vm = wrapper.vm as any;
      vm.$modal.pop = jest.fn();
      vm.$notify.success = jest.fn();
      vm.$notify.error = jest.fn();

      store.getters["group/group"] = group;
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
      const route = { params: { id: group.id } };
      const wrapper = getWrapper({
        mocks: {
          $store: store,
          $route: route,
        },
      });
      const vm = wrapper.vm as any;
      vm.$modal.pop = jest.fn();
      vm.$notify.success = jest.fn();
      vm.$notify.error = jest.fn();
      vm.$router = { push: jest.fn() };

      store.getters["group/group"] = group;
      store.dispatch.mockResolvedValue(true);

      await vm.handleLeaveAcept();

      expect(vm.$modal.pop).toBeCalledTimes(1);
      expect(vm.$modal.pop).toBeCalledWith();
      expect(vm.$notify.success).toBeCalledTimes(1);
      expect(vm.$notify.success).toBeCalledWith("VIEWS.GROUP_DETAIL.NOTIFICATIONS.LEAVE_GROUP.SUCCESS");
      expect(vm.$notify.error).toBeCalledTimes(0);
      expect(vm.$router.push).toBeCalledTimes(1);
      expect(vm.$router.push).toBeCalledWith({name: "groups:list"});
    });
    it("can't leave a group, the user is the only admin ", async () => {
      const group = generateGroup({
        visibleMemberList: false,
      });
      const store = getStore();
      const route = { params: { id: group.id } };
      const wrapper = getWrapper({
        mocks: {
          $store: store,
          $route: route,
        },
      });
      const vm = wrapper.vm as any;
      vm.$modal.pop = jest.fn();
      vm.$notify.success = jest.fn();
      vm.$notify.error = jest.fn();
      vm.$router = { push: jest.fn() };

      store.getters["group/group"] = group;
      store.dispatch.mockResolvedValue(false);
      store.getters["group/leaveError"] = "API_ERRORS.UNIQUE_ADMIN";

      await vm.handleLeaveAcept();

      expect(vm.$modal.pop).toBeCalledTimes(1);
      expect(vm.$modal.pop).toBeCalledWith();
      expect(vm.$notify.success).toBeCalledTimes(0);
      expect(vm.$notify.error).toBeCalledTimes(1);
      expect(vm.$notify.error).toBeCalledWith({
        title: "VIEWS.GROUP_DETAIL.NOTIFICATIONS.LEAVE_GROUP.ERROR.TITLE",
        message: "VIEWS.GROUP_DETAIL.NOTIFICATIONS.LEAVE_GROUP.ERROR.MESSAGE_UNIQUE_ADMIN",
      });
      expect(vm.$router.push).toBeCalledTimes(0);
    });
    it("can't leave a group because reasons xD", async () => {
      const group = generateGroup({
        visibleMemberList: false,
      });
      const store = getStore();
      const route = { params: { id: group.id } };
      const wrapper = getWrapper({
        mocks: {
          $store: store,
          $route: route,
        },
      });
      const vm = wrapper.vm as any;
      vm.$modal.pop = jest.fn();
      vm.$notify.success = jest.fn();
      vm.$notify.error = jest.fn();
      vm.$router = { push: jest.fn() };

      store.getters["group/group"] = group;
      store.dispatch.mockResolvedValue(false);
      store.getters["group/leaveError"] = "OTHER_API_ERROR";

      await vm.handleLeaveAcept();

      expect(vm.$modal.pop).toBeCalledTimes(1);
      expect(vm.$modal.pop).toBeCalledWith();
      expect(vm.$notify.success).toBeCalledTimes(0);
      expect(vm.$notify.error).toBeCalledTimes(1);
      expect(vm.$notify.error).toBeCalledWith({
        title: "VIEWS.GROUP_DETAIL.NOTIFICATIONS.LEAVE_GROUP.ERROR.TITLE",
        message: undefined,
      });
      expect(vm.$router.push).toBeCalledTimes(0);
    });
  });
});
