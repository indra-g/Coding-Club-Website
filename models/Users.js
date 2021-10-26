const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    Email:{
        type:String,
        required:true,
    },
    Name:{
        type:String,
        required:true,
    },
    Username:{
        type:String,
        required:true,
    },
    isJs:{
        type:Boolean,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    }
});

var Users = module.exports = mongoose.model('Users',UserSchema);