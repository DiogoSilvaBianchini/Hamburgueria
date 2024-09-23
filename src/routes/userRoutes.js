const express = require("express")
const UserController = require("../controller/userController")
const {authUser, checkToken, userRegisterFormValidation, checkin, authGoogleUser, checkinNext} = require("../middlewares/userMiddlewares")
const {validate} = require("express-validation")
const router = express.Router()

router.get("/user", UserController.getAllUsers)
router.get("/user/checkin", checkin)
router.get("/user/recover", express.json(), checkinNext, UserController.recoverPassword)
router.get("/user/:id", UserController.getUserById)

router.post("/user", express.json(), validate(userRegisterFormValidation, {}, {}), UserController.createNewUser)
router.post("/user/login", express.json(), authUser, UserController.createToken)
router.post("/user/login/google", express.json(), authGoogleUser, UserController.createToken)

router.put("/user", express.json(), checkToken, UserController.updateUser)
router.delete("/user/:id", express.json(), UserController.deleteUserById)


module.exports = router