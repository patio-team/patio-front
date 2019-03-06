import { ActionTree, GetterTree, Module, MutationTree, Commit, Dispatch } from "vuex";
import { RootState } from "@/store/types";
import { MeState } from "./types";

const initialState: MeState = {
  isLoading: false,
  error: false,
  authToken: undefined,
};

const getters: GetterTree<MeState, RootState> = {
//  isLoading(state: MeState): boolean { return state.isLoading; },
//  error(state: MeState): boolean { return state.error; },
//  isAuthenticated(state: MeState): boolean { return state.authToken !== null; },
};

export const mutationTypes = {
//   LOGIN_PENDING: "LOGIN_SUCCESS",
//   LOGIN_SUCCESS: "LOGIN_PENDING",
//   LOGIN_FAIL: "LOGIN_FAIL",
//   SET_AUTH_TOKEN: "SET_AUTH_TOKEN",
};

const mutations: MutationTree<MeState> = {
//  [mutationTypes.LOGIN_PENDING](state: MeState) {
//    state.isLoading = true;
//    state.error = null;
//  },
//  [mutationTypes.LOGIN_SUCCESS](state: MeState) {
//    state.isLoading = false;
//  },
//  [mutationTypes.LOGIN_FAIL](state: MeState, error: string) {
//    state.isLoading = false;
//    state.error = error;
//  },
//  [mutationTypes.SET_AUTH_TOKEN](state: MeState, token: string) {
//    api.setAuthorization(token);
//    state.authToken = token;
//    if (token) {
//      localStorage.set("authToken", token);
//    } else {
//      localStorage.remove("authToken");
//    }
//  },
};

const actions: ActionTree<MeState, RootState> = {
//  auth({commit, state}: {commit: Commit, state: MeState}) {
//    const token = localStorage.get("authToken");
//    if (token) {
//      commit(mutationTypes.SET_AUTH_TOKEN, token);
//    }
//  },
//  login(
//    {commit, state}: {commit: commit, state: mestate},
//    {username, password}: {username: string, password: string}
//  ){
//    commit(mutationTypes.LOGIN_PENDING);
//    return api.auth.login(username, password)
//      .then(token => {
//        commit(mutationTypes.LOGIN_SUCCESS)
//        commit(mutationTypes.SET_AUTH_TOKEN, token)
//      })
//      .catch(() => commit(mutationTypes.LOGIN_FAIL, "Nombre de usuario o contraseña inválidos"));
//  },
//  logout ({dispatch, commit, state}: {dispatch: Dispatch, commit: commit, state: mestate}) {
//    commit(mutationTypes.SET_AUTH_TOKEN, null);
//    dispatch("map/resetMap", null, { root: true });
//  }
};

const module: Module<MeState, RootState> = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};

export default module;
