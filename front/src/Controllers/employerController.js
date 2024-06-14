const basicTemplate=async(path,object,setFun)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Employer/"+path,{
        method:"POST",
        credentials:'include',
        body:JSON.stringify(object),
        headers:{
            "Content-Type":"application/json"
        }
    })
    await response.json().then((res)=>{
        setFun(res.msg)
    })
}
const basicDelete=async(path,id,setFun)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Employer/"+path+"/"+id,{
        method:"DELETE",
        credentials:'include'
    })
    await response.json().then((res)=>{
        setFun(res.msg)
    })
}
const basicGet=async(path,id,setFun)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Employer/"+path+"/"+id,{
        method:"GET",
        credentials:'include'
    })
    await response.json().then((res)=>{
        setFun(res)
    })
}

module.exports={
    basicTemplate,
    basicDelete,
    basicGet
}