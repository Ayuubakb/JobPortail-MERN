const Offer = require("../Models/Offer")
const Employer=require("../Models/Employer")
const mongoose=require("mongoose")

const addOffer=async(req,res)=>{
    let inputs=req.body
    inputs.id = new mongoose.Types.ObjectId()
    if(req.session.Auth && req.session.Auth.companyName){
        const id=req.session.Auth.id
        await Employer.updateOne({'_id':id},{$push:{"offers":inputs}}).then((result)=>{
            if(result.modifiedCount==1)
                res.status(200).json({msg:"Offer Added"})
            else
                res.status(404).json({msg:"A Problem Has Accured"})
        })

    }else
        res.status(403).json({msg:"You Are Not Connected"})
}

const deleteOffer=async(req,res)=>{
    const id=req.params.id
    await Employer.updateOne({"_id":req.session.Auth.id},{$pull:{"offers":{"id":{$eq:id}}}}).then((result)=>{
        if(result.modifiedCount===1)
            res.status(200).json({msg:true})
        else
        res.status(404).json({msg:false})
    }) 
}
module.exports={
    addOffer,
    deleteOffer
}