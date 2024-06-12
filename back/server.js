const express= require('express');
const session = require('express-session');
const app=express();
const mongoose=require('mongoose')
const MongoDbStore=require("connect-mongodb-session")(session)
const cors=require("cors");
const authRoute=require("./Routes/AuthRoutes")
const canRoute=require('./Routes/CandidateRoutes')
const empRoute=require('./Routes/EmployerRoutes')

mongoose.connect("mongodb://localhost:27017/jobPortail").then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("An Error Has Occured : "+err);
})

const storage=new MongoDbStore({
    uri:"mongodb://localhost:27017/jobPortail",
    collection:"mySession"
})
app.use(session({
    secret:"jobporatilsession",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60*3,
    },
    store:storage
}))

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    methods:["GET","PUT","POST","DELETE"]
}
))

app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use("/Uploads",express.static("Uploads"))

app.use("/Authentification",authRoute)
app.use("/Candidate",canRoute)
app.use("/Employer",empRoute)

app.listen(9090,()=> console.log("listening on port 9090"))