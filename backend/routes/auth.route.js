const router = require("express").Router()
const authController = require("../controller/auth.controller")
const authMiddleware = require("../middleware/auth.middleware.")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.get("/session", authMiddleware, authController.getSession)

module.exports = router
