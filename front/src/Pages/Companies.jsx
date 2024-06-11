import React, { useState,useEffect } from 'react'
import CompanyCard from '../Components/CompanyCard'
import SearchBar from '../Components/SearchBar'

const Companies = () => {
  const [companies,setCompanies]=useState({num:0,companies:[]})
  return (
    <section className='sec companies'>
      <SearchBar page="companies" setFunction={setCompanies}/>
      <div className='companiesHolder'>
        {
          companies.companies.length!==0?
          companies.companies.map((company)=>{
            return(
              <CompanyCard
                img={`${process.env.REACT_APP_SERVER_URI}Uploads/${company.picture}`}
                title={company.companyName}
                num={`+${company.numEmployees}`}
                location={company.location}
                field={company.field}
              />
            )
          }):<h1 className='noData'>No Companies At The Moment</h1>
        }
      </div>
    </section>
  )
}

export default Companies