import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

axios.defaults.timeout = 5000;

axios.defaults.baseURL = import.meta.env.VITE_API_BASE;

// how to use interceptor to utilize the token
axios.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.getToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // judge the response status code and to following things
      switch (error.response.status) {
        case 401:
          //  if the 401 error happen in the login page, just pass it.
          if (router.currentRoute.name !== "login") {
            const authStore = useAuthStore();
            authStore.logout();
            router.replace({
              path: "/login",
              //   router query can record where you comming from before you redirect
              query: { redirect: router.currentRoute.fullPath },
            });
          }
      }
    }
  }
);

export default axios;
