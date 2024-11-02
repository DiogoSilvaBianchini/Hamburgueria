const express = require("express")
const router = express.Router()
const ProductController = require("../controller/productController")
const uploadImage = require("../middlewares/multerUploadAws")
const { checkToken } = require("../middlewares/userMiddlewares")
const { registerFormValidation } = require("../middlewares/productMiddlewares")
const {validate} = require("express-validation")

router.get("/product", ProductController.findAllProduct)
router.get("/product/filter", ProductController.findForFilter)
router.get("/product/filter/time", ProductController.findByOrderTimer)

router.post("/product", uploadImage.array("imgs"), validate(registerFormValidation, {} , {}), checkToken, ProductController.createNewProduct)
router.post("/product/payment", express.json(), ProductController.payment)
router.post("/product/shipping", express.json(), ProductController.checkShipping)

router.put("/product/:id", uploadImage.array("imgs"), checkToken, ProductController.updateProduct)

router.delete("/product/img", express.json(), checkToken, ProductController.removeImage)
router.delete("/product/:id",  express.json(), checkToken, ProductController.removeProduct)

module.exports = router
