const express = require("express")
const UserController = require("../controller/userController")
const {authUser, checkToken, userRegisterFormValidation, checkin, authGoogleUser, checkinNext} = require("../middlewares/userMiddlewares")
const {validate} = require("express-validation")
const router = express.Router()

router.get("/user", UserController.getAllUsers)
router.get("/user/checkin", checkin)
router.get("/user/:id", UserController.getUserById)

router.post("/user", express.json(), UserController.createNewUser)
router.post("/user/login", express.json(), authUser, UserController.createToken)
router.post("/user/login/google", express.json(), authGoogleUser, UserController.createToken)
router.post("/user/recover/generate", express.json(), UserController.checkEmail, UserController.generateCodeRecover, UserController.createRecoverToken)
router.post("/user/verifyCodeRecover", express.json(), checkinNext, UserController.confirmeCode)
router.post("/user/recover", express.json(), checkinNext, UserController.updateUser)

router.put("/user", express.json(), checkToken, UserController.updateUser)
router.delete("/user/:id", express.json(), UserController.deleteUserById)


module.exports = router