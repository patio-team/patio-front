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

import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import cloneDeep from "lodash.clonedeep";
import api, { ApiError } from "@/services/api";
import authModule from "@/store/modules/auth";

const getStore = () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  return new Vuex.Store({
    modules: {
      auth: cloneDeep(authModule),
    },
  });
};

describe("Auth Store Module", () => {
  describe("Auth Store Module: Mutations", () => {
    describe("Mutation: loginRequest", () => {
      it("changes to pending state when login is requested", () => {
        const store = getStore();

        store.commit("auth/loginRequest");

        expect(store.getters["auth/loginIsLoading"]).toBe(true);
        expect(store.getters["auth/loginError"]).toBe(false);
      });
    });

    describe("Mutation: loginSuccess", () => {
      it("stores token and redirects when login succeeded", () => {
        const store = getStore();
        const token = "token";

        store.commit("auth/loginSuccess", token);

        expect(store.getters["auth/loginIsLoading"]).toBe(false);
        expect(store.getters["auth/loginError"]).toBe(false);
      });
    });

    describe("Mutation: loginError", () => {
      it("changes to error state when login went wrong", () => {
        const store = getStore();

        store.commit("auth/loginError", "error");

        expect(store.getters["auth/loginIsLoading"]).toBe(false);
        expect(store.getters["auth/loginError"]).toBe("error");
      });
    });
  });

  describe("Auth Store Module: Actions", () => {
    describe("Action: login", () => {
      it("gets a token successfuly", async () => {
        const store = getStore();
        api.auth.login = jest.fn().mockResolvedValue("token");

        await store.dispatch("auth/login", { email: "", password: "" });

        expect(store.getters["auth/loginIsLoading"]).toBe(false);
        expect(store.getters["auth/loginError"]).toBe(false);
      });
      it("gets a failure when asking for the token", async () => {
        const store = getStore();
        api.auth.login = jest.fn().mockRejectedValue(new ApiError("XERROR"));

        await store.dispatch("auth/login", { email: "", password: "" });

        expect(store.getters["auth/loginIsLoading"]).toBe(false);
        expect(store.getters["auth/loginError"]).toBe("XERROR");
      });
    });
  });
});
