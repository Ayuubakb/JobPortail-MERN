const { industries, position } = require("../../front/src/Controllers/utils")
const Employer=require("../Models/Employer")
const mongoose=require("mongoose")

const getOffers=async(req,res)=>{
    const filter=req.body
    const aggregate=Employer.aggregate().match({'companyName':{$exists:true}}).unwind("$offers")
    let objct
    if(!filter.home){
        if(req.session.Auth && req.session.Auth.companyName)
            aggregate.append([{$match:{'_id':req.session.Auth.id}}])
        if(filter.industries!=="")
            aggregate.append([{$match:{'offers.field':filter.industries}}])
        if(filter.position!=="")
            aggregate.append([{$match:{'offers.position':filter.position}}])
        if(filter.time!=="")
            aggregate.append([{$match:{'offers.time':filter.time}}])
        if(filter.presence!=="")
            aggregate.append([{$match:{'offers.presence':filter.presence}}])
        aggregate.append({$project:{
            id:"$offers.id",
            position:"$offers.position",
            title:"$offers.title",
            presence:"$offers.presence",
            field:"$offers.field",
            time:"$offers.time",
            postDate:"$offers.postDate",
            num:"$offers.numDemands"
        }})
        const result=await aggregate.exec()
        objct={
            num:result.length,
            offers:result
        }
    }else{
        const result=await aggregate.exec()
        objct={
            num:result.length
        }
    }
    res.status(200).json(objct)
}

const getCompanies=async(req,res)=>{
    const filter=req.body
    const pipeline=Employer.aggregate([{$match:{"companyName":{$exists:true}}}])
    if(filter.industries){
        if(filter.industries!=='')
            pipeline.append({$match:{"field":filter.industries}})
    }else if(filter.home)
            pipeline.append({$sort:{"numEmployees":-1}},{$limit:5})
    pipeline.append({$project:{"companyName":1,"picture":1,"field":1,"numEmployees":1,"location":1}})
    const result=await pipeline.exec()
    const objct={
        num:result.length,
        companies:result
    }
    res.status(200).json(objct)
}

module.exports={
    getOffers,
    getCompanies
}