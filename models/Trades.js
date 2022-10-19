
const mongoose = require('mongoose');


const TradeSchema =new mongoose.Schema({


    tiker:{type:String,required:true},
    description:{type:String,required:true},
    buy:{type:String,required:true},
    sell:{type:String,required:true},
    date:{type:String,required:true},
    position:{type:String,required:true},
    quantity:{type:String,required:true},
    dollars:{type:String,required:true},
    gain:{type:String,required:true},
    success:{type:Boolean,required:true}

})

const TradeModel =mongoose.model('trades',TradeSchema);

module.exports=TradeModel;