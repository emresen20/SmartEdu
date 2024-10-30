const express = require("express");
const { getAboutPage } = require("./controllers/pageController");
const app = express();
const pageRoute=require('./routes/pageRoute')

//Temlate Engine 
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"))



//Routes
app.use("/",pageRoute );


const port = 3000;
app.listen(port, () => {
  console.log("App started on port ");
});
