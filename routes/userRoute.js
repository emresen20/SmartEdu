const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware=require('../middlewares/authMiddleware');
const { body, validationResult } = require('express-validator');
const User=require('../models/User')

const router = express.Router();
router.route("/signup").post([
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),
    body('email').not().isEmail().withMessage('Please Enter Your Valid Email')
    .custom((userEmail)=>{ // user emailin içi bodydaki email ile dolar
        return User.findOne({email:userEmail}).then(user=>{
            if(user){
                return Promise.reject('Email is alreadt exits!')
            }
        })
    }),


    body('password').not().isEmpty().withMessage('Please Enter A Password')
]
,authController.createUser); // localhost/users/signup yapılacak post request çalıştırır
router.route("/login").post(authController.loginUser); //localhost/users/login yapılacak post işlemi login ejs de actionda
router.route("/logout").get(authController.logoutUser)
router.route("/dashboard").get(authMiddleware, authController.getDashboardPage) //localhosty/users/dashboard
router.route("/:id").delete(authController.deleteUser)

module.exports = router;
