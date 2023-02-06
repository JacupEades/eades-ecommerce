const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const {
	userCart,
	getUserCart,
	emptyUserCart,
	saveAddress,
} = require("../controllers/user");

// svae cart
router.post("/user/cart", authCheck, userCart);
// get cart
router.get("/user/cart", authCheck, getUserCart);
// remove cart
router.delete("/user/cart", authCheck, emptyUserCart);
// save user address
router.post("/user/address", authCheck, saveAddress);

// router.get("/user", (req, res) => {
// 	res.json({
// 		data: "hey you hit user API endpoint",
// 	});
// });

module.exports = router;
