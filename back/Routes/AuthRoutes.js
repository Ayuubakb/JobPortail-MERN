const express=require("express")
const { signup,login,logout, verifyConnected } = require("../Controllers/AuthControllers")
const Route=express.Router()

Route.post("/signup",signup)
Route.post("/login",login)
Route.delete("/logout",logout)
Route.get("/check",verifyConnected)

module.exports=Route