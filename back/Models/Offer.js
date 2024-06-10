const mongoose=require('mongoose')
const demand=require('./Demand')

const offerSchema=new mongoose.Schema({
    title:{
        type:String
    },
    postDate:{
        type:Date,
        default:new Date()
    },
    expireDate:{
        type:Date,
        default:new Date()
    },
    field:{
        type:String,
        enum:["Technology","Healthcare","Finance","Retail","Energy","Automotive","Telecommunications","Consumer Goods","Aerospace and Defense","Media and Entertainment"]
    },
    description:{
        type:String
    },
    demands:[demand],
    position:{
        type:String,
        enum:["Permanent","Temporary","Internship"]
    },
    time:{
        type:String,
        enum:["Full-Time","Part-Time"]
    },
    presence:{
        type:String,
        enum:["Remote","Hybrid","OnSite"]
    }
})

module.exports=offerSchema