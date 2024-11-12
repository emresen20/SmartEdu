const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();
router.route("/").post(categoryController.createCategory); // localhost/categories yapılacak post request çalıştırır
router.route("/:id").delete(categoryController.deleteCategory)

module.exports = router;
