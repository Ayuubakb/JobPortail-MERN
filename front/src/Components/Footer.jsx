import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <div>
            <Link to="/" className='link'><h1>JobPortail <i class="fa-solid fa-magnifying-glass"></i></h1></Link>
        </div>
        <div>
            <ul>
                <li><Link to="/offers" className='link'>Offers</Link></li>
                <li><Link to="/Companies" className='link'>Companies</Link></li>
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