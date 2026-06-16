import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-2xl rounded-[36px] border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">页面不存在</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">你访问的地址没有对应页面，可以返回首页重新进入，或直接去登录页体验项目功能。</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
            返回首页
          </Link>
          <Link to="/auth/login" className="rounded-full border border-white/20 px-5 py-3 font-semibold transition hover:bg-white/10">
            去登录
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
