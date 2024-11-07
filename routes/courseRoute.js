const express = require("express");
const courseController = require("../controllers/courseController");
const roleMiddleware= require('../middlewares/roleMiddleware')

const router = express.Router();
router.route("/").post(roleMiddleware(["teacher","admin"]), courseController.createCourse); // localhost/courses yapılacak post request çalıştırır
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourses);
router.route('/enroll').post(courseController.enrollCourse);

module.exports = router;
