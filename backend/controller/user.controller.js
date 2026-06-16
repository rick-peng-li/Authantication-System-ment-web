const bcrypt = require("bcrypt")
const User = require("../model/user.model")

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

module.exports.getCurrentUser = async (req, res) => {
    return res.status(200).json({
        message: "获取当前用户成功",
        success: true,
        data: buildUserResponse(req.user),
    })
}

module.exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "用户不存在",
                success: false,
            })
        }

        return res.status(200).json({
            message: "获取用户详情成功",
            success: true,
            data: buildUserResponse(user),
        })
    } catch (error) {
        console.log("Error while fetching user", error)

        return res.status(500).json({
            message: "获取用户详情失败",
            success: false,
        })
    }
}

module.exports.listUsers = async (req, res) => {
    try {
        const keyword = (req.query.keyword || "").trim()
        const query = keyword
            ? {
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { email: { $regex: keyword, $options: "i" } },
                    { location: { $regex: keyword, $options: "i" } },
                ],
            }
            : {}

        const users = await User.find(query)
            .select("-password")
            .sort({ createdAt: -1 })
            .limit(50)

        return res.status(200).json({
            message: "获取用户列表成功",
            success: true,
            data: users.map(buildUserResponse),
        })
    } catch (error) {
        console.log("Error while listing users", error)

        return res.status(500).json({
            message: "获取用户列表失败",
            success: false,
        })
    }
}

module.exports.getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments()
        const latestUsers = await User.find()
            .select("-password")
            .sort({ createdAt: -1 })
            .limit(5)

        const completedFields = [
            req.user.name,
            req.user.email,
            req.user.bio,
            req.user.location,
        ].filter(Boolean).length

        return res.status(200).json({
            message: "获取统计信息成功",
            success: true,
            data: {
                totalUsers,
                latestUsers: latestUsers.map(buildUserResponse),
                profileCompletion: Math.round((completedFields / 4) * 100),
                memberSince: req.user.createdAt,
            },
        })
    } catch (error) {
        console.log("Error while fetching stats", error)

        return res.status(500).json({
            message: "获取统计信息失败",
            success: false,
        })
    }
}

module.exports.updateProfile = async (req, res) => {
    try {
        const { name, email, bio, location } = req.body
        const updatePayload = {}

        if (typeof name === "string") {
            updatePayload.name = name.trim()
        }

        if (typeof bio === "string") {
            updatePayload.bio = bio.trim()
        }

        if (typeof location === "string") {
            updatePayload.location = location.trim()
        }

        if (typeof email === "string") {
            const normalizedEmail = email.toLowerCase().trim()
            const existingUser = await User.findOne({
                email: normalizedEmail,
                _id: { $ne: req.user._id },
            })

            if (existingUser) {
                return res.status(400).json({
                    message: "该邮箱已被其他用户使用",
                    success: false,
                })
            }

            updatePayload.email = normalizedEmail
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, updatePayload, {
            new: true,
            runValidators: true,
        }).select("-password")

        return res.status(200).json({
            message: "个人资料更新成功",
            success: true,
            data: buildUserResponse(updatedUser),
        })
    } catch (error) {
        console.log("Error while updating user", error)

        return res.status(500).json({
            message: "个人资料更新失败",
            success: false,
        })
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "请填写完整的密码信息",
                success: false,
            })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "新密码长度不能少于 6 位",
                success: false,
            })
        }

        const user = await User.findById(req.user._id)
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)

        if (!isCurrentPasswordValid) {
            return res.status(400).json({
                message: "当前密码不正确",
                success: false,
            })
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(newPassword, salt)
        await user.save()

        return res.status(200).json({
            message: "密码修改成功",
            success: true,
        })
    } catch (error) {
        console.log("Error while changing password", error)

        return res.status(500).json({
            message: "密码修改失败",
            success: false,
        })
    }
}
