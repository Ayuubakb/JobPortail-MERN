const express=require("express")
const { addOffer, deleteOffer,getOffer } = require("../Controllers/EmployerControllers")
const Router=express.Router()

Router.post('/addOffer',addOffer)
Router.delete('/deleteOffer/:id',deleteOffer)
Router.get("/getOffer/:id",getOffer)

module.exports=Router