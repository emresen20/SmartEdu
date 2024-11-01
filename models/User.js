const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt= require('bcrypt')


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password:{
    type:String,
    require:true
  }

});

UserSchema.pre('save',function(next){
    const user= this; // buradaki this o zamanki kullanıcıyı göster anlamında    
    bcrypt.hash(user.password,10, (error,hash)=>{
        user.password=hash;
        next();
    })
   
  })

const User=mongoose.model('User',UserSchema);
module.exports=User;
