import { Link } from "react-router-dom"
import image from "../assets/hero.png"

const featureList = [
  "用户注册、登录与安全退出",
  "基于 Cookie 的会话校验",
  "个人资料维护与密码修改",
  "用户列表、搜索与统计面板",
]

const pageList = [
  { title: "首页", desc: "项目亮点、模块说明与入口导航" },
  { title: "仪表盘", desc: "展示会话信息、统计指标和近期成员" },
  { title: "个人资料", desc: "查看并编辑昵称、邮箱、地区、简介" },
  { title: "用户中心", desc: "搜索成员并浏览系统内用户列表" },
  { title: "账号设置", desc: "修改密码并强化账号安全" },
]

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-white/5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">MERN Project</p>
            <h1 className="mt-2 text-2xl font-semibold lg:text-3xl">Authantication System 项目展示站</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/auth/login" className="rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-200">
              登录系统
            </Link>
            <Link to="/auth/register" className="rounded-full border border-white/20 px-5 py-3 font-medium transition hover:bg-white/10">
              创建账号
            </Link>
          </div>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[36px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-indigo-500/10 p-8 lg:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Authentication Platform</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight lg:text-6xl">让认证项目从“能登录”升级到“可展示、可扩展、可继续开发”</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
              当前版本在基础注册登录之外，补充了会话接口、用户资料管理、成员列表、密码修改和仪表盘统计页面，项目结构更适合继续演进为完整后台系统。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/dashboard" className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
                查看仪表盘
              </Link>
              <Link to="/users" className="rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10">
                浏览用户中心
              </Link>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {featureList.map((feature) => (
                <div key={feature} className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-slate-200">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/5">
            <img src={image} alt="authentication project" className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">后端能力</p>
            <h3 className="mt-3 text-2xl font-semibold">接口更完整</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">新增会话校验、当前用户资料、用户列表、统计数据、资料更新与密码修改接口，形成更完整的用户生命周期闭环。</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">前端能力</p>
            <h3 className="mt-3 text-2xl font-semibold">页面更丰富</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">新增首页展示、仪表盘、个人资料页、用户中心与账号设置页，项目展示性和实用性都更强。</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">后续扩展</p>
            <h3 className="mt-3 text-2xl font-semibold">继续演进容易</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">现在可以继续添加角色权限、头像上传、邮箱验证、操作日志、找回密码等能力，而不需要再重做基础架构。</p>
          </div>
        </section>

        <section className="mt-10 rounded-[36px] border border-white/10 bg-white/5 p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Page Map</p>
              <h3 className="mt-2 text-3xl font-semibold">当前页面结构</h3>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">每个页面都对应实际业务场景，不再只是单一登录页与注册页，适合用于作品集展示、课程答辩和继续开发。</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {pageList.map((page) => (
              <div key={page.title} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <h4 className="text-lg font-semibold">{page.title}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">{page.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
