const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify')
const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  slug:{ // id kısmı gözükmesin isim olsun diye mongıoya kaydetmeden aşağıdaki fonksiyonla oluşturduk
    type:String,
    unique:true
  }
});

CourseSchema.pre('validate',function(next){
  this.slug= slugify(this.name,{
    lower:true, // küçük harfe çevir
    strict:true // boş karakterli halleder
  })
  next();
})

const Course=mongoose.model('Course',CourseSchema);
module.exports=Course;
