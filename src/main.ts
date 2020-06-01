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

import "@/registerServiceWorker";

import Vue, { PluginFunction } from "vue";

import i18n from "./i18n";
import router from "./router";
import store from "./store";

import "./filters";

import VueThinModal from "vue-thin-modal";
Vue.use(VueThinModal, { autoMountPortal: false });

import Notify from "@/plugins/notifications";
Vue.use(Notify);

import App from "./App.vue";

Vue.config.productionTip = false;

const vue = new Vue({
 el: "#app",
 i18n,
 router,
 store,
 components: { App },
 template: "<App/>",
});
