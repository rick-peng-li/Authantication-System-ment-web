import { useState } from "react"
import { toast } from "react-toastify"
import AppLayout from "../components/common/AppLayout"
import { apiRequest } from "../utils/api"

const Settings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("两次输入的新密码不一致")
      return
    }

    setSaving(true)

    try {
      await apiRequest("/api/user/password", {
        method: "PUT",
        body: {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
      })
      toast.success("密码已更新，请妥善保管")
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast.error(error.message || "密码修改失败")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AppLayout
      title="账号设置"
      description="提供账号安全相关能力，当前支持密码修改，后续可以继续扩展邮箱验证、二次验证和登录设备管理。"
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Security Tips</p>
          <h2 className="mt-4 text-2xl font-semibold">安全建议</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">新密码建议使用大小写字母、数字和特殊字符组合，提高账号安全性。</div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">不要在多个平台复用同一套密码，降低撞库风险。</div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">后续可以继续扩展找回密码、邮箱验证、登录日志和二次校验功能。</div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Update Password</p>
          <h2 className="mt-4 text-2xl font-semibold">修改登录密码</h2>
          <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="currentPassword" className="text-sm text-slate-300">当前密码</label>
              <input
                id="currentPassword"
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-300"
                placeholder="请输入当前密码"
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="newPassword" className="text-sm text-slate-300">新密码</label>
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-300"
                  placeholder="请输入新密码"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-sm text-slate-300">确认新密码</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-300"
                  placeholder="请再次输入新密码"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-fit rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "提交中..." : "更新密码"}
            </button>
          </form>
        </section>
      </div>
    </AppLayout>
  )
}

export default Settings
