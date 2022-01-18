const mongoose =require('mongoose')

const EventSchema = mongoose.Schema({
    PresenterName :{
        type:String,
        required:true,
    },
    EventTitle :{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    Date:{
        type: String,
        required:true,
    },
    EventLink : {
        type:String,
        required:true,
    },
    ImageUrl : {
        type:String,
        required:true,
    }
});

let Events = module.exports = mongoose.model('Events',EventSchema);
