const User = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000,
}

const buildUserResponse = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio,
    location: user.location,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
})

const createToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "2d"
})

module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "请完整填写注册信息",
                success: false,
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "密码长度不能少于 6 位",
                success: false,
            })
        }

        const normalizedEmail = email.toLowerCase().trim()
        const existingUser = await User.findOne({ email: normalizedEmail })

        if (existingUser) {
            return res.status(400).json({
                message: "该邮箱已被注册",
                success: false,
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashPassword,
        })

        const token = createToken(newUser._id)
        res.cookie("token", token, cookieOptions)

        return res.status(201).json({
            message: "注册成功",
            success: true,
            data: buildUserResponse(newUser),
        })
    } catch (error) {
        console.log("Error while register user", error)

        return res.status(500).json({
            message: "注册失败",
            success: false,
        })
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "请输入邮箱和密码",
                success: false,
            })
        }

        const normalizedEmail = email.toLowerCase().trim()
        const user = await User.findOne({ email: normalizedEmail })

        if (!user) {
            return res.status(400).json({
                message: "用户不存在",
                success: false,
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "邮箱或密码错误",
                success: false,
            })
        }

        const token = createToken(user._id)
        res.cookie("token", token, cookieOptions)

        return res.status(200).json({
            message: "登录成功",
            success: true,
            data: buildUserResponse(user),
        })
    } catch (error) {
        console.log("Error while login user", error)

        return res.status(500).json({
            message: "登录失败",
            success: false,
        })
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })

        return res.status(200).json({
            message: "退出登录成功",
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: "退出登录失败",
            success: false,
        })
    }
}

module.exports.getSession = async (req, res) => {
    return res.status(200).json({
        message: "获取会话成功",
        success: true,
        data: buildUserResponse(req.user),
    })
}
