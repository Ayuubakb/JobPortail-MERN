import React, { useContext, useEffect, useState } from 'react'
import Input from './Input'
import { login } from '../Controllers/authControllers'
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [inputs,setInputs]=useState({login:"",password:""})
  const [err,setErr]=useState("");
  const handleSubmit=(e)=>{
    e.preventDefault()
    login(inputs,setErr)
  }
  const handleClose=()=>{
    document.getElementById('login').animate(animation,timer)
    setTimeout(()=>{
        document.getElementById('login').style.width="0"  
        document.getElementById('login').style.top="-100%"  
    },280)
  }
  const animation=[
    {top:"0"},
    {top:'100%'}
  ]
  const timer={
    iterations:1,
    duration:300
  }
  useEffect(()=>{
    const path=new URL(document.location).pathname
    if(err==="employer"){
      handleClose();
      window.location.href="/employer"
    }else if(err==="candidate"){
      handleClose();
      if(path.split("/")[1]==="offers")
        window.location.href=process.env.REACT_APP_CLIENT_URI+"offers/"+path.split("/")[2]
      else
        window.location.href="/candidate"
    }
  },[err])
  return (
    <section className='logSec' id="login">
      <div className='login'>
          <div className='closelog' id='closeLog' onClick={handleClose}><i class="fa-solid fa-xmark fa-2xl"></i></div>
          <h1><h1>JobPortail <i class="fa-solid fa-magnifying-glass"></i></h1></h1>
          <p className='err'>{err}</p>
          <form onSubmit={handleSubmit}>
            <Input
              name="login"
              inputs={inputs}
              setInputs={setInputs}
              type="text"
              placeholder="Email"
            />
            <Input
              name="password"
              inputs={inputs}
              setInputs={setInputs}
              type="password"
              placeholder="Password"
            />
            <p>Don't Have An Account?<span> SignUp</span></p>
            <button type='submit'>Login</button>
          </form>
      </div>
    </section>
  )
}

export default Login