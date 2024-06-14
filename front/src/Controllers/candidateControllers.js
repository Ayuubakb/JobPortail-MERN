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

module.exports={
    basicTemplate
}