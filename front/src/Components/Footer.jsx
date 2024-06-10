import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../Controllers/userContext'

const Footer = () => {
    const {userType}=useContext(userContext)
  return (
    <footer>
        <div>
            <Link to="/" className='link'><h1>JobPortail <i class="fa-solid fa-magnifying-glass"></i></h1></Link>
        </div>
        <div>
            <ul>
                {
                    userType==="normal"?
                    <>
                        <li><Link to="/offers" className='link'>Offers</Link></li>
                        <li><Link to="/companies" className='link'>Companies</Link></li>
                    </>:(userType==="employer"?
                        <>
                            <li><Link to="/offers" className='link'>My Offers</Link></li>
                            <li><Link to="/employer/add" className='link'>Add Offer</Link></li>
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
        <div>
            <h2>Bridging Talent with Opportunity</h2>
            <h3><i class="fa-solid fa-phone"></i> +212 700821400</h3>
            <h3><i class="fa-solid fa-envelope"></i> ayoubakoubri@gmail.com</h3>
            <h3><i class="fa-solid fa-location-dot"></i> Marrakech, Morocco</h3>
        </div>
    </footer>
  )
}

export default Footer