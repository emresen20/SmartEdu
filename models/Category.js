const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify')

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
 
  slug:{ // id kısmı gözükmesin isim olsun diye mongıoya kaydetmeden aşağıdaki fonksiyonla oluşturduk
    type:String,
    unique:true
  }
});

CategorySchema.pre("validate", function (next) {
    this.slug = slugify(this.name, {
      lower: true,   // Küçük harfe çevirir
      strict: true,  // Boşlukları ve özel karakterleri kaldırır
    });
    next();
  });

const Category=mongoose.model('Category',CategorySchema);

module.exports=Category;
