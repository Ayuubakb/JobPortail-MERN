import React, { useState } from 'react'
import Input from './Input'

const Login = () => {
  const [inputs,setInputs]=useState({login:"",password:""})
  const handleSubmit=(e)=>{
    e.preventDefault()
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
  return (
    <section className='logSec' id="login">
      <div className='login'>
          <div className='closelog' id='closeLog' onClick={handleClose}><i class="fa-solid fa-xmark fa-2xl"></i></div>
          <h1><h1>JobPortail <i class="fa-solid fa-magnifying-glass"></i></h1></h1>
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