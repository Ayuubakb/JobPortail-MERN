const express=require("express")
const { addOffer, deleteOffer,getOffer, getDemands, acceptOffer, refuseOffer } = require("../Controllers/EmployerControllers")
const Router=express.Router()

Router.post('/addOffer',addOffer)
Router.delete('/deleteOffer/:id',deleteOffer)
Router.get("/getOffer/:id",getOffer)
Router.post("/demands",getDemands)
Router.post("/acceptOffer",acceptOffer)
Router.get("/refuseOffer/:id",refuseOffer)

module.exports=Router