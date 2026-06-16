import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AppLayout from "../../components/common/AppLayout"
import { apiRequest } from "../../utils/api"

const statItems = [
  { key: "totalUsers", label: "系统用户数" },
  { key: "profileCompletion", label: "资料完整度" },
]

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [stats, setStats] = useState(null)
  const [health, setHealth] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadDashboardData = async () => {
      try {
        const [sessionResponse, statsResponse, healthResponse] = await Promise.all([
          apiRequest("/api/auth/session"),
          apiRequest("/api/user/stats"),
          apiRequest("/api/health"),
        ])

        if (!isMounted) {
          return
        }

        setSession(sessionResponse.data)
        setStats(statsResponse.data)
        setHealth(healthResponse)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadDashboardData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <AppLayout
      title="项目仪表盘"
      description="集中展示当前会话信息、系统用户统计、资料完整度和近期新成员，适合作为后台首页入口。"
    >
      {loading ? (
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-slate-200">正在加载仪表盘数据...</div>
      ) : (
        <div className="space-y-8">
          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-indigo-500/10 p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Overview</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">欢迎回来，{session?.name || "用户"}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                你当前已登录系统，可以继续维护资料、浏览成员列表、修改密码，并基于现有结构继续扩展更多后台功能。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/profile" className="rounded-full bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300">
                  编辑个人资料
                </Link>
                <Link to="/users" className="rounded-full border border-white/20 px-5 py-3 font-medium transition hover:bg-white/10">
                  查看用户中心
                </Link>
                <Link to="/settings" className="rounded-full border border-white/20 px-5 py-3 font-medium transition hover:bg-white/10">
                  修改登录密码
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
              {statItems.map((item) => (
                <div key={item.key} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <h3 className="mt-3 text-3xl font-semibold">{stats?.[item.key]}{item.key === "profileCompletion" ? "%" : ""}</h3>
                </div>
              ))}
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-slate-400">服务状态</p>
                <h3 className="mt-3 text-3xl font-semibold text-emerald-300">{health?.message || "正常"}</h3>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Session</p>
                  <h3 className="mt-2 text-2xl font-semibold">当前登录信息</h3>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-300">已登录</span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">用户名</p>
                  <p className="mt-2 text-lg font-medium">{session?.name}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">邮箱</p>
                  <p className="mt-2 text-lg font-medium break-all">{session?.email}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">角色</p>
                  <p className="mt-2 text-lg font-medium">{session?.role}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">加入时间</p>
                  <p className="mt-2 text-lg font-medium">{stats?.memberSince ? new Date(stats.memberSince).toLocaleDateString() : "-"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Members</p>
                  <h3 className="mt-2 text-2xl font-semibold">近期加入成员</h3>
                </div>
                <Link to="/users" className="text-sm text-cyan-300 transition hover:text-cyan-200">查看全部</Link>
              </div>
              <div className="mt-6 space-y-4">
                {stats?.latestUsers?.map((user) => (
                  <div key={user.id} className="flex items-start justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                    <div>
                      <p className="text-lg font-medium">{user.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{user.email}</p>
                      <p className="mt-2 text-sm text-slate-300">{user.location || "暂未填写地区"}</p>
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-2 text-xs text-slate-300">{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </AppLayout>
  )
}

export default Dashboard
