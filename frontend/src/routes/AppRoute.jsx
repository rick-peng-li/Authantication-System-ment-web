import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from "../components/auth/ProtectedRoute"
import Dashboard from "../pages/admin/dashboard"
import Login from "../pages/auth/login"
import Register from "../pages/auth/register"
import Home from "../pages/home"
import NotFound from "../pages/not-found"
import Profile from "../pages/profile"
import Settings from "../pages/settings"
import Users from "../pages/users"

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={(
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/users"
          element={(
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/settings"
          element={(
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoute
