const express=require("express")
const { getOffers,getCompanies,apply, getApplications, getProfile, updateProfile } = require("../Controllers/CandidateControllers")
const Router=express.Router()
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload=multer({
    storage:storage
})
Router.post('/offers',getOffers)
Router.post('/companies',getCompanies)
Router.get("/apply/:id",apply)
Router.get("/applications",getApplications)
Router.get("/getProfile/:id",getProfile)
Router.get("/getProfile",getProfile)
Router.post("/updateProfile",upload.fields([{name:"picture",maxCount:1},{name:"cv",maxCount:1}]),updateProfile)

module.exports=Router