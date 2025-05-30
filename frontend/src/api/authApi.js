import api from "./axiosConfig"
import Cookies from "js-cookie"

const COOKIE_OPTIONS = {
  expires: 7, 
  path: "/",
  sameSite: "strict",
}

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData)
    return response.data
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message)
    throw error
  }
}

export const loginUser = async (credentials) => {
    const response = await api.post("/auth/login", credentials)

    if (response.data && response.data.token) {
      Cookies.set("auth_token", response.data.token, COOKIE_OPTIONS)
      const userData = {
        id: response.data.id || response.data.userId,
        username: credentials.username,
      }
      Cookies.set("auth_user", JSON.stringify(userData), COOKIE_OPTIONS)
    }
    return response.data
}

export default function logoutUser  ()  {
  Cookies.remove("auth_token", { path: "/" })
  Cookies.remove("auth_user", { path: "/" })
}
