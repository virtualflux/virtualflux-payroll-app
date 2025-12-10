import axios from "axios";
import { store } from "@/state/store";
import { logout, loginSuccess } from "@/state/slices/user.slice";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.user.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post("/payroll/auth/refresh-token");
        store.dispatch(loginSuccess(data));
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
