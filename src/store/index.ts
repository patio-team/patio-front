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
import Vuex, { StoreOptions } from "vuex";

import createLogger from "vuex/dist/logger";

import auth from "@/store/modules/auth";
import group from "@/store/modules/group";
import groups from "@/store/modules/groups";
import profile from "@/store/modules/profile";
import voting from "@/store/modules/voting";
import votings from "@/store/modules/votings";

import { RootState } from "./types";

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
  state: {
    version: "1.0.0",
  },
  modules: {
    auth,
    group,
    groups,
    profile,
    voting,
    votings,
  },
  strict: process.env.VUE_APP_DEBUG === "true",
  plugins: process.env.VUE_APP_DEBUG === "true" && process.env.NODE_ENV === "development"
    ? [createLogger()]
    : [],
};

export default new Vuex.Store<RootState>(storeOptions);
