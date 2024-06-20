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
const basicGetNoId=async(path,setFun)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Employer/"+path,{
        method:"GET",
        credentials:'include'
    })
    await response.json().then((res)=>{
        setFun(res)
    })
}
const emplForm=async(path,formData,setErr)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Employer/"+path,{
        method:"POST",
        body:formData,
        credentials:'include'
    })
    await response.json().then((res)=>{
        setErr(res.msg)
    })
}


module.exports={
    basicTemplate,
    basicDelete,
    basicGet,
    basicGetNoId,
    emplForm
}