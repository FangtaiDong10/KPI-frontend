import axios from "../utils/http";
import { defineStore } from "pinia";

// prevent the name from being used as a variable
const prefix = import.meta.env.VITE_STORAGE_PREFIX;

export const useAuthStore = defineStore({
  id: "auth",
  // data will be stored in state
  state: () => ({
    token: null,
    userInfo: null,
  }),

  getters: {
    // real time state data will be getted from defined methods
    getToken: (state) => state.token,
    getUserInfo: (state) => state.userInfo,
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async login(username, password) {
      try {
        const response = await axios.post("auth/login", { username, password });
        const { data } = response;
        localStorage.setItem(prefix + "token", data.token);
        localStorage.setItem(prefix + "user_info", JSON.stringify(data.user));
        this.token = data.token;
        this.userInfo = data.user;
      } catch (e) {
        alert(e);
      }
    },
    async reload() {},
    async logout() {},
  },
});
