const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorieRoles } = require("../middleware/auth")
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);


router.route("/admin/orders").get(isAuthenticatedUser, authorieRoles("admin"), getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser, authorieRoles("admin"), updateOrder);
router.route("/admin/order/:id").delete(isAuthenticatedUser, authorieRoles("admin"), deleteOrder);

module.exports = router;