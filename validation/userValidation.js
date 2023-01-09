const { body } = require("express-validator");

exports.userValidation = [
  body("username")
    .notEmpty()
    .withMessage("username is required !")
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "username should be of atleast 5 and atmost 20 character long !"
    ),
  body("password")
    .notEmpty()
    .withMessage("Password is Required !")
    .isLength({ min: 6, max: 12 })
    .withMessage(
      "Password should be at least 6 characters and at most 12 character long !"
    )
    .isStrongPassword()
    .withMessage(
      "Password should be combination of at least a lower case, Upper case, Number and a Symbol !"
    ),
];
