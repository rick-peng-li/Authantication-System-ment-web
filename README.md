<!-- Git 仓库地址：git@github.com:rick-peng-li/Authantication-System-ment-web.git -->

# Authantication-System-ment-web

一个基于 MERN 技术栈的前后端分离认证系统示例项目。当前版本已经从基础登录注册示例，扩展为包含首页展示、仪表盘、个人资料、用户中心、账号设置等完整页面的认证管理项目，适合作为作品集项目、课程实训项目或后台系统脚手架。

## 项目亮点

- 支持注册、登录、退出登录与会话校验
- 采用 JWT + Cookie 维护登录态
- 支持查看与编辑个人资料
- 支持修改密码、维护账号安全
- 支持用户列表展示与关键字搜索
- 支持仪表盘统计、近期成员展示与服务健康检查
- 前后端结构清晰，方便继续扩展角色权限、找回密码、头像上传等功能

## 目录结构

```text
Authantication-System-ment-web/
├─ backend/
│  ├─ config/
│  ├─ controller/
│  ├─ middleware/
│  ├─ model/
│  ├─ routes/
│  ├─ .env.example
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ routes/
│  │  ├─ utils/
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ .env.example
│  ├─ package.json
│  └─ vite.config.js
├─ .gitignore
└─ README.md
```

## 技术架构

### 前端

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- React Toastify
- Fetch API 封装请求工具

### 后端

- Node.js
- Express 5
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- dotenv
- cors

### 认证链路

1. 用户在前端登录或注册页面提交表单
2. 前端调用后端认证接口
3. 后端校验参数、查询数据库并签发 JWT
4. JWT 通过 Cookie 回写到浏览器
5. 受保护页面访问前调用会话接口校验登录态
6. 已登录用户可访问资料、用户中心、设置和仪表盘页面

## 页面设计与功能说明

| 页面 | 路径 | 功能说明 |
| --- | --- | --- |
| 首页 | `/` | 项目展示页，介绍系统能力、页面结构与入口导航 |
| 登录页 | `/auth/login` | 用户登录，成功后进入仪表盘 |
| 注册页 | `/auth/register` | 新用户注册，成功后直接进入仪表盘 |
| 仪表盘 | `/dashboard` | 展示会话信息、系统用户数、资料完整度、近期成员、服务状态 |
| 个人资料 | `/profile` | 查看并编辑用户名、邮箱、地区、个人简介 |
| 用户中心 | `/users` | 浏览系统成员列表，支持按用户名、邮箱、地区搜索 |
| 账号设置 | `/settings` | 修改当前账号密码，增强安全性 |
| 404 页面 | `*` | 兜底路由，避免访问未知路径时空白 |

## 模块说明

### 前端模块

- `src/pages/home.jsx`：首页展示与项目入口
- `src/pages/auth/login.jsx`：登录页
- `src/pages/auth/register.jsx`：注册页
- `src/pages/admin/dashboard.jsx`：仪表盘页面
- `src/pages/profile.jsx`：个人资料页
- `src/pages/users.jsx`：用户中心页面
- `src/pages/settings.jsx`：账号设置页面
- `src/components/auth/ProtectedRoute.jsx`：通过会话接口校验受保护页面访问权限
- `src/components/common/AppLayout.jsx`：后台页面通用布局与导航
- `src/utils/api.js`：统一封装前端请求逻辑
- `src/routes/AppRoute.jsx`：前端路由总入口

### 后端模块

- `server.js`：启动服务、处理跨域、挂载路由并提供健康检查接口
- `model/user.model.js`：定义用户模型，包含基础资料和扩展字段
- `middleware/auth.middleware..js`：解析 Cookie / Bearer Token 并校验 JWT
- `controller/auth.controller.js`：认证、退出登录、会话接口逻辑
- `controller/user.controller.js`：资料、列表、统计、密码修改相关逻辑
- `routes/auth.route.js`：认证接口路由
- `routes/user.route.js`：用户接口路由

## 接口设计

### 健康检查接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/health` | 检查服务是否正常运行 |

### 认证接口

| 方法 | 路径 | 说明 | 请求体 |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | 注册用户并写入登录 Cookie | `name`、`email`、`password` |
| POST | `/api/auth/login` | 登录并写入登录 Cookie | `email`、`password` |
| POST | `/api/auth/logout` | 清除登录 Cookie | 无 |
| GET | `/api/auth/session` | 获取当前登录用户会话信息 | 无 |

### 用户接口

| 方法 | 路径 | 说明 | 请求体 |
| --- | --- | --- | --- |
| GET | `/api/user/me` | 获取当前登录用户资料 | 无 |
| GET | `/api/user/stats` | 获取仪表盘统计信息 | 无 |
| GET | `/api/user/list` | 获取用户列表，支持 `keyword` 搜索 | 无 |
| PUT | `/api/user/profile` | 更新当前用户资料 | `name`、`email`、`location`、`bio` |
| PUT | `/api/user/password` | 修改当前用户密码 | `currentPassword`、`newPassword` |
| GET | `/api/user/:id` | 获取指定用户详情 | 无 |

## 数据模型设计

### User

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | String | 用户名 |
| `email` | String | 邮箱，唯一值 |
| `password` | String | bcrypt 加密后的密码 |
| `role` | String | 用户角色，默认 `user` |
| `bio` | String | 个人简介 |
| `location` | String | 所在地区 |
| `createdAt` | Date | 创建时间 |
| `updatedAt` | Date | 更新时间 |

## 环境变量

### 后端 `.env`

参考 `backend/.env.example`：

```env
MONGO_URI=
JWT_SECRET=
PORT=
CLIENT_URL=http://localhost:5173
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

### 前端 `.env`

参考 `frontend/.env.example`：

```env
VITE_API_URL=http://localhost:5000
```

## 启动方式

### 1. 克隆项目

```bash
git clone git@github.com:rick-peng-li/Authantication-System-ment-web.git
cd Authantication-System-ment-web
```

### 2. 启动后端

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Windows PowerShell 可使用：

```powershell
Copy-Item .env.example .env
```

### 3. 启动前端

```bash
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

### 4. 访问地址

- 前端开发地址：`http://localhost:5173`
- 后端开发地址：`http://localhost:5000`
- 健康检查地址：`http://localhost:5000/api/health`

## 当前版本适合继续扩展的方向

- 增加角色权限与菜单控制
- 增加头像上传、Cloudinary 文件管理
- 增加找回密码、邮箱验证、短信验证
- 增加登录日志、操作日志和安全审计能力
- 增加管理员页面、用户禁用启用、用户删除等后台管理能力

## 本次升级内容

- 新增首页、个人资料、用户中心、账号设置和 404 页面
- 新增会话接口、统计接口、资料接口、密码修改接口和健康检查接口
- 修正前端受保护路由逻辑，改为基于真实会话接口校验
- 修正后端 token 解析链路，使 Cookie 鉴权真正可用
- 增加前端统一请求工具和后台通用布局，提升项目完整度与可维护性
