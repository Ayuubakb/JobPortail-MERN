const express=require("express")
const { addOffer, deleteOffer } = require("../Controllers/EmployerControllers")
const Router=express.Router()

Router.post('/addOffer',addOffer)
Router.delete('/deleteOffer/:id',deleteOffer)

module.exports=Router