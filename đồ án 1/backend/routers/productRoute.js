const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorieRoles } = require("../middleware/auth")
const { getAllProducts, getAdminProducts, createProduct, updateProduct, deleteProducts, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");


router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser, authorieRoles("admin"), getAdminProducts);
router.route("/product/:id").get(getProductDetails);


router.route("/admin/product/new").post(isAuthenticatedUser, authorieRoles("admin"), createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser, authorieRoles("admin"), updateProduct);
router.route("/admin/product/:id").delete(isAuthenticatedUser, authorieRoles("admin"), deleteProducts);


router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(getProductReviews)
router.route("/reviews").delete(isAuthenticatedUser, deleteReview)

module.exports = router;