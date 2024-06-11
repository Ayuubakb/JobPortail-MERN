const express=require("express")
const { getOffers,getCompanies } = require("../Controllers/CandidateControllers")
const Router=express.Router()

Router.post('/offers',getOffers)
Router.post('/companies',getCompanies)

module.exports=Router