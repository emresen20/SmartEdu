const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userID);
    if (!user) return res.redirect("/login"); // Absolute path için başına '/' ekledik
    next();
  } catch (error) {
    console.error("Error finding user:", error);
    res.redirect("/login");
  }
};