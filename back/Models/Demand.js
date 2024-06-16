const mongoose=require('mongoose')

const demandSchema=new mongoose.Schema({
    IdOffer:{
        type:mongoose.Schema.Types.ObjectId,
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
    interviewDate:{
        type:Date,
        default:new Date()
    }
})

module.exports=demandSchema