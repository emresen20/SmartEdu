const express = require("express");
const mongoose= require('mongoose')
const pageRoute=require('./routes/pageRoute')
const courseRoute=require('./routes/courseRoute');
const categoryRoute=require('./routes/categoryRoute');
const userRoute=require('./routes/userRoute');
const session=require('express-session')

const app = express();

//Coonect DB
mongoose.connect('mongodb://localhost/smartedu-db')
  .then(() => console.log('Connected!'));



//Temlate Engine 
app.set("view engine", "ejs");

//Global Variable

global.userIN= null; // global olarak bütün heryerde gözükmesini sağladık

//Middlewares

app.use(express.static("public"))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
})) 



//Routes
app.use('*',(req,res,next)=>{ // burada bütün değişkelnlere bunu yollamış oldulk
  userIN=req.session.userID; // giriş çıkış işlemlerinde hangi kullanıcı girdi çıktı authta userId yi düzenledik
  next();
})
app.use("/",pageRoute );
app.use("/courses",courseRoute );
app.use("/categories",categoryRoute)
app.use("/users",userRoute)


const port = 3000;
app.listen(port, () => {
  console.log("App started on port ");
});
