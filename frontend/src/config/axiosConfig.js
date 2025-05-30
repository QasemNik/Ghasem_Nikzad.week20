import axios from "axios"
import { getCookie } from "../utils/token"

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})
api.interceptors.request.use(
    (config) => {
      const token = getCookie()
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
    (response) => response)
export default api