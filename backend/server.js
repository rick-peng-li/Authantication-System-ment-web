const express = require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()
const app = express()
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173"

connectDB()

app.use(cors({
    origin: clientUrl,
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "服务运行正常",
    })
})

app.use("/api/auth", require("./routes/auth.route"))
app.use("/api/user", require("./routes/user.route"))

app.listen(process.env.PORT, () => {
    console.log(`server is listing on port ${process.env.PORT}`)
})
