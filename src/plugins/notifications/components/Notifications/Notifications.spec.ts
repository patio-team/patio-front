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

import { mount } from "@vue/test-utils";

import NotificationsEventBus from "../../NotificationsEventBus";
import Notifications from "./Notifications.vue";

const getWrapper = (...params: any) => {
  return mount(Notifications, ...params);
};

describe("Component: Notifications", () => {
  afterEach(() => {
    jest.useFakeTimers();
    NotificationsEventBus.$off("add");
    NotificationsEventBus.$off("clean");
  });

  it("show empty initial state", () => {
    const wrapper = getWrapper();

    expect(wrapper.contains("[data-testid='notifications']")).toBe(true);
    expect(wrapper.contains("[data-testid='notification']")).toBe(false);
  });
  it("show a notification", () => {
    const wrapper = getWrapper();

    NotificationsEventBus.$emit("add", {
      group: "default",
      title: "sample title",
      message: "sample message",
      duration: 0,
    });

    expect(wrapper.contains("[data-testid='notifications']")).toBe(true);
    expect(wrapper.contains("[data-testid='notification']")).toBe(true);

    const notifications = wrapper.findAll("[data-testid='notification']");
    expect(notifications.length).toBe(1);

    expect(notifications.at(0).classes()).toEqual(["notification"]);
    expect(notifications.at(0).find("[data-testid='title']").text()).toEqual("sample title");
    expect(notifications.at(0).find("[data-testid='message']").text()).toEqual("sample message");
  });
  it("show an info notification", () => {
    const wrapper = getWrapper();

    NotificationsEventBus.$emit("add", {
      group: "default",
      type: "info",
      title: "sample title",
      message: "sample message",
      duration: 0,
    });

    expect(wrapper.contains("[data-testid='notifications']")).toBe(true);
    expect(wrapper.contains("[data-testid='notification']")).toBe(true);

    const notifications = wrapper.findAll("[data-testid='notification']");
    expect(notifications.length).toBe(1);

    expect(notifications.at(0).classes()).toEqual(["notification", "info"]);
    expect(notifications.at(0).find("[data-testid='title']").text()).toEqual("sample title");
    expect(notifications.at(0).find("[data-testid='message']").text()).toEqual("sample message");
  });
  it("show an success notification", () => {
    const wrapper = getWrapper();

    NotificationsEventBus.$emit("add", {
      group: "default",
      type: "success",
      title: "sample title",
      message: "sample message",
      duration: 0,
    });

    expect(wrapper.contains("[data-testid='notifications']")).toBe(true);
    expect(wrapper.contains("[data-testid='notification']")).toBe(true);

    const notifications = wrapper.findAll("[data-testid='notification']");
    expect(notifications.length).toBe(1);

    expect(notifications.at(0).classes()).toEqual(["notification", "success"]);
    expect(notifications.at(0).find("[data-testid='title']").text()).toEqual("sample title");
    expect(notifications.at(0).find("[data-testid='message']").text()).toEqual("sample message");
  });
  it("show an error notification", () => {
    const wrapper = getWrapper();

    NotificationsEventBus.$emit("add", {
      group: "default",
      type: "error",
      title: "sample title",
      message: "sample message",
      duration: 0,
    });

    expect(wrapper.contains("[data-testid='notifications']")).toBe(true);
    expect(wrapper.contains("[data-testid='notification']")).toBe(true);

    const notifications = wrapper.findAll("[data-testid='notification']");
    expect(notifications.length).toBe(1);

    expect(notifications.at(0).classes()).toEqual(["notification", "error"]);
    expect(notifications.at(0).find("[data-testid='title']").text()).toEqual("sample title");
    expect(notifications.at(0).find("[data-testid='message']").text()).toEqual("sample message");
  });
  it("doesn't show a notification from other grouop", () => {
    const wrapper = getWrapper();

    NotificationsEventBus.$emit("add", {
      group: "not-default-group",
      title: "sample title",
      message: "sample message",
      duration: 0,
    });

    expect(wrapper.contains("[data-testid='notifications']")).toBe(true);
    expect(wrapper.contains("[data-testid='notification']")).toBe(false);
  });
  it("show how a notification is destroyed automatically", () => {
    const wrapper = getWrapper();
    const vm = wrapper.vm as any;

    expect(window.setTimeout).toHaveBeenCalledTimes(0);

    NotificationsEventBus.$emit("add", {
      group: "default",
      title: "sample title",
      message: "sample message",
      duration: 1000,
    });

    expect(window.setTimeout).toHaveBeenCalledTimes(1);
    expect(window.setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    const notifications = wrapper.findAll("[data-testid='notification']");
    expect(notifications.length).toBe(1);
    expect(vm.notifications.length).toBe(1);

    jest.runAllTimers();

    expect(wrapper.contains("[data-testid='notifications']")).toBe(true);
    expect(wrapper.contains("[data-testid='notification']")).toBe(false);
    expect(vm.notifications.length).toBe(0);
  });
  it("show how a notification is destroyed manually", () => {
    const wrapper = getWrapper();
    const vm = wrapper.vm as any;

    NotificationsEventBus.$emit("add", {
      group: "default",
      title: "sample title",
      message: "sample message",
      duration: 0,
    });

    const notifications = wrapper.findAll("[data-testid='notification']");
    expect(notifications.length).toBe(1);
    expect(vm.notifications.length).toBe(1);

    notifications.at(0).trigger("click");

    expect(wrapper.contains("[data-testid='notifications']")).toBe(true);
    expect(wrapper.contains("[data-testid='notification']")).toBe(false);
    expect(vm.notifications.length).toBe(0);
  });
  it("show how all notifications are destroyed with an event", () => {
    const wrapper = getWrapper();
    const vm = wrapper.vm as any;

    NotificationsEventBus.$emit("add", {
      group: "default",
      title: "sample title 1",
      message: "sample message 1",
      duration: 0,
    });
    NotificationsEventBus.$emit("add", {
      group: "default",
      title: "sample title 2",
      message: "sample message 2",
      duration: 0,
    });

    const notifications = wrapper.findAll("[data-testid='notification']");
    expect(notifications.length).toBe(2);
    expect(vm.notifications.length).toBe(2);

    expect(notifications.at(0).classes()).toEqual(["notification"]);
    expect(notifications.at(0).find("[data-testid='title']").text()).toEqual("sample title 1");
    expect(notifications.at(0).find("[data-testid='message']").text()).toEqual("sample message 1");
    expect(notifications.at(1).classes()).toEqual(["notification"]);
    expect(notifications.at(1).find("[data-testid='title']").text()).toEqual("sample title 2");
    expect(notifications.at(1).find("[data-testid='message']").text()).toEqual("sample message 2");

    NotificationsEventBus.$emit("clean");

    expect(wrapper.contains("[data-testid='notifications']")).toBe(true);
    expect(wrapper.contains("[data-testid='notification']")).toBe(false);
    expect(vm.notifications.length).toBe(0);
  });
});
