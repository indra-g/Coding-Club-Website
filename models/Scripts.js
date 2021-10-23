const mongoose =require('mongoose')

const ScriptsSchema = new mongoose.Schema({
    Contributor:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Title:{
        type:String,
        required:true,
    },
    Content:{
        type:String,
        required:true,
    }
});
var Scripts = module.exports = mongoose.model('Scripts',ScriptsSchema);