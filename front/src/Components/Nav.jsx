import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    const handleLogin=()=>{
        document.getElementById('login').animate(animation,timer)
        setTimeout(()=>{
            document.getElementById('login').style.width="100vw"  
            document.getElementById('login').style.top="0"  
        },280)
    }
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
                    <li><Link to="/offers" className='link'>Offers</Link></li>
                    <li><Link to="/companies" className='link'>Companies</Link></li>
                </ul>
            </div>
        </div>
        <div className='buttons'>
            <div>
               <button onClick={handleLogin}>Login</button>
               <button><Link to="/signup" className='link'>Signup</Link></button>
            </div>
        </div>
    </nav>
  )
}

export default Nav