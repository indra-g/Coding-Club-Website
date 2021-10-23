const mongoose = require('mongoose')

const ContributeSchema = new mongoose.Schema({
    Contributor:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
    },
    Acceptor:{
        type:String,
        default:'',
    },
    Content:{
        type:String,
        required:true,
    }
});
const ContributeScripts = module.exports=mongoose.model('Contributed-Scripts',ContributeSchema);