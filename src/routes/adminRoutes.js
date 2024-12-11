const express = require("express")
const AdminController = require("../controller/adminController.js")
const {authUser, checkToken, checkin, authGoogleUser, checkinNext} = require("../middlewares/userMiddlewares")
const router = express.Router()

router.get("/admin", AdminController.getAllUsers)
router.get("/admin/checkin", checkin)
router.get("/admin/:id", AdminController.getUserById)

router.post("/admin", express.json(), AdminController.createNewUser)
router.post("/admin/login", express.json(), authUser, AdminController.createToken)
router.post("/admin/login/google", express.json(), authGoogleUser, AdminController.createToken)
router.post("/admin/recover/generate", express.json(), AdminController.checkEmail, AdminController.generateCodeRecover, AdminController.createRecoverToken)
router.post("/admin/verifyCodeRecover", express.json(), checkinNext, AdminController.confirmeCode)
router.post("/admin/recover", express.json(), checkinNext, AdminController.updateUser)

router.put("/admin", express.json(), checkToken, AdminController.updateUser)
router.delete("/admin/:id", express.json(), AdminController.deleteUserById)


module.exports = router