const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();
router.route("/").post(courseController.createCourse); // localhost/courses yapılacak post request çalıştırır
router.route('/').get(courseController.getAllCourses)

module.exports = router;
