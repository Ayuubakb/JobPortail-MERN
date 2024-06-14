
const check=async(setUserType,setId)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Authentification/check",{
        method:"GET",
        credentials:'include'
    })
    await response.json().then((res)=>{
        setUserType(res.type)
        setId(res.id)
    })
}

const login=async(inputs,setError)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Authentification/login",{
        method:"POST",
        credentials:'include',
        body:JSON.stringify(inputs),
        headers:{
            "Content-Type":"application/json"
        }
    })
    await response.json().then((res)=>{
        setError(res.msg)
    })
}

const checkExists=async(inputs,setErr)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Authentification/checkExist",{
        method:"POST",
        credentials:'include',
        body:JSON.stringify(inputs),
        headers:{
            "Content-Type":"application/json"
        }
    })
    await response.json().then((res)=>{
        setErr(res.msg)
    })
}
const signup=async(inputs,setError)=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Authentification/signup",{
        method:"POST",
        credentials:'include',
        body:JSON.stringify(inputs),
        headers:{
            "Content-Type":"application/json"
        }
    })
    await response.json().then((res)=>{
        setError(res.msg)
    })
}

const logout=async()=>{
    const response=await fetch(process.env.REACT_APP_SERVER_URI+"Authentification/logout",{
        method:"DELETE",
        credentials:'include'
    })
    await response.json().then((res)=>{
       if(res.msg===true)
        window.location.href="/"
    })
}
module.exports={
    signup,
    login,
    logout,
    check, 
    checkExists
}