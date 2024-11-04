const User = require("../models/User");
const bcrypt= require('bcrypt')

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      user:user
    });
  } catch(error) {
    res.status(400).json({
      status: "faild",
      error,
    });
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
          res.status(200).redirect('/')

        } else {
          // Şifre yanlış
          res.status(401).send("Incorrect password");
        }
      } else {
        // Kullanıcı bulunamadı
        res.status(404).send("User not found");
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