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

const candidateBasicGet=async(path,id,setFun,loginFun)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Candidate/"+path+"/"+id,{
        method:"GET",
        credentials:"include"
    })
    await response.json().then((res)=>{
        if(loginFun)
            response.status===403?loginFun():setFun(res.msg)
        else
            setFun(res)
    })
}

const candidateGetNoId=async(path,setFun)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Candidate/"+path,{
        method:"GET",
        credentials:"include"
    })
    await response.json().then((res)=>{
        setFun(res)
    })
}

const candidateForm=async(path,formData,setErr)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Candidate/"+path,{
        method:"POST",
        credentials:'include',
        body:formData
    })
    await response.json().then((res)=>{
        setErr(res.msg)
    })
}

module.exports={
    basicTemplate,
    candidateBasicGet,
    candidateGetNoId,
    candidateForm
}