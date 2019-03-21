<!--
 Copyright (C) 2019 Kaleidos Open Source SL

 This file is part of Dont Worry Be Happy (DWBH).
 DWBH is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 DWBH is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with DWBH.  If not, see <https://www.gnu.org/licenses/>.
-->

<template src="./Notifications.pug" lang="pug"></template>
<style src="./Notifications.css"></style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import NotificationsEventBus from "../../NotificationsEventBus";
import { ID } from "../../utils";
import { NotificationEvent, NotificationItem } from "../../index.d";

const DEFAULT_DURATION = 5000;

@Component
export default class Notifications extends Vue {
  private notifications: NotificationItem[] = [];

  @Prop({ type: String, default: "default" })
  private readonly group!: string;

  private mounted() {
    NotificationsEventBus.$on("add", this.addItem);
    NotificationsEventBus.$on("clean", this.destroyAll);
  }

  private addItem(event: NotificationEvent) {
    const item: NotificationItem = Object.assign(
      {},
      {
        id: ID(),
        group: "default",
        duration: DEFAULT_DURATION,
      },
      event,
    );

    // I want only mines
    if (this.group !== item.group) {
      return;
    }

    if (item.duration > 0) {
      item.timer = window.setTimeout(
        () => this.destroy(item),
        item.duration,
      );
    }

    this.notifications.push(item);
  }

  private destroy(item: NotificationItem) {
    if (item.timer) {
      window.clearTimeout(item.timer);
    }
    this.notifications.splice(this.notifications.indexOf(item), 1);
  }

  private destroyAll() {
    this.notifications = [];
  }
}
</script>
