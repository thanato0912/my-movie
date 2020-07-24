const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//const moment = require("moment");
const jwt = require('jsonwebtoken');
const config = require('../config/key');

const userSchema = mongoose.Schema({
    firstname: {
        type:String,
        maxlength:50
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    gender: {
      type:String,
    },
    email: {
        type:String,
        trim:true,
        unique: 1
    },
    password: {
        type: String,
        minglength: 5
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
});

//only encrypt the given password when password is created or isModified
//otherwise, encrypted password will be encrypted again
userSchema.pre('save', function(next){
  var user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(config.saltRound, (err, salt) => {
      if(err) return next(err);
      bcrypt.hash(user.password, salt, (err, encrypted) => {
        if(err) return next(err);
        user.password = encrypted;
        next();
      });
    });
  }else {
    return next();
  }
});

userSchema.methods.validatePassword = function(givenPassword, cb)  {
  bcrypt.compare(givenPassword, this.password, (err, isMatch) => {
    if(err) return cb(err);
    return cb(null, isMatch);
  });
};

userSchema.methods.createWebToken = function(cb)  {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), config.tokenSecret);
  user.token = token;

  user.save(function (err, userData) {
    console.log(this.token);
    if(err) cb(err);
    else cb(null, userData);
  });

}

userSchema.statics.findByToken = function(token, cb) {
  var user = this;
  jwt.verify(token, config.tokenSecret, function(err, decode) {
    if(err) cb(err);
    else {
      user.findOne({"_id":decode, "token":token}, function(err, userInfo) {
        if(err)cb(err);
        else cb(null, userInfo);
      });
    }
  });
}


const User = mongoose.model('User', userSchema);

module.exports = { User }
