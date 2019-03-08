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
import { RootState } from "@/store/types";
import { AuthState } from "./types";
import { LoginInput } from "@/components/shared/LoginForm/LoginFormTypes";
import router from "@/router";

const initialState: AuthState = {
  loading: false,
  error: false,
};

const getters: GetterTree<AuthState, RootState> = {
  loginIsLoading(state: AuthState): boolean { return state.loading; },
  loginError(state: AuthState): string | boolean { return state.error; },
};

const mutations: MutationTree<AuthState> = {
  loginRequest(state: AuthState) {
    state.loading = true;
    state.error = false;
  },
  loginSuccess(state: AuthState, token: string) {
    state.loading = false;

    api.setAuthorization(token);
    router.push({ name: "home" });
  },
  loginError(state: AuthState, error: string) {
    state.loading = false;
    state.error = error;
  },
};

const actions: ActionTree<AuthState, RootState> = {
  async login(
    { commit, state }: { commit: Commit, state: AuthState },
    input: LoginInput,
  ) {
    commit("loginRequest");
    try {
      const token = await api.auth.login(input.email, input.password);
      commit("loginSuccess", token);
    } catch (error) {
      commit("loginError", error.code);
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
