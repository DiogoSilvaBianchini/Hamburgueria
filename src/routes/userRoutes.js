const express = require("express")
const router = express.Router()
const UserController = require("../controller/userControoler")

router.get("/user/", UserController.getAllUsers)
router.get("/user/:id", UserController.getUserById)
router.post("/user", express.json(), UserController.createNewUser)
router.put("/user/:id", express.json(), UserController.updateUser)
router.delete("/user/:id", express.json(), UserController.deleteUser)

module.exports = router

