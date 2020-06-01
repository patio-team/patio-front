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

import { LoginInput, ResetInput, ChangePasswordInput } from "@/services/api/types";

import { RootState } from "@/store/types";
import { AuthState } from "./types";
import { Login, User } from "@/domain";


const initialState: AuthState = {
  loginIsLoading: false,
  loginError: false,
  myProfile: undefined,
  myProfileIsLoading: false,
  myProfileError: false,
  resetIsLoading: false,
  resetError: false,
  changePasswordIsLoading: false,
  changePasswordError: false,
};

const getters: GetterTree<AuthState, RootState> = {
  loginIsLoading(state: AuthState): boolean { return state.loginIsLoading; },
  loginError(state: AuthState): string | boolean { return state.loginError; },
  myProfile(state: AuthState) { return state.myProfile; },
  myProfileIsLoading(state: AuthState): boolean { return state.myProfileIsLoading; },
  myProfileError(state: AuthState): string | boolean { return state.myProfileError; },
  resetIsLoading(state: AuthState): boolean { return state.resetIsLoading; },
  resetError(state: AuthState): string | boolean { return state.resetError; },
  changePasswordIsLoading(state: AuthState): boolean { return state.changePasswordIsLoading; },
  changePasswordError(state: AuthState): string | boolean { return state.changePasswordError; },
};

const mutations: MutationTree<AuthState> = {
  // login
  loginRequest(state: AuthState) {
    state.loginIsLoading = true;
    state.loginError = false;
  },
  loginSuccess(state: AuthState, login: Login) {
    state.loginIsLoading = false;

    api.setAuthorization(login.tokens.authenticationToken);
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
  // resetPassword
  resetPasswordRequest(state: AuthState) {
    state.resetIsLoading = true;
    state.resetError = false;
  },
  resetPasswordSuccess(state: AuthState) {
    state.resetIsLoading = false;
    state.resetError = false;
  },
  resetPasswordError(state: AuthState, error: string) {
    state.resetIsLoading = false;
    state.resetError = error;
  },
  // changePassword
  changePasswordRequest(state: AuthState) {
    state.changePasswordIsLoading = true;
    state.changePasswordError = false;
  },
  changePasswordSuccess(state: AuthState) {
    state.changePasswordIsLoading = false;
    state.changePasswordError = false;
  },
  changePasswordError(state: AuthState, error: string) {
    state.changePasswordIsLoading = false;
    state.changePasswordError = error;
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
  async storeJWTToken(
    {commit, state}: {commit: Commit, state: AuthState},
    authCode: string,
  ) {
    commit("loginRequest");
    try {
      const login: Login = await api.auth.loginOauth2({authorizationCode: authCode});

      commit("loginSuccess", login);
      return true;
    } catch (error) {
      commit("loginError", error.code);
    }

    return false;
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
  async resetPassword(
    { commit, state }: { commit: Commit, state: AuthState },
    input: ResetInput,
  ) {
    commit("resetPasswordRequest");
    try {
      await api.auth.resetPassword(input);
      commit("resetPasswordSuccess");
      return true;
    } catch (error) {
      commit("resetPasswordError", error.code);
      return false;
    }
  },
  async changePassword(
    { commit, state }: { commit: Commit, state: AuthState },
    input: ChangePasswordInput,
  ) {
    commit("changePasswordRequest");
    try {
      await api.auth.changePassword(input);
      commit("changePasswordSuccess");
      return true;
    } catch(error) {
      commit("changePasswordError", error.code);
      return false;
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
