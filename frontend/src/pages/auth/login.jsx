import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import image from "../../assets/hero.png"
import { apiRequest } from "../../utils/api"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const handelChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handelSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await apiRequest("/api/auth/login", {
        method: "POST",
        body: formData,
      })
      toast.success("登录成功")
      navigate("/dashboard")
    } catch (error) {
      toast.error(error.message || "登录失败")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-screen bg-slate-950 text-white lg:grid-cols-2">
      <div className="hidden h-screen lg:block">
        <img className="h-full w-full object-cover" src={image} alt="Login page" />
      </div>

      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur lg:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Welcome Back</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">登录到你的认证工作台</h1>
          <p className="mt-3 text-sm leading-7 text-slate-300">登录后可查看仪表盘、编辑个人资料、浏览用户列表并修改账号密码。</p>

          <form onSubmit={handelSubmit} className="mt-10 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-300" htmlFor="email">邮箱</label>
              <input
                id="email"
                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-300"
                type="email"
                value={formData.email}
                onChange={handelChange}
                name="email"
                placeholder="请输入邮箱"
                required
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-sm text-slate-300" htmlFor="password">密码</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handelChange}
                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 pr-20 outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                placeholder="请输入密码"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[42px] text-sm text-cyan-300"
              >
                {showPassword ? "隐藏" : "显示"}
              </button>
            </div>

            <button
              className="rounded-full bg-cyan-400 px-4 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "登录中..." : "立即登录"}
            </button>
          </form>

          <div className="mt-8 flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
            <span>
              还没有账号？
              <Link to="/auth/register" className="ml-2 text-cyan-300 transition hover:text-cyan-200">立即注册</Link>
            </span>
            <Link to="/" className="text-slate-400 transition hover:text-white">返回首页</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
