import defaultAxios from "axios";
import {API_CONFIG} from "src/config/api.config";
import {AUTHENTICATION_KEY} from "src/constants/storageKeys";
import {ROUTER_PATHS} from "src/constants/routerPaths";

export const axios = defaultAxios.create({
  baseURL: API_CONFIG.API_URL
});

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem(AUTHENTICATION_KEY);

  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

axios.interceptors.response.use(
  (response) => {
    console.log(`[axios] ${response.config.url}`, response.data);

    if (Array.isArray(response.data) && !response.data.length) {
      console.warn(`[axios] ${response.config.url} has empty result`);
    }

    return response;
  },
  (error) => {
    const isSignInPage = window.location.pathname.includes("sign-in");
    const isUnAuthorized = error.response.status === 401;

    if (!isSignInPage && isUnAuthorized) {
      sessionStorage.clear();
      localStorage.removeItem(AUTHENTICATION_KEY);
      window.location.replace(ROUTER_PATHS.signIn);
      return;
    }

    throw error;
  }
);
