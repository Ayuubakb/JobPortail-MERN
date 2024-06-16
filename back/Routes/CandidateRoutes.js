const express=require("express")
const { getOffers,getCompanies,apply, getApplications } = require("../Controllers/CandidateControllers")
const Router=express.Router()

Router.post('/offers',getOffers)
Router.post('/companies',getCompanies)
Router.get("/apply/:id",apply)
Router.get("/applications",getApplications)

module.exports=Router