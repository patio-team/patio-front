import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import createLogger from "vuex/dist/logger";

import groups from "@/store/modules/groups";
import me from "@/store/modules/me";

import { RootState } from "./types";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "1.0.0",
  },
  modules: {
    groups,
    me,
  },
  strict: process.env.VUE_APP_DEBUG,
  plugins: process.env.VUE_APP_DEBUG ? [createLogger()] : [],
};

export default new Vuex.Store<RootState>(store);
