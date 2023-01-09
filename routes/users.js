const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/userController");
const { userValidation } = require("../validation/userValidation");
const catchValidationError = require("../middlewares/catchValidationError");

router.post("/new", userValidation, catchValidationError, register);
router.post("/login", userValidation, catchValidationError, login);

module.exports = router;
