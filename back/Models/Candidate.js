const mongoose=require("mongoose");
const demand= require("./Demand")

const candidateSchema=new mongoose.Schema({
    login:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    picture:{
        type:String
    },
    field:{
        type:String,
        enum:["Technology","Healthcare","Finance","Retail","Energy","Automotive","Telecommunications","Consumer Goods","Aerospace and Defense","Media and Entertainment"]
    },
    number:{
        type:String,
        max:10
    },
    emailReceive:{
        type:Boolean
    },
    demands:[demand]
})

module.exports=mongoose.model("Candidate",candidateSchema,"User")