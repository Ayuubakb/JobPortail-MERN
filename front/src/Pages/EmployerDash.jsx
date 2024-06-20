import React, { useContext, useEffect, useState } from 'react'
import Stat from '../Components/Stat'
import userContext from '../Controllers/userContext'
import { Link } from 'react-router-dom'
import Offer from '../Components/Offer'
import { basicGet, basicGetNoId } from '../Controllers/employerController'

const EmployerDash = () => {
  const userCon=useContext(userContext)
  const paths=new URL(document.location).searchParams
  const id=paths.get('id');
  const [infos,setInfos]=useState({offers:[]})
  useEffect(()=>{
    id?basicGet("getProfile",id,setInfos):basicGetNoId("getProfile",setInfos)
  },[])
  return (
    <section className='sec canDash'>
    <div className='profile'>
      <div className='top'>
        <div>
          <img src={`${process.env.REACT_APP_SERVER_URI}Uploads/${infos.picture}`}/>
        </div> 
        <div>
          <h1>{infos.companyName}</h1>
          <p>{infos.field}</p>
        </div>
        <div>
          <h3><i class="fa-solid fa-people-group"></i> {infos.numEmployees}</h3>
        </div>
      </div>
      <div className='bottom'>
        <p><span>E-mail : </span>{infos.login}</p>
        <p><span>Location : </span>{infos.location}</p>
        <p><span>Receive Emails ? </span>{infos.emailReceive?"Yes":"No"}</p>
        {userCon.userType=="employer" && !id?
        <div className='edit'>
          <Link to="update" className='link'><i class="fa-solid fa-pen-to-square"></i></Link>
        </div>:null}
      </div>
      {
      userCon.userType=="employer" && !id?
      <div className='stats'>
        <Stat
          num={infos.activeCount}
          title="Active Offers"
          color="green"
        />
        <Stat
          num={infos.totalCount}
          title="Total Offers"
          color="orange"
        />
      </div>:null
      }
    </div>
    <div className='cvHolder off'>
      <h1>Last 5 Offers :</h1>
      {
        infos.offers.length!=0?
        infos.offers.map((o)=>{
          let postDate=new Date(o.postDate)
          postDate=`${postDate.getDate()}/${postDate.getMonth() + 1}/${postDate.getFullYear()}`
          return(
            <Offer
              infos={{
                id:o.id,
                field:o.field,
                title:o.title,
                presence:o.presence,
                time:o.time,
                position:o.position,
                postDate:postDate,
                num:o.numDemands
              }}
            />
          )
        }):<h2 className='noData'>You Haven't Posted Yet</h2>
      }
      </div>
    </section>
  )
}

export default EmployerDash