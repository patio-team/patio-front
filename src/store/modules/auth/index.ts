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

import { ActionTree, GetterTree, Module, MutationTree, Commit } from "vuex";
import api from "@/services/api";

import { LoginInput } from "@/services/api/types";

import { RootState } from "@/store/types";
import { AuthState } from "./types";
import { Login, User } from "@/domain";


const initialState: AuthState = {
  loginIsLoading: false,
  loginError: false,
  myProfile: undefined,
  myProfileIsLoading: false,
  myProfileError: false,
};

const getters: GetterTree<AuthState, RootState> = {
  loginIsLoading(state: AuthState): boolean { return state.loginIsLoading; },
  loginError(state: AuthState): string | boolean { return state.loginError; },
  myProfile(state: AuthState) { return state.myProfile; },
  myProfileIsLoading(state: AuthState): boolean { return state.myProfileIsLoading; },
  myProfileError(state: AuthState): string | boolean { return state.myProfileError; },
};

const mutations: MutationTree<AuthState> = {
  // login
  loginRequest(state: AuthState) {
    state.loginIsLoading = true;
    state.loginError = false;
  },
  loginSuccess(state: AuthState, login: Login) {
    state.loginIsLoading = false;

    api.setAuthorization(login.token);
    state.myProfile = login.profile;
  },
  loginError(state: AuthState, error: string) {
    state.loginIsLoading = false;
    state.loginError = error;
  },
  // logout
  logout(state: AuthState) {
    api.setAuthorization();
    state.myProfile = undefined;
  },
  // myProfile
  myProfileRequest(state: AuthState) {
    state.myProfileIsLoading = true;
    state.myProfileError = false;
  },
  myProfileSuccess(state: AuthState, myProfile: User) {
    state.myProfileIsLoading = false;
    state.myProfileError = false;
    state.myProfile = myProfile;
  },
  myProfileError(state: AuthState, error: string) {
    state.myProfileIsLoading = false;
    state.myProfileError = error;
    state.myProfile = undefined;
  },
};

const actions: ActionTree<AuthState, RootState> = {
  async login(
    { commit, state }: { commit: Commit, state: AuthState },
    input: LoginInput,
  ) {
    commit("loginRequest");
    try {
      const login = await api.auth.login(input);
      commit("loginSuccess", login);
      return true;
    } catch (error) {
      commit("loginError", error.code );
      return false;
    }
  },
  async logout(
    { commit, state }: { commit: Commit, state: AuthState },
  ) {
    commit("logout");
  },
  async getMyProfile(
    { commit, state }: { commit: Commit, state: AuthState },
    { force }: { force: boolean } = { force: false },
  ) {
    if (!force && state.myProfile) {
      return state.myProfile;
    }

    commit("myProfileRequest");
    try {
      const myProfile = await api.auth.myProfile();
      commit("myProfileSuccess", myProfile);
      return myProfile;
    } catch (error) {
      commit("myProfileError", error.code);
      return;
    }
  },
};

const module: Module<AuthState, RootState> = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};

export default module;
