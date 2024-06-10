const express=require("express")
const { signup,login,logout, verifyConnected, checkExist } = require("../Controllers/AuthControllers")
const Route=express.Router()

Route.post("/checkExist",checkExist)
Route.post("/signup",signup)
Route.post("/login",login)
Route.delete("/logout",logout)
Route.get("/check",verifyConnected)

module.exports=Route