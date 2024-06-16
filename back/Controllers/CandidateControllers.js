const session = require("express-session")
const { industries, position } = require("../../front/src/Controllers/utils")
const Employer=require("../Models/Employer")
const mongoose=require("mongoose")
const Candidate = require("../Models/Candidate")

const getOffers=async(req,res)=>{
    const filter=req.body
    const aggregate=Employer.aggregate().match({'companyName':{$exists:true}}).unwind("$offers")
    let objct;
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

const apply=async(req,res)=>{
    if(req.session.Auth && req.session.Auth.firstName){
        const idUser=req.session.Auth.id
        const idPost=req.params.id
        const checkApplied=await Candidate.aggregate().match({"_id":idUser}).unwind("$demands").match({"demands.IdOffer":new mongoose.Types.ObjectId(idPost)}).count("demandsCount").exec()
        if(checkApplied.length===0 || checkApplied[0].demandsCount===0){
            await Candidate.updateOne({"_id":idUser},{$push:{"demands":{"IdOffer":idPost}}}).then((result)=>{
                if(result.modifiedCount!==0)
                    res.status(200).json({msg:"Application Sent"})
            })
        }else
            res.status(400).json({msg:"You Have Already Applied For This Position"}) 
    }else
        res.status(403).json({msg:"Not Connected"})
}

const getApplications=async(req,res)=>{
    const getInf=async(acc)=>{
        const inf=await Employer.aggregate()
        .unwind("$offers")
        .match({"offers.id":acc.demands.IdOffer})
        .project({
          companyName:"$companyName",
          field:'$offers.field',
          title:'$offers.title',
          IdOffer:"$offers.id",
        }).exec()
        return inf[0]
    }
    if(req.session.Auth && req.session.Auth.firstName){
        const idUser=req.session.Auth.id
        let objct={accepted:[],refused:[],pending:[]}
        const accepted=await Candidate.aggregate().match({"_id":idUser}).unwind("$demands").match({"demands.status":1}).exec()
        const accMap=accepted.map(async(acc)=>{
            const inf=await getInf(acc)
            return {...inf,appDate:acc.demands.date,status:acc.demands.status,interviewDate:''}
        })
        const accArray=await Promise.all(accMap)
        objct["accepted"]=accArray

        const refused=await Candidate.aggregate().match({"_id":idUser}).unwind("$demands").match({"demands.status":0}).exec()
        const refMap=refused.map(async(acc)=>{
            const inf=await getInf(acc)
            return {...inf,appDate:acc.demands.date,status:acc.demands.status,interviewDate:''}
        })
        const refArray=await Promise.all(refMap)
        objct["refused"]=refArray

        const pending=await Candidate.aggregate().match({"_id":idUser}).unwind("$demands").match({"demands.status":2}).exec()
        const penMap=pending.map(async(acc)=>{
            const inf=await getInf(acc)
            return {...inf,appDate:acc.demands.date,status:acc.demands.status,interviewDate:''}
        })
        const penArray=await Promise.all(penMap)
        objct["pending"]=penArray

        res.status(200).json(objct)
    }else
        res.status(403).json({msg:"Not Connected"})
}
module.exports={
    getOffers,
    getCompanies,
    apply,
    getApplications
}