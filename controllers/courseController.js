const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      status: "success",
      course: course,
    });
  } catch(error) {
    res.status(400).json({
      status: "faild",
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
    try {
      const courses = await Course.find().sort({ createdAt: -1 });
  
      res.status(200).render('courses',{
        courses:courses,
        page_name: "courses",
      })
    } catch(error) {
      res.status(400).json({
        status: "faild",
        error,
      });
    }
  };
