const express = require("express");
const pageController = require("../controllers/pageController");
const redirectMiddleware= require('../middlewares/redirectMiddleware')

const router = express.Router();
router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/register").get(redirectMiddleware,pageController.getRegisterPage); //redirectMiddleware kendi yazdığımız middleware bunun sayesinde linki bilinen loginin yazılsa bile girilemiyor
router.route("/login").get(redirectMiddleware,pageController.getLoginPage);


module.exports=router