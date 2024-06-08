import React from 'react'

const CompanyCard = ({img,title,location,num,field}) => {
  return (
    <div className='companyCard'>
        <div className='pic'>
           <img src={img}></img> 
        </div>
       <div className='desc'>
            <p>{field}</p>
            <h1>{title}</h1>
            <div>
                <h2><i class="fa-solid fa-people-group"></i> {num}</h2>
                <h2><i class="fa-solid fa-location-dot"></i> {location}</h2>
            </div>
       </div> 
    </div>
  )
}

export default CompanyCard