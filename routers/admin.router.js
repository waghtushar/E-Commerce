const { Router } = require("express");
const { index, index2, signupPage, signup, login, loginPage, formBasic, table, logout, profile, changePassword, changePasswordPage, forgetPassword, resetPassword, verifyOTP } = require("../controller/admin.controller");
const { auth, isAuth } = require("../middleware/adminAuth");
const passport = require("passport");

const router = Router();

router.get("/", isAuth, index);
router.get("/index", isAuth, index2);
router.get("/signup", signupPage);
router.post("/signup", auth, signup);
router.post("/login", login);
router.post("/local", passport.authenticate('local', { successRedirect: "/", failureRedirect: "/login" }));
router.get("/login", loginPage);
router.get("/form-basic", isAuth, formBasic);
router.get("/tables", isAuth, table);
router.get("/logout", logout);
router.get("/profile", isAuth, profile);
router.get("/changepassword", isAuth, changePassword);
router.post("/changepassword", isAuth, changePasswordPage);
router.post("/resetpassword", forgetPassword);
router.get("/resetpassword", resetPassword);
router.post("/verifyotp", verifyOTP);
router.get("/", verifyOTP);


module.exports = { router };