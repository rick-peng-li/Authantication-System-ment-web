import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import AppLayout from "../components/common/AppLayout"
import { apiRequest } from "../utils/api"

const Users = () => {
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState("")
  const [users, setUsers] = useState([])

  const loadUsers = async (searchValue = "") => {
    const queryString = searchValue ? `?keyword=${encodeURIComponent(searchValue)}` : ""
    const response = await apiRequest(`/api/user/list${queryString}`)
    return response.data
  }

  useEffect(() => {
    let isMounted = true

    const initializeUsers = async () => {
      try {
        const userList = await loadUsers()
        if (isMounted) {
          setUsers(userList)
        }
      } catch (error) {
        if (isMounted) {
          toast.error(error.message || "获取用户列表失败")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    initializeUsers()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSearch = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const userList = await loadUsers(keyword)
      setUsers(userList)
    } catch (error) {
      toast.error(error.message || "获取用户列表失败")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout
      title="用户中心"
      description="查看系统中的注册成员，支持按用户名、邮箱或地区关键字搜索，便于后续扩展成员管理、组织架构和角色体系。"
    >
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">User Directory</p>
            <h2 className="mt-3 text-2xl font-semibold">成员列表</h2>
          </div>
          <form onSubmit={handleSearch} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="flex-1 rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
              placeholder="搜索用户名、邮箱或地区"
            />
            <button type="submit" className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
              搜索
            </button>
          </form>
        </div>

        {loading ? (
          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-slate-300">正在加载用户列表...</div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {users.map((user) => (
              <article key={user.id} className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400 text-lg font-semibold text-slate-950">
                    {user.name?.slice(0, 1)?.toUpperCase() || "U"}
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-2 text-xs text-slate-300">{user.role}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{user.name}</h3>
                <p className="mt-2 break-all text-sm text-slate-400">{user.email}</p>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <p>地区：{user.location || "暂未填写"}</p>
                  <p>简介：{user.bio || "这个用户还没有填写个人简介。"}</p>
                  <p>加入时间：{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </article>
            ))}
            {!users.length ? (
              <div className="rounded-[28px] border border-dashed border-white/10 bg-slate-950/40 p-6 text-sm text-slate-300">
                当前没有匹配的用户记录，可以换个关键字再次搜索。
              </div>
            ) : null}
          </div>
        )}
      </section>
    </AppLayout>
  )
}

export default Users
