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

import { generateUser } from "@/__mocks__/data/users";
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
    // login
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
        api.setAuthorization = jest.fn();

        const store = getStore();
        const token = "token";
        const profile = generateUser();

        store.commit("auth/loginSuccess", { token, profile });

        expect(store.getters["auth/loginIsLoading"]).toBe(false);
        expect(store.getters["auth/loginError"]).toBe(false);
        expect(store.getters["auth/myProfile"]).toEqual(profile);
        expect(api.setAuthorization).toBeCalledTimes(1);
        expect(api.setAuthorization).toBeCalledWith(token);
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

    // logout
    describe("Mutation: logout", () => {
      it("delete token and my profile", () => {
        const store = getStore();
        const profile = generateUser();

        store.commit("auth/myProfileSuccess", profile);

        expect(store.getters["auth/myProfile"]).toEqual(profile);

        store.commit("auth/logout");

        expect(store.getters["auth/myProfile"]).toBe(undefined);
      });
    });

    // myProfile
    describe("Mutation: myProfileRequest", () => {
      it("changes to pending state when myProfile is requested", () => {
        const store = getStore();

        store.commit("auth/myProfileRequest");

        expect(store.getters["auth/myProfileIsLoading"]).toBe(true);
        expect(store.getters["auth/myProfileError"]).toBe(false);
      });
    });

    describe("Mutation: myProfileSuccess", () => {
      it("stores token and redirects when myProfile succeeded", () => {
        const store = getStore();
        const myProfile = { email: "email@email.com" };

        store.commit("auth/myProfileSuccess", myProfile);

        expect(store.getters["auth/myProfile"]).toEqual(myProfile);
        expect(store.getters["auth/myProfileIsLoading"]).toBe(false);
        expect(store.getters["auth/myProfileError"]).toBe(false);
      });
    });

    describe("Mutation: myProfileError", () => {
      it("changes to error state when myProfile went wrong", () => {
        const store = getStore();

        store.commit("auth/myProfileError", "error");

        expect(store.getters["auth/myProfile"]).toBe(undefined);
        expect(store.getters["auth/myProfileIsLoading"]).toBe(false);
        expect(store.getters["auth/myProfileError"]).toBe("error");
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
    describe("Action: logout", () => {
      it("logout", async () => {
        const store = getStore();
        const profile = generateUser();

        store.commit("auth/myProfileSuccess", profile);

        expect(store.getters["auth/myProfile"]).toEqual(profile);

        await store.dispatch("auth/logout");

        expect(store.getters["auth/myProfile"]).toBe(undefined);
      });
    });
    describe("Action: getMyProfile", () => {
      it("gets my profile successfuly from api call", async () => {
        const store = getStore();
        const myProfile = { email: "email@email.com" };
        api.auth.myProfile = jest.fn().mockResolvedValue(myProfile);

        const result = await store.dispatch("auth/getMyProfile");

        expect(api.auth.myProfile).toBeCalledTimes(1);
        expect(result).toEqual(myProfile);
        expect(store.getters["auth/myProfile"]).toEqual(myProfile);
        expect(store.getters["auth/myProfileIsLoading"]).toBe(false);
        expect(store.getters["auth/myProfileError"]).toBe(false);
      });
      it("gets my profile successfuly without api call", async () => {
        const store = getStore();
        const myProfile = { email: "email1@email.com" };
        const myProfile2 = { email: "email1@email.com" };
        api.auth.myProfile = jest.fn().mockResolvedValue(myProfile2);

        store.commit("auth/myProfileSuccess", myProfile);

        const result = await store.dispatch("auth/getMyProfile");

        expect(api.auth.myProfile).toBeCalledTimes(0);
        expect(result).toEqual(myProfile);
        expect(store.getters["auth/myProfile"]).toEqual(myProfile);
        expect(store.getters["auth/myProfileIsLoading"]).toBe(false);
        expect(store.getters["auth/myProfileError"]).toBe(false);
      });
      it("gets my profile successfuly when apiu call is forced", async () => {
        const store = getStore();
        const myProfile = { email: "email1@email.com" };
        const myProfile2 = { email: "email1@email.com" };
        api.auth.myProfile = jest.fn().mockResolvedValue(myProfile2);

        store.commit("auth/myProfileSuccess", myProfile);

        const result = await store.dispatch("auth/getMyProfile", { force: true });

        expect(api.auth.myProfile).toBeCalledTimes(1);
        expect(result).toEqual(myProfile2);
        expect(store.getters["auth/myProfile"]).toEqual(myProfile2);
        expect(store.getters["auth/myProfileIsLoading"]).toBe(false);
        expect(store.getters["auth/myProfileError"]).toBe(false);
      });
      it("gets a failure from an api call when asking for my profile", async () => {
        const store = getStore();
        api.auth.myProfile = jest.fn().mockRejectedValue(new ApiError("XERROR"));

        const result = await store.dispatch("auth/getMyProfile" );

        expect(api.auth.myProfile).toBeCalledTimes(1);
        expect(result).toBe(undefined);
        expect(store.getters["auth/myProfile"]).toBe(undefined);
        expect(store.getters["auth/myProfileIsLoading"]).toBe(false);
        expect(store.getters["auth/myProfileError"]).toBe("XERROR");
      });
      it("gets a failure from an api call when forzing asking for my profile", async () => {
        const store = getStore();
        const myProfile = { email: "email1@email.com" };
        api.auth.myProfile = jest.fn().mockRejectedValue(new ApiError("XERROR"));

        store.commit("auth/myProfileSuccess", myProfile);

        const result = await store.dispatch("auth/getMyProfile", {force: true});

        expect(api.auth.myProfile).toBeCalledTimes(1);
        expect(result).toBe(undefined);
        expect(store.getters["auth/myProfile"]).toBe(undefined);
        expect(store.getters["auth/myProfileIsLoading"]).toBe(false);
        expect(store.getters["auth/myProfileError"]).toBe("XERROR");
      });
    });
  });
});
