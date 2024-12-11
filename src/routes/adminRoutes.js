const express = require("express")
const AdminController = require("../controller/adminController.js")
const {authUser, checkToken, checkin, authGoogleUser, checkinNext} = require("../middlewares/userMiddlewares")
const router = express.Router()

router.get("/user", AdminController.getAllUsers)
router.get("/user/checkin", checkin)
router.get("/user/:id", AdminController.getUserById)

router.post("/user", express.json(), AdminController.createNewUser)
router.post("/user/login", express.json(), authUser, AdminController.createToken)
router.post("/user/login/google", express.json(), authGoogleUser, AdminController.createToken)
router.post("/user/recover/generate", express.json(), AdminController.checkEmail, AdminController.generateCodeRecover, AdminController.createRecoverToken)
router.post("/user/verifyCodeRecover", express.json(), checkinNext, AdminController.confirmeCode)
router.post("/user/recover", express.json(), checkinNext, AdminController.updateUser)

router.put("/user", express.json(), checkToken, AdminController.updateUser)
router.delete("/user/:id", express.json(), AdminController.deleteUserById)


module.exports = router