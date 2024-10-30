const express = require("express");
const mongoose= require('mongoose')
const pageRoute=require('./routes/pageRoute')
const courseRoute=require('./routes/courseRoute')

const app = express();

//Coonect DB
mongoose.connect('mongodb://localhost/smartedu-db')
  .then(() => console.log('Connected!'));



//Temlate Engine 
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"))



//Routes
app.use("/",pageRoute );
app.use("/course",courseRoute );


const port = 3000;
app.listen(port, () => {
  console.log("App started on port ");
});
