const express = require("express");
const router = express.Router();

//controllers
const userController = require("../../Controllers/user.controller");

//middlewares and schema
const validateForm = require("../../middlewares/validateForm");
const SignupSchema = require("../../Validations/SignUpSchema");
const LoginSchema = require("../../Validations/LoginSchema");
const authCheck = require("../../middlewares/auth");

//routes
router.get("/isloggedin", authCheck, userController.isLoggedIn);
router.get("/logout", authCheck, userController.logout);
router.post("/signup", validateForm(SignupSchema), userController.signup);
router.post("/login", validateForm(LoginSchema), userController.login);
router.put("/", authCheck, userController.updateUser);

module.exports = router;
