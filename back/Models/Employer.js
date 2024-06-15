const mongoose=require("mongoose");
const offer= require("./Offer")

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
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
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
        type:Number
    },
    emailReceive:{
        type:Boolean
    },
    offers:[offer]
})

module.exports=mongoose.model("Employer",employerSchema,"User")