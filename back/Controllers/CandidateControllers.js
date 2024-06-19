
const Employer=require("../Models/Employer")
const mongoose=require("mongoose")
const Candidate = require("../Models/Candidate")

const getOffers=async(req,res)=>{
    const filter=req.body
    const aggregate=Employer.aggregate().match({'companyName':{$exists:true}}).unwind("$offers").match({"offers.archived":false})
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
            return {...inf,appDate:acc.demands.date,status:acc.demands.status,interviewDate:acc.demands.interviewDate}
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

const getProfile=async(req,res)=>{
    let idUser="";
    if(req.session.Auth && req.session.Auth.firstName)
        idUser=req.session.Auth.id
    else if(req.params.id)
        idUser=new mongoose.Types.ObjectId(req.params.id)
    if(idUser!==""){
        const profile=await Candidate.findOne({_id:idUser})
        const stats=await Candidate.aggregate([{$match:{"_id":idUser}},{$unwind:"$demands"},{$group:{_id:'$demands.status',count:{$sum:1}}}]).exec()
        const objct={
            lastName:profile.firstName,
            firstName:profile.lastName,
            login:profile.login,
            number:profile.number,
            picture:profile.picture,
            cv:profile.cv,
            emailReceive:profile.emailReceive,
            field:profile.field,
            interviewCount:stats.find((e)=>{return e._id===1}).count,
            aplicationCount:stats.find((e)=>{return e._id===2}).count,
            refusedCount:stats.find((e)=>{return e._id===0}).count
        }
        res.status(200).json(objct)
    }
    else
        res.status(403).json({msg:'Not Allowed'})
}
const updateProfile=async(req,res)=>{
    if(req.session.Auth && req.session.Auth.firstName){
        const id=req.session.Auth.id
        let pic;
        let cv;
        pic=req.files.picture?req.files.picture[0].filename:''
        cv=req.files.cv?req.files.cv[0].filename:''
        let objc={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            login:req.body.login,
            emailReceive:req.body.emailReceive,
            field:req.body.field,
        }
        if(pic!=='')
            objc={...objc,picture:pic}
        if(cv!=='')
            objc={...objc,cv:cv}
        const result=await Candidate.updateOne({'_id':id},{$set:objc})
        res.json({msg:"Updated"})
    }else
        res.status(403).json({msg:"Not Allowed"})
}
module.exports={
    getOffers,
    getCompanies,
    apply,
    getApplications,
    getProfile,
    updateProfile
}