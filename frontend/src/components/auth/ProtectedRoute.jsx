import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { apiRequest } from "../../utils/api"

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    let isMounted = true

    const validateSession = async () => {
      try {
        await apiRequest("/api/auth/session")
        if (isMounted) {
          setStatus("authorized")
        }
      } catch {
        if (isMounted) {
          setStatus("unauthorized")
        }
      }
    }

    validateSession()

    return () => {
      isMounted = false
    }
  }, [])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-center">
          <p className="text-lg font-medium">正在校验登录状态</p>
          <p className="mt-2 text-sm text-slate-300">请稍候，系统正在为你加载受保护页面</p>
        </div>
      </div>
    )
  }

  if (status === "unauthorized") {
    return <Navigate to="/auth/login" replace />
  }

  return children
}

export default ProtectedRoute
