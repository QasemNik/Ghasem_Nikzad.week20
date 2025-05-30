import Cookies from "js-cookie"

const TOKEN_KEY = 'auth_token'
const cookieConfig = {
    expires: 7,
    path: "/",
    sameSite: "strict",
}
export const setCookie = (token) => Cookies.set(TOKEN_KEY, token, cookieConfig)
export const getCookie = () => Cookies.get(TOKEN_KEY)
export const removeCookie=()=> Cookies.remove(TOKEN_KEY, {path: "/"})