const mongoose=require('mongoose')

const demandSchema=new mongoose.Schema({
    IdOffer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'offer',
        require:true
    },
    date:{
        type:Date,
        default:new Date()
    },
    status:{
        type:Number,
        default:2
    },
    cv:{
        type:String
    }
})

module.exports=demandSchema