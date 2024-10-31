const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();
router.route("/signup").post(authController.createUser); // localhost/users/signup yapılacak post request çalıştırır


module.exports = router;
