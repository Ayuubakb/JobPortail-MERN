const Offer = require("../Models/Offer")
const Employer=require("../Models/Employer")
const mongoose=require("mongoose")
const Candidate = require("../Models/Candidate")

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
    await Employer.updateOne({"_id":req.session.Auth.id,"offers.id":id},{$set:{"offers.$.archived":true}}).then((result)=>{
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
                companyName:data.companyName,
                archived:data.offers.archived
            }
            res.status(404).json(objct)
        }else{
            res.status(404).json({msg:"Offer not found"})
        }
    })
}

const getDemands=async(req,res)=>{
    const filter=req.body
    if(req.session.Auth && req.session.Auth.companyName){
        const offers=await Employer.aggregate().match({"_id":req.session.Auth.id}).unwind("$offers")
                                .project({
                                    id:"$offers.id",
                                    title:"$offers.title",
                                    field:"$offers.field"
                                }).exec()
        let ids=[]
        for(let offer of offers)
            ids.push(offer.id)
        const pipeline1=Candidate.aggregate()
                        .unwind("$demands")
                        .match({"demands.status":parseInt(filter.status)})
        if(filter.offer!=="")
            pipeline1.append([{$match:{"demands.IdOffer":new mongoose.Types.ObjectId(filter.offer)}}])
        else
            pipeline1.append([{$match:{"demands.IdOffer":{$in:ids}}}])
        const demands=await pipeline1.project({
            idUser:"$_id",
            firstName:"$firstName",
            lastName:"$lastName",
            appDate:"$demands.date",
            idDemand:"$demands._id",
            IdOffer:"$demands.IdOffer",
            status:"$demands.status",
            interviewDate:"$demands.interviewDate"
        }).exec()
        let objct=[]
        for(let demand of demands){
            for(let offer of offers){ 
                if(offer.id.toString()===demand.IdOffer.toString())
                    objct.push({...demand,title:offer.title,field:offer.field})
            }
        }
        res.status(200).json({msg:{distanct:offers,arr:objct}})
    }else
        res.status(403).json({msg:"Not Connected"})
}
const acceptOffer=async(req,res)=>{
    console.log(req.body);
    const {interviewDate,idDemand}=req.body
    const result=await Candidate.updateOne({"demands._id":new mongoose.Types.ObjectId(idDemand)},{$set:{"demands.$.status":1,"demands.$.interviewDate":interviewDate}})
    if(result.modifiedCount!==0)
        res.status(200).json({msg:true})
}
const refuseOffer=async(req,res)=>{
    const idDemand=req.params.id
    const result=await Candidate.updateOne({"demands._id":new mongoose.Types.ObjectId(idDemand)},{$set:{"demands.$.status":0}})
    if(result.modifiedCount!==0)
        res.status(200).json({msg:true})
}
const getProfile=async(req,res)=>{
    let idUser="";
    if(req.session.Auth && req.session.Auth.companyName)
        idUser=req.session.Auth.id
    else if(req.params.id)
        idUser=new mongoose.Types.ObjectId(req.params.id)
    if(idUser!==""){
        const profile=await Employer.findOne({_id:idUser})
        const stats=await Employer.aggregate([{$match:{"_id":idUser}},{$unwind:"$offers"},{$group:{_id:'$offers.archived',count:{$sum:1}}}]).exec()
        const objct={
            companyName:profile.companyName,
            login:profile.login,
            picture:profile.picture,
            numEmployees:profile.numEmployees,
            emailReceive:profile.emailReceive,
            field:profile.field,
            location:profile.location,
            offers:profile.offers,
            activeCount:stats.find((e)=>{return e._id===true})?stats.find((e)=>{return e._id===true}).count:0,
            totalCount:profile.offers.length
        }
        res.status(200).json(objct)
    }
    else
        res.status(403).json({msg:'Not Allowed'})
}
const updateProfile=async(req,res)=>{
    if(req.session.Auth && req.session.Auth.companyName){
        const id=req.session.Auth.id
        let pic;
        if(req.file){
            const ext=req.file.filename.split('.')[1]
            console.log(ext);
            pic=`${req.session.Auth.companyName}.${ext}`
        }else
            pic=''
        let objc={
            companyName:req.body.companyName,
            login:req.body.login,
            emailReceive:req.body.emailReceive,
            field:req.body.field,
            numEmployees:req.body.numEmployees,
        }
        if(pic!=='')
            objc={...objc,picture:pic}
        const result=await Employer.updateOne({'_id':id},{$set:objc})
        res.json({msg:"Updated"})
    }else
        res.status(403).json({msg:"Not Allowed"})
}
module.exports={
    addOffer,
    deleteOffer,
    getOffer,
    getDemands,
    acceptOffer,
    refuseOffer,
    getProfile,
    updateProfile
}