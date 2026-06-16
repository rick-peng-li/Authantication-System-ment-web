import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { apiRequest } from "../../utils/api"

const navigationItems = [
  { to: "/dashboard", label: "仪表盘" },
  { to: "/profile", label: "个人资料" },
  { to: "/users", label: "用户中心" },
  { to: "/settings", label: "账号设置" },
]

const AppLayout = ({ title, description, children }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await apiRequest("/api/auth/logout", {
        method: "POST",
      })
      toast.success("已退出登录")
      navigate("/auth/login")
    } catch (error) {
      toast.error(error.message || "退出登录失败")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-left text-2xl font-semibold tracking-tight"
            >
              Authantication System
            </button>
            <p className="mt-1 text-sm text-slate-300">认证、用户资料、密码设置与成员列表一体化示例</p>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 transition ${isActive ? "bg-white text-slate-950" : "bg-white/5 hover:bg-white/10"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-rose-500 px-4 py-2 font-medium text-white transition hover:bg-rose-400"
            >
              退出登录
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Workspace</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight lg:text-4xl">{title}</h1>
          </div>
          {description ? <p className="max-w-2xl text-sm leading-7 text-slate-300">{description}</p> : null}
        </div>
        {children}
      </main>
    </div>
  )
}

export default AppLayout
