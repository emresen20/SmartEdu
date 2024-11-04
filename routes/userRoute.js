const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();
router.route("/signup").post(authController.createUser); // localhost/users/signup yapılacak post request çalıştırır
router.route("/login").post(authController.loginUser); //localhost/users/login yapılacak post işlemi login ejs de actionda
router.route("/logout").get(authController.logoutUser)
router.route("/dashboard").get(authController.getDashboardPage) //localhosty/users/dashboard

module.exports = router;
