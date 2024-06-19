import React, { useContext, useEffect, useState } from 'react'
import Stat from '../Components/Stat'
import { candidateBasicGet, candidateGetNoId } from '../Controllers/candidateControllers'
import userContext from '../Controllers/userContext'
import { Link } from 'react-router-dom'

const CandidateDash = () => {
  const userCon=useContext(userContext)
  const paths=new URL(document.location).searchParams
  const id=paths.get('id');
  const [infos,setInfos]=useState({lastName:"Akoubri",firstName:"Ayoub",login:"ayoub@gmail.com",number:"0700821400",picture:"defaultUser.jpg",cv:"",emailReceive:false,field:"Technology",interviewCount:5,aplicationCount:12,refusedCount:7})
  useEffect(()=>{
    id?candidateBasicGet("getProfile",id,setInfos):candidateGetNoId("getProfile",setInfos)
  },[])
  return (
    <section className='sec canDash'>
    <div className='profile'>
      <div className='top'>
        <div>
          <img src={`${process.env.REACT_APP_SERVER_URI}Uploads/${infos.picture}`}/>
        </div> 
        <div>
          <h1>{`${infos.firstName} ${infos.lastName}`}</h1>
          <p>{infos.field}</p>
        </div>
      </div>
      <div className='bottom'>
        <p><span>E-mail : </span>{infos.login}</p>
        <p><span>Number : </span>{infos.number}</p>
        <p><span>Receive Emails ? </span>{infos.emailReceive?"Yes":"No"}</p>
        {userCon.userType=="candidate" && !id?
        <div className='edit'>
          <Link to="update" className='link'><i class="fa-solid fa-pen-to-square"></i></Link>
        </div>:null}
      </div>
      <div className='cvHolder'>
        <img src={`${process.env.REACT_APP_SERVER_URI}Uploads/${infos.cv}`}/>
      </div>
    </div>
    {
      userCon.userType=="candidate" && !id?
      <div className='stats'>
        <Stat
          num={infos.interviewCount}
          title="Secured Interviews"
          color="green"
        />
        <Stat
          num={infos.aplicationCount}
          title="Applications Sent"
          color="orange"
        />
        <Stat
          num={infos.refusedCount}
          title="Refused Applications"
          color="red"
        />
      </div>:null
    }
    </section>
  )
}

export default CandidateDash