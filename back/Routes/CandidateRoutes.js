const express=require("express")
const { getOffers,getCompanies,apply } = require("../Controllers/CandidateControllers")
const Router=express.Router()

Router.post('/offers',getOffers)
Router.post('/companies',getCompanies)
Router.get("/apply/:id",apply)

module.exports=Router