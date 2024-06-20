const express=require("express")
const { addOffer, deleteOffer,getOffer, getDemands, acceptOffer, refuseOffer, getProfile, updateProfile } = require("../Controllers/EmployerControllers")
const Router=express.Router()
const multer=require("multer")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'Uploads')
    },
    filename:function(req,file,cb){
        const suff=file.originalname.split('.')[1]
        cb(null,`${req.session.Auth.companyName}.${suff}`)
    }
})
const upload=multer({storage:storage})

Router.post('/addOffer',addOffer)
Router.delete('/deleteOffer/:id',deleteOffer)
Router.get("/getOffer/:id",getOffer)
Router.post("/demands",getDemands)
Router.post("/acceptOffer",acceptOffer)
Router.get("/refuseOffer/:id",refuseOffer)
Router.get("/getProfile/:id",getProfile)
Router.get("/getProfile",getProfile)
Router.post("/updateProfile",upload.single('picture'),updateProfile)

module.exports=Router