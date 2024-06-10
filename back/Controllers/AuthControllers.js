const Candidate=require("../Models/Candidate")
const Employer=require("../Models/Employer")
const bcrypt=require("bcrypt")

const verifyConnected=(req,res,next)=>{
    if(req.session.Auth===undefined){
        res.status(200).json({type:"normal",id:0})
    }else if(req.session.Auth.companyName){
        res.status(200).json({type:"employer",id:req.session.Auth.id})
    }else if(req.session.Auth.firstName){
        res.status(200).json({type:"candidate",id:req.session.Auth.id})
    }
}
const verifyCandidate=(req,res,next)=>{
    if(req.session.Auth!==undefined){   
        if(req.session.Auth.firstName)
            next()
        else
            res.status(403).json({msg:"forbiden"})
    }
    res.status(403).json({msg:"forbiden"})
}
const verifyEmpl=(req,res,next)=>{
    if(req.session.Auth!==undefined){   
        if(req.session.Auth.companyName)
            next()
        else
            res.status(403).json({msg:"forbiden"})
    }
    res.status(403).json({msg:"forbiden"})
}
const signup=async(req,res)=>{
    const inputs=req.body
    const saved=false;
    let existingUser=false;
    await Candidate.findOne({login:inputs.login}).then((user)=>{
        console.log(user);
        if(user)
            existingUser=true
    })
    if(!existingUser){
        inputs.password=await bcrypt.hash(inputs.password,10)
        let newUser;
        if(req.body.companyName)
             newUser=new Employer(inputs)
        else if(req.body.firstName)
             newUser=new Candidate(inputs)
        await newUser.save().then((savedDocument)=>{
            if(inputs.login===savedDocument.login)
                res.status(200).json({msg:"SignedUp Succesfuly"})
            else
                res.status(500).json({msg:"An Error Occured while saving data"})
        },()=>{
            res.status(500).json({msg:"An Error Occured while saving data"})
        })
    }else{
        console.log(" exist");
        res.status(400).json("User Already Exists")
    }
}

const login=async(req,res)=>{
    const email=req.body.login;
    const password=req.body.password;
    let found=false
    await Candidate.findOne({login:email}).then(async(candid)=>{
        if(candid.firstName!=undefined){
            found=true
            const foundPassword=candid.password
            const isPassword=await bcrypt.compare(password,foundPassword)
            if(isPassword){
                const objct={
                    id:candid._id,
                    login:candid.login,
                    firstName:candid.firstName,
                    lastName:candid.lastName,
                    field:candid.field,
                    emailReveive:candid.emailReceive
                }
                req.session.Auth=objct;
                req.session.Auth?res.status(200).json({msg:"candidate"}):res.status(500).json({msg:"Session Error"})
            }else
                res.status(400).json({msg:"Incorrect Password"})
        }
    })
    if(!found){
        await Employer.findOne({login:email}).then(async(candid)=>{
            if(candid.companyName!=undefined){
                found=true
                const foundPassword=candid.password
                const isPassword=await bcrypt.compare(password,foundPassword)
                if(isPassword){
                    const objct={
                        id:candid._id,
                        login:candid.login,
                        companyName:candid.companyName,
                        field:candid.field,
                        emailReceive:candid.emailReceive
                    }
                    req.session.Auth=objct;
                    req.session.Auth?res.status(200).json({msg:"employer"}):res.status(500).json({msg:"Session Error"})
                }else
                    res.status(400).json({msg:"Incorrect Password"})
            }
        })
    }
    if(!found)
        res.status(404).json({msg:"User Not Found"})
}

const logout=(req,res)=>{
    req.session.destroy((err)=>{
        res.json({msg:true})
    })
}

module.exports={
    verifyEmpl,
    verifyCandidate,
    signup,
    login,
    logout,
    verifyConnected
}