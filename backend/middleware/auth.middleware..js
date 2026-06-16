const jwt = require("jsonwebtoken")
const User = require("../model/user.model")

const getTokenFromRequest = (req) => {
  const cookieHeader = req.headers.cookie || ""
  const tokenCookie = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("token="))

  if (tokenCookie) {
    return decodeURIComponent(tokenCookie.split("=").slice(1).join("="))
  }

  const authHeader = req.headers.authorization || ""

  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7).trim()
  }

  return null
}

const authMiddleware = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    })
  }
}

module.exports = authMiddleware
