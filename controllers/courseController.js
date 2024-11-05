const Course = require("../models/Course");
const Category = require("../models/Category");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

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
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};

    if (categorySlug) {
      
      if (category) {
        filter = { category: category._id }; // Kategoriyi ID ile filtreler
      }
    }

    const courses = await Course.find(filter).sort({ createdAt: -1 }); // Filtreyi burada uygular
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
      const course = await Course.findOne({slug:req.params.slug});
  
      res.status(200).render('course-single',{
        course:course,
        page_name: "courses",
      })
    } catch(error) {
      res.status(400).json({
        status: "faild",
        error,
      });
    }
  };

