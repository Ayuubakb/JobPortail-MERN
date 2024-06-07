import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
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
               <button>Login</button>
               <button><Link to="/signup" className='link'>Signup</Link></button>
            </div>
        </div>
    </nav>
  )
}

export default Nav