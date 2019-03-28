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

import Vue from "vue";

export interface NotificationEvent {
  title?: string;
  message?: string;
  type?: string;
  group?: string;
  duration?: number;
  data?: object;
}

export interface NotificationItem extends NotificationEvent {
  id: number;
  group: string;
  duration: number;
  timer?: number;
}

export interface NotifyProviderInterface {
  add: (options: NotificationEvent | string) => void;
  info: (options: NotificationEvent | string) => void;
  success: (options: NotificationEvent | string) => void;
  error: (options: NotificationEvent | string) => void;
  clean: () => void;
}

declare module "vue/types/vue" {
  interface Vue {
    $notify: NotifyProviderInterface;
  }
  interface VueConstructor {
    notify: NotifyProviderInterface;
  }
}

type PluginFunction<T> = (vue: typeof Vue, options?: T) => void;

declare class VueNotification {
  public static install: PluginFunction<never>;
}

export default VueNotification;
