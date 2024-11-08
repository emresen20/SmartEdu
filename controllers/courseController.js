const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { name } = require("ejs");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description:req.body.description,
      category:req.body.category,
      user: req.session.userID
    });

    res.status(201).redirect('/courses');
  } catch(error) {
    res.status(400).json({
      status: "faild",
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const query = req.query.search;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};

    if (categorySlug) {
      
      if (category) {
        filter = { category: category._id }; // Kategoriyi ID ile filtreler
      }
    }

    if(query){
      filter={name:query}
    }

    if (!query && !categorySlug){
      filter.name= "",
      filter.category= null
    }


    const courses = await Course.find({
      $or:[
        { name: {$regex: '.*' + filter.name + '.*' , $options:'i'}},
        {category:filter.category}
      ]
    }).sort({ createdAt: -1 }).populate('user'); // Filtreyi burada uygular
    const categories = await Category.find(); // Tüm kategorileri getirir

    res.status(200).render("courses", {
      courses: courses,
      page_name: "courses",
      categories: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};


// exports.getAllCourses = async (req, res) => {
//     try {
//       const categorySlug= req.query.categories;
//       const category= await Category.findOne({slug:categorySlug})

//       let filter={};
//       if(categorySlug){
//         filter= {category:category._id}
//       }

//       const courses = await Course.find().sort({ createdAt: -1 });
//       const categories = await Category.find(filter);
  
//       res.status(200).render('courses',{
//         courses:courses,
//         page_name: "courses",
//         categories:categories
//       })
//     } catch(error) {
//       res.status(400).json({
//         status: "faild",
//         error,
//       });
//     }
//   };

  exports.getCourses = async (req, res) => {
    try {
      const course = await Course.findOne({slug:req.params.slug}).populate('user'); // populate ederek user bilgilerinmi de almış olduk
      const user = await User.findById(req.session.userID)
      const categories = await Category.find();
      res.status(200).render('course-single',{
        course:course,
        page_name: "courses",
        user,
        categories
      })
    } catch(error) {
      res.status(400).json({
        status: "faild",
        error,
      });
    }
  };

  exports.enrollCourse = async (req, res) => {
    try {
    const user= await User.findById(req.session.userID);
    await user.courses.push({_id:req.body.course_id})
    await user.save();
  
      res.status(200).redirect('/users/dashboard')
    } catch(error) {
      res.status(400).json({
        status: "faild",
        error,
      });
    }
  };

  exports.releaseCourse = async (req, res) => {
    try {
    const user= await User.findById(req.session.userID);
    await user.courses.pull({_id:req.body.course_id})
    await user.save();
  
      res.status(200).redirect('/users/dashboard')
    } catch(error) {
      res.status(400).json({
        status: "faild",
        error,
      });
    }
  };


