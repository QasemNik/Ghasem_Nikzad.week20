import axios from "axios"
import toast from "react-hot-toast"
import { getCookie, removeCookie } from "../utils/token"

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

    headers: {
      "Content-Type": "application/json"
  }
})

api.interceptors.request.use(
  (config) => {
    const token = getCookie("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "An error occurred"

    const isAuthEndpoint = error.config.url.includes("/auth/login") || error.config.url.includes("/auth/register")

    if (!isAuthEndpoint) {
      toast.error(message)
    }

    if (error.response?.status === 401 && !isAuthEndpoint) {
      removeCookie("auth_token", { path: "/" })
      removeCookie("auth_user", { path: "/" })

      if (window.location.pathname !== "/auth") {
        window.location.href = `/auth?redirect=${encodeURIComponent(window.location.pathname)}`
      }
    }

    return Promise.reject(error)
  },
)

export default api