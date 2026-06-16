import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import AppLayout from "../components/common/AppLayout"
import { apiRequest } from "../utils/api"

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    role: "",
    createdAt: "",
  })

  useEffect(() => {
    let isMounted = true

    const loadProfile = async () => {
      try {
        const response = await apiRequest("/api/user/me")

        if (!isMounted) {
          return
        }

        setProfile({
          name: response.data.name || "",
          email: response.data.email || "",
          location: response.data.location || "",
          bio: response.data.bio || "",
          role: response.data.role || "user",
          createdAt: response.data.createdAt || "",
        })
      } catch (error) {
        toast.error(error.message || "获取个人资料失败")
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadProfile()

    return () => {
      isMounted = false
    }
  }, [])

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)

    try {
      const response = await apiRequest("/api/user/profile", {
        method: "PUT",
        body: {
          name: profile.name,
          email: profile.email,
          location: profile.location,
          bio: profile.bio,
        },
      })
      setProfile((currentProfile) => ({
        ...currentProfile,
        name: response.data.name,
        email: response.data.email,
        location: response.data.location,
        bio: response.data.bio,
        role: response.data.role,
        createdAt: response.data.createdAt,
      }))
      toast.success("个人资料已更新")
    } catch (error) {
      toast.error(error.message || "保存失败")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AppLayout
      title="个人资料"
      description="在这里维护当前登录用户的基础资料信息，包括用户名、邮箱、地区和个人简介。"
    >
      {loading ? (
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-slate-200">正在加载个人资料...</div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Profile Snapshot</p>
            <div className="mt-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400 text-3xl font-semibold text-slate-950">
              {profile.name?.slice(0, 1)?.toUpperCase() || "U"}
            </div>
            <h2 className="mt-5 text-2xl font-semibold">{profile.name || "未设置用户名"}</h2>
            <p className="mt-2 break-all text-sm text-slate-300">{profile.email || "未设置邮箱"}</p>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">角色</p>
                <p className="mt-2 text-lg font-medium">{profile.role}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">地区</p>
                <p className="mt-2 text-lg font-medium">{profile.location || "未填写"}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">注册时间</p>
                <p className="mt-2 text-lg font-medium">{profile.createdAt ? new Date(profile.createdAt).toLocaleString() : "-"}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Edit Profile</p>
            <h2 className="mt-3 text-2xl font-semibold">编辑资料</h2>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm text-slate-300">用户名</label>
                  <input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-300"
                    placeholder="请输入用户名"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm text-slate-300">邮箱</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-300"
                    placeholder="请输入邮箱"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="location" className="text-sm text-slate-300">地区</label>
                <input
                  id="location"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-300"
                  placeholder="例如：上海 / 北京 / 杭州"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="bio" className="text-sm text-slate-300">个人简介</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows="5"
                  className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-300"
                  placeholder="介绍一下你的职责、方向或项目经验"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-fit rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "保存中..." : "保存资料"}
              </button>
            </form>
          </section>
        </div>
      )}
    </AppLayout>
  )
}

export default Profile
