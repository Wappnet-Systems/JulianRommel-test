import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    accessToken: null,
    refreshToken: null,
    loggedIn: false,
    refreshTokenValid: false,
    client: null,
    isAdmin: false,
  },
  mutations: {
    updateStorage(state, { access, refresh }) {
      state.accessToken = access;
      state.refreshToken = refresh;
    },
    updateAccessToken(state, token) {
      state.accessToken = token;
    },
    updateRefreshToken(state, token) {
      state.refreshToken = token;
    },
    updateProfile(state, { client, isAdmin }) {
      state.client = client;
      state.isAdmin = isAdmin;
    },
    updateLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    updateRefreshTokenState(state, valid) {
      state.refreshTokenValid = valid;
    },
  },
  actions: {
    userLogin({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/token/", credentials)
          .then((response) => {
            commit("updateStorage", {
              access: response.data.access,
              refresh: response.data.refresh,
            });
            commit("updateLoggedIn", true);
            localStorage.setItem("refreshToken", response.data.refresh);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    verifyAccessToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        return axios
          .post(
            "http://localhost:8000/api/token/verify/",
            { token: state.accessToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            commit("updateLoggedIn", true);
            resolve(response);
          })
          .catch((error) => {
            commit("updateLoggedIn", false);
            reject(error);
          });
      });
    },
    verifyRefreshToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        return axios
          .post(
            "http://localhost:8000/api/token/verify/",
            { token: state.refreshToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            commit("updateRefreshTokenState", true);
            resolve(response);
          })
          .catch((error) => {
            commit("updateRefreshTokenState", false);
            reject(error);
          });
      });
    },
    refreshAccessToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "http://localhost:8000/api/token/refresh/",
            { refresh: state.refreshToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            commit("updateAccessToken", response.data.access);
            commit("updateLoggedIn", true);
            resolve();
          })
          .catch((error) => {
            commit("updateLoggedIn", false);
            reject(error);
            console.log("Refresh Token nicht mehr gültig");
          });
      });
    },
    fetchRefreshToken({ commit }) {
      commit("updateRefreshToken", localStorage.getItem("refreshToken"));
    },
    // rename to fetchProfile
    getProfile({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:8000/api/profile/", {
            headers: {
              Authorization: "Bearer " + state.accessToken,
            },
          })
          .then((response) => {
            commit("updateProfile", {
              client: response.data.client,
              isAdmin: response.data.isAdmin,
            });
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    loggedIn(state) {
      return state.accessToken != null;
    },
    getRefreshTokenState(state) {
      return state.refreshToken != null;
    },
    getRefreshTokenValidity(state) {
      return state.refreshTokenValid;
    },
    isAdmin(state) {
      return state.isAdmin != null;
    },
  },
  modules: {},
});
