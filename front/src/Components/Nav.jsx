import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate, redirect } from 'react-router-dom'
import userContext from '../Controllers/userContext'
import { logout } from '../Controllers/authControllers'

const Nav = () => {
    const navigate=useNavigate()
    const {userType,setUserType}=useContext(userContext)
    const [err,setErr]=useState("")
    const handleLogin=()=>{
        document.getElementById('login').animate(animation,timer)
        setTimeout(()=>{
            document.getElementById('login').style.width="100vw"  
            document.getElementById('login').style.top="0"  
        },280)
    }
    const handleLogout=()=>{
        logout(setErr)
    }
    useEffect(()=>{
        if(err===true){
            setUserType("normal")
            navigate("/")
        }
    },[err])
    const animation=[
        {width:"100vw"},
        {width:"100vw",top:'0'}
    ]
    const timer={
        iterations:1,
        duration:300
    }
  return (
    <nav>
        <div className='first'>
            <div className='logo'>
                <Link to="/" className='link'><h1>JobPortail <i class="fa-solid fa-magnifying-glass"></i></h1></Link>
            </div>
            <div className='links'>
                <ul>
                    {
                        userType==="normal"?
                        <>
                            <li><Link to="/offers" className='link'>Offers</Link></li>
                            <li><Link to="/companies" className='link'>Companies</Link></li>
                        </>:(userType==="employer"?
                            <>
                                <li><Link to="/offers" className='link'>My Offers</Link></li>
                                <li><Link to="/employer/demands" className='link'>Applications</Link></li>
                            </>:<>
                                    <li><Link to="/offers" className='link'>Offers</Link></li>
                                    <li><Link to="/companies" className='link'>Companies</Link></li>
                                    <li><Link to="/candidate/demands" className='link'>My Applications</Link></li>
                                </>
                        )
                    }
                </ul>
            </div>
        </div>
        <div className='buttons'>
            <div>
                {
                    userType==="normal"?
                    <>
                        <button onClick={handleLogin}>Login</button>
                        <Link to="/signup" className='link'><button>Signup</button></Link>
                    </>:(userType==="employer"?
                        <>
                            <Link to="/employer" className='link'><button><i class="fa-regular fa-user"></i></button></Link>
                            <button onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i></button>
                        </>:<>
                                <Link to="/candidate" className='link'><button><i class="fa-regular fa-user"></i></button></Link>
                                <button onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i></button>
                            </>
                    )
                    
                }
            </div>
        </div>
    </nav>
  )
}

export default Nav