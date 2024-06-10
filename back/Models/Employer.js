const mongoose=require("mongoose");
const demand= require("./Demand")

const employerSchema=new mongoose.Schema({
    login:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    companyName:{
        type:String
    },
    location:{
        type:String
    },
    picture:{
        type:String,
        default:"defaultCompany.jpg"
    },
    field:{
        type:String,
        enum:["Technology","Healthcare","Finance","Retail","Energy","Automotive","Telecommunications","Consumer Goods","Aerospace and Defense","Media and Entertainment"]
    },
    numEmployees:{
        type:String
    },
    emailReceive:{
        type:Boolean
    },
    offers:[demand]
})

module.exports=mongoose.model("Employer",employerSchema,"User")