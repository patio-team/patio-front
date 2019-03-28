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

import notifyProvider from "./NotifyProvider";
import NotificationsEventBus from "./NotificationsEventBus";

describe("NotifyProvider", () => {
  // add
  test("generic notifcation with a string", () => {
    NotificationsEventBus.$emit = jest.fn();

    notifyProvider.add("test");

    expect(NotificationsEventBus.$emit).toBeCalledTimes(1);
    expect(NotificationsEventBus.$emit).toBeCalledWith(
      "add",
      {
        title: "",
        message: "test",
        group: "default",
      },
    );
  });
  test("generic notifcation with an event", () => {
    NotificationsEventBus.$emit = jest.fn();

    const event = {
      title: "test title",
      message: "test message",
      group: "test group",
      type: "test type",
    };

    notifyProvider.add(event);

    expect(NotificationsEventBus.$emit).toBeCalledTimes(1);
    expect(NotificationsEventBus.$emit).toBeCalledWith(
      "add",
      {...event},
    );
  });

  // info
  test("info notifcation with a string", () => {
    NotificationsEventBus.$emit = jest.fn();

    notifyProvider.info("test");

    expect(NotificationsEventBus.$emit).toBeCalledTimes(1);
    expect(NotificationsEventBus.$emit).toBeCalledWith(
      "add",
      {
        title: "",
        message: "test",
        group: "default",
        type: "info",
      },
    );
  });
  test("info notifcation with an event", () => {
    NotificationsEventBus.$emit = jest.fn();

    const event = {
      title: "test title",
      message: "test message",
      group: "test group",
      type: "test type",
    };

    notifyProvider.info(event);

    expect(NotificationsEventBus.$emit).toBeCalledTimes(1);
    expect(NotificationsEventBus.$emit).toBeCalledWith(
      "add",
      {
        ...event,
        type: "info",
      },
    );
  });

  // success
  test("success notifcation with a string", () => {
    NotificationsEventBus.$emit = jest.fn();

    notifyProvider.success("test");

    expect(NotificationsEventBus.$emit).toBeCalledTimes(1);
    expect(NotificationsEventBus.$emit).toBeCalledWith(
      "add",
      {
        title: "",
        message: "test",
        group: "default",
        type: "success",
      },
    );
  });
  test("success notifcation with an event", () => {
    NotificationsEventBus.$emit = jest.fn();

    const event = {
      title: "test title",
      message: "test message",
      group: "test group",
      type: "test type",
    };

    notifyProvider.success(event);

    expect(NotificationsEventBus.$emit).toBeCalledTimes(1);
    expect(NotificationsEventBus.$emit).toBeCalledWith(
      "add",
      {
        ...event,
        type: "success",
      },
    );
  });

  // error
  test("error notifcation with a string", () => {
    NotificationsEventBus.$emit = jest.fn();

    notifyProvider.error("test");

    expect(NotificationsEventBus.$emit).toBeCalledTimes(1);
    expect(NotificationsEventBus.$emit).toBeCalledWith(
      "add",
      {
        title: "",
        message: "test",
        group: "default",
        type: "error",
      },
    );
  });
  test("error notifcation with an event", () => {
    NotificationsEventBus.$emit = jest.fn();

    const event = {
      title: "test title",
      message: "test message",
      group: "test group",
      type: "test type",
    };

    notifyProvider.error(event);

    expect(NotificationsEventBus.$emit).toBeCalledTimes(1);
    expect(NotificationsEventBus.$emit).toBeCalledWith(
      "add",
      {
        ...event,
        type: "error",
      },
    );
  });

  // clean
  test("clean event", () => {
    NotificationsEventBus.$emit = jest.fn();

    notifyProvider.clean();

    expect(NotificationsEventBus.$emit).toBeCalledTimes(1);
    expect(NotificationsEventBus.$emit).toBeCalledWith("clean");
  });
});
