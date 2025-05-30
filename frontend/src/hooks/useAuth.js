// hooks/useAuthGuard.js
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCookie } from "../utils/token"

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getCookie()
    if (!token) {
      const redirect = encodeURIComponent(window.location.pathname)
      navigate(`/auth?redirect=${redirect}`, { replace: true })
    } else {
      setIsLoading(false)
    }
  }, [navigate])

  return { isLoading }
}