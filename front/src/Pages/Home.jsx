import React from 'react'
import { Link } from 'react-router-dom'
import CompanyCard from '../Components/CompanyCard'
import FeaturesCard from '../Components/FeaturesCard'

const Home = () => {
  return (
    <section className='home'>
        <div className='banner1'>
            <div className='head'>
                <h1>JobPortail <i class="fa-solid fa-magnifying-glass"></i> :  <span>Bridging Talent with Opportunity!</span></h1>
            </div>
            <div className='all'>
                <div className='textContainer'>
                    <div>
                        <p>JobPortail is a cutting-edge job seeking platform designed to connect talented professionals with their ideal employers seamlessly. Whether you're a fresh graduate eager to kickstart your career, a seasoned professional looking for new challenges,
                            or a company seeking the perfect fit for your team, JobPortail is the one-stop solution for all your employment needs.</p>
                    </div>
                    <div>
                        <button><Link to="/offers" className='link'>View Offers</Link></button>
                    </div>
                </div>
                <div className='logoContainer'>
                    <div>
                        <img src='./assets/bann1.jpg'></img>
                    </div>
                </div>  
            </div>
        </div>
        <div className='banner3'>
            <div className='statsContainer'>
                <div className='stat'>
                    <h1><i class="fa-solid fa-people-group"></i></h1>
                    <h2>+ 250 Job Seeker</h2>
                </div>
                <div className='stat'>
                    <h1><i class="fa-solid fa-city"></i></h1>
                    <h2>+ 150 Companies</h2>
                </div>
                <div className='stat'>
                    <h1><i class="fa-solid fa-scroll"></i></h1>
                    <h2>+ 250 Offers</h2>
                </div>
            </div>
        </div>
        <div className='banner2'>
            <h3>Our Best Partners : </h3>
            <div className='cardContainer'>
                <CompanyCard
                    img="assets/cap.png"
                    title="Capgemini"
                    num="+1000"
                    location="Casablanca"
                    field="IT"
                />
                <CompanyCard
                    img="assets/ibm.png"
                    title="IBM"
                    num="+1000"
                    location="Casablanca"
                    field="IT"
                />
                <CompanyCard
                    img="assets/ora.png"
                    title="Capgemini"
                    num="+1000"
                    location="Rabate"
                    field="IT"
                />
                <CompanyCard
                    img="assets/alten.png"
                    title="Alten"
                    num="+1000"
                    location="Tetouan"
                    field="Consulting"
                />
                <CompanyCard
                    img="assets/renault.png"
                    title="Renault"
                    num="+1000"
                    location="Tanger"
                    field="Automobile"
                />
            </div>
        </div>
        <div className='banner4'>
            <h2>What Do We Offer ?</h2>
            <div className='features'>
                <FeaturesCard
                    title="Vast Job Listings"
                    desc="Explore a wide array of job postings across various industries"
                />
                <FeaturesCard
                    title="Intuitive Search and Filter Options"
                    desc="Explore a wide array of job postings across various industries"
                />
                <FeaturesCard
                    title="User-Friendly Experience"
                    desc="Explore a wide array of job postings across various industries"
                />
            </div>
        </div>
    </section>
  )
}

export default Home