const express = require("express");
const { priceList } = require("../controllers/priceList");
const { login, register } = require("../controllers/auth");
const signupSchema = require("../validations/auth");
const validate = require("../middlewares/validate");

const router = express.Router();

router.route("/pricelist").get(priceList);
router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(login);

module.exports = router;
