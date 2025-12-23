import axios from "axios";
import { store } from "@/state/store";
import { logout, updateAccessToken } from "@/state/slices/user.slice";
import { plainAxios } from "./plainAxios";

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.user.accessToken;
 if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// axiosClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config
//     console.log(1111)
//     if (error.response?.status !== 401 || originalRequest._retry) {
//       return Promise.reject(error)
//     }

//     originalRequest._retry = true

//     const { refreshToken } = store.getState().user
//     if (!refreshToken) {
//       store.dispatch(logout())
//       return Promise.reject(error)
//     }

//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({
//           resolve: (token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`
//             resolve(axiosClient(originalRequest))
//           },
//           reject,
//         })
//       })
//     }

//     isRefreshing = true

//     try {
//       const { data } = await plainAxios.post('/payroll/auth/refresh-token', {
//         refreshToken,
//       })
//       console.log(data)

//       const newAccessToken = data.data.accessToken
//      store.dispatch(updateAccessToken(newAccessToken))

//       processQueue(null, newAccessToken)

//       originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
//       return axiosClient(originalRequest)
//     } catch (err) {
//       processQueue(err, null)
//       store.dispatch(logout())
//       window.location.href = '/login';
//       return Promise.reject(err)
//     } finally {
//       isRefreshing = false
//     }
//   }
// )

export default axiosClient;
