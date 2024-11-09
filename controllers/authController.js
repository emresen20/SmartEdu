const User = require("../models/User");
const bcrypt= require('bcrypt');
const {  validationResult } = require('express-validator');
const Category=require('../models/Category');
const Course = require("../models/Course");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login')
  } catch(error) {
    const errors = validationResult(req);
    
    for(let i=0; i<errors.array().length; i++){
      req.flash("error",`${errors.array()[i].msg}`);
      console.log(errors.array()[i].msg);
    }

    res.status(400).redirect('/register')
  }
};

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Kullanıcıyı email ile bul
      const user = await User.findOne({ email: email });
      if (user) {
        // Şifreyi karşılaştır
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
          // Kullanıcı girişi başarılı
          req.session.userID = user._id;
          res.status(200).redirect('/users/dashboard')

        } else {
          // Şifre yanlış
          req.flash("error","Your Password is not true");
          res.status(400).redirect('/login')
        }
      } else {
        // Kullanıcı bulunamadı
        req.flash("error","User is not exist!");
        res.status(400).redirect('/login')
      }
    } catch (error) {
      res.status(400).json({
        status: "failed",
        error,
      });
    }
  };
  

  exports.logoutUser=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
  }

  exports.getDashboardPage =  async (req, res) => {
     const  user=await User.findOne({_id:req.session.userID}).populate('courses')
     const categories= await Category.find();
     const courses= await Course.find({user:req.session.userID}) // burada her öğretmenin kendi kursunda getirmesini sağladık

    res.status(200).render("dashboard", {
      page_name: "dashboard",
      user:user,
      categories:categories,
      courses
    });
  };