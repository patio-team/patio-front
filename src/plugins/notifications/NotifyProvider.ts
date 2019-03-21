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

import NotificationsEventBus from "./NotificationsEventBus";

import { NotificationEvent, NotifyProviderInterface } from "./index.d";

export class NotifyProvider implements NotifyProviderInterface {
  public add(attr: string | NotificationEvent) {
    NotificationsEventBus.$emit("add", this.createNotificationEvents(attr));
  }

  public info(attr: string | NotificationEvent) {
    const event = this.createNotificationEvents(attr);
    event.type = "info";
    NotificationsEventBus.$emit("add", event);
  }

  public success(attr: string | NotificationEvent) {
    const event = this.createNotificationEvents(attr);
    event.type = "success";
    NotificationsEventBus.$emit("add", event);
  }

  public error(attr: string | NotificationEvent) {
    const event = this.createNotificationEvents(attr);
    event.type = "error";
    NotificationsEventBus.$emit("add", event);
  }

  public clean() {
    NotificationsEventBus.$emit("clean");
  }

  private createNotificationEvents(attr: string | NotificationEvent): NotificationEvent {
    let event = { title: "", message: "", group: "default" };

    if (typeof attr === "string") {
      event.message = attr;
    } else {
      event = Object.assign({}, event, attr);
    }
    return event;
  }
}

export default new NotifyProvider();
