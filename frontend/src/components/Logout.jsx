import { useNavigate } from "react-router-dom"
import logoutUser from "../api/authApi.js"
// import { getCookie } from "../utils/token.js"
import Cookies from "js-cookie"

function LogoutButton() {
    const navigate = useNavigate()
    const userData = Cookies.get("auth_user")
    const user = userData ? JSON.parse(userData) : null

    return (
        <div
            className="text-gray-900 text-center rounded-full  w-12 h-12 bg-gray-100/70 cursor-pointer -mr-8"
            onClick={() => {
                logoutUser()
                navigate("/auth")
            }}
        >
            <h2 className="font-bold">{user?.username || "ناشناس"}</h2>
            <h3 className="text-sm text-gray-600 font-[500]">{user?.role || "کاربر"}</h3>
        </div>
    )
}

export default LogoutButton
