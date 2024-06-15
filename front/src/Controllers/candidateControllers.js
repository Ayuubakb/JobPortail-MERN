const basicTemplate=async(path,objct,setFun)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Candidate/"+path,{
        method:"POST",
        credentials:'include',
        body:JSON.stringify(objct),
        headers:{
            "Content-Type":"application/json"
        }
    })
    await response.json().then((res)=>{
        setFun(res)
    })
}

const candidateBasicGet=async(path,id,setFun)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Candidate/"+path+"/"+id,{
        method:"GET",
        credentials:"include"
    })
    await response.json().then((res)=>{
        setFun(res.msg)
    })
}

module.exports={
    basicTemplate,
    candidateBasicGet
}