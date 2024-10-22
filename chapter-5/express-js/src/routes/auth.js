const express = require("express");
const { validateRegister } = require("../middlewares/auth");
const { validateLogin } = require("../middlewares/auth");
const { register } = require("../controllers/auth");
const { login } = require("../controllers/auth");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
