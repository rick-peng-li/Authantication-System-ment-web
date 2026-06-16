const { default: mongoose } = require("mongoose");

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        bio: {
            type: String,
            trim: true,
            default: "",
            maxlength: 160,
        },
        location: {
            type: String,
            trim: true,
            default: "",
            maxlength: 80,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", User)
