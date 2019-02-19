const state = {
//  isLoading: false,
//  error: null,
//  authToken: null,
};

const getters = {
//  isLoading: state => state.isLoading,
//  error: state => state.error,
//  isAuthenticated: state => state.authToken !== null,
};

const mutationTypes = {
//   LOGIN_PENDING: "LOGIN_SUCCESS",
//   LOGIN_SUCCESS: "LOGIN_PENDING",
//   LOGIN_FAIL: "LOGIN_FAIL",
//   SET_AUTH_TOKEN: "SET_AUTH_TOKEN",
};

const mutations = {
//  [mutationTypes.LOGIN_PENDING] (state) {
//    state.isLoading = true
//    state.error = null
//  },
//  [mutationTypes.LOGIN_SUCCESS] (state) {
//    state.isLoading = false
//  },
//  [mutationTypes.LOGIN_FAIL] (state, error) {
//    state.isLoading = false
//    state.error = error
//  },
//  [mutationTypes.SET_AUTH_TOKEN] (state, token) {
//    api.setAuthorization(token)
//    state.authToken = token
//    if (token) {
//      localStorage.set("authToken", token)
//    } else {
//      localStorage.remove("authToken")
//    }
//  },
};

const actions = {
//  auth ({ commit, state }) {
//    const token = localStorage.get("authToken")
//    if (token) {
//      commit(mutationTypes.SET_AUTH_TOKEN, token)
//    }
//  },
//  login ({ commit, state }, { username, password }) {
//    commit(mutationTypes.LOGIN_PENDING)
//    return api.auth.login(username, password)
//      .then(token => {
//        commit(mutationTypes.LOGIN_SUCCESS)
//        commit(mutationTypes.SET_AUTH_TOKEN, token)
//      })
//      .catch(() => commit(mutationTypes.LOGIN_FAIL, "Nombre de usuario o contraseña inválidos"))
//  },
//  logout ({ dispatch, commit, state }) {
//    commit(mutationTypes.SET_AUTH_TOKEN, null)
//    dispatch("map/resetMap", null, { root: true })
//  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutationTypes,
  mutations,
  actions,
};
