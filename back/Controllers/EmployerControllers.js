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

const getOffer=async(req,res)=>{
    const id=req.params.id
    await Employer.aggregate().unwind("$offers").match({"offers.id": new mongoose.Types.ObjectId(id)}).then((result)=>{
        if(result.length==1){
            const data=result[0]
            let postDate=new Date(data.offers.postDate)
            postDate=`${postDate.getDate()}/${postDate.getMonth()+1}/${postDate.getFullYear()}`
            let expireDate=new Date(data.offers.expireDate)
            expireDate=`${expireDate.getDate()}/${expireDate.getMonth()+1}/${expireDate.getFullYear()}`
            const objct={
                idCom:data._id,
                title:data.offers.title,
                picture:data.picture,
                postDate:postDate,
                expireDate:expireDate,
                field:data.offers.field,
                description:data.offers.description,
                position:data.offers.position,
                time:data.offers.time,
                presence:data.offers.presence,
                numDemands:data.offers.numDemands,
                companyName:data.companyName
            }
            res.status(404).json(objct)
        }else{
            res.status(404).json({msg:"Offer not found"})
        }
    })
}
module.exports={
    addOffer,
    deleteOffer,
    getOffer
}