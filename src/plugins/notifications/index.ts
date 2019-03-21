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

/*
 * NOTE; This component is based on euvl/vue-notification https://github.com/euvl/vue-notification
 *       Copyright (c) 2017 Yev Vlasenko over a MIT License
 */

import Vue, { VueConstructor } from "vue";

import notifyProvider from "./NotifyProvider";
import Notifications from "./components/Notifications/Notifications.vue";

export default {
  install(vue: VueConstructor<Vue>) {
    vue.prototype.$notify = notifyProvider;
    vue.notify = notifyProvider;
  },
};

export { Notifications };
