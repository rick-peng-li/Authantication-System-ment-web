const router = require("express").Router()
const userController = require("../controller/user.controller")
const authMiddleware = require("../middleware/auth.middleware.")

router.use(authMiddleware)

router.get("/me", userController.getCurrentUser)
router.get("/stats", userController.getUserStats)
router.get("/list", userController.listUsers)
router.put("/profile", userController.updateProfile)
router.put("/password", userController.changePassword)
router.get("/:id", userController.getUserById)

module.exports = router
