const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();
router.route("/").post(courseController.createCourse); // localhost/courses yapılacak post request çalıştırır

module.exports = router;
