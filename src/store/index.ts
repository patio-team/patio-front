import Vue from "vue";
import Vuex from "vuex";

import createLogger from "vuex/dist/logger";

import me from "@/store/modules/me.ts";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    me,
  },
  strict: process.env.DEBUG,
  plugins: process.env.DEBUG ? [createLogger()] : [],
});
