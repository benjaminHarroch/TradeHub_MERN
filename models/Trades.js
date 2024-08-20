
const mongoose = require('mongoose');

//sticker: '',entries: '',exit: '',strategy: '',position: 'long',date: '',

const TradeSchema =new mongoose.Schema({

    sticker:{type:String,required:true},
    entries:{type:String,required:true},
    exit:{type:String,required:true},
    strategy:{type:String,required:true},
    date:{type:String,required:true},
    position:{type:String,required:true}
})

const TradeModel =mongoose.model('trades',TradeSchema);

module.exports=TradeModel;