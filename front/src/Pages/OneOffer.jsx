import React,{useContext, useEffect, useState} from 'react'
import userContext from '../Controllers/userContext'
import Waiting from '../Components/Waiting'
import { basicDelete, basicGet } from '../Controllers/employerController'
import { useNavigate } from 'react-router-dom'

const OneOffer = () => {
  const navigate=useNavigate()
  const params=new URL(document.location).pathname
  const userCon=useContext(userContext)
  const [deleted,setDeleted]=useState(false)
  const [infos,setInfos]=useState(null)
  const handleDelete=()=>{
    basicDelete("deleteOffer",params.split('/')[2],setDeleted)
  }
  const handleApply=()=>{

  }
  useEffect(()=>{
    basicGet("getOffer",params.split('/')[2],setInfos)
  },[])
  useEffect(()=>{
    if(deleted)
      navigate("/offers")
  },[deleted])
 
  return (
    <section className='sec'>
      <div className='oneOffer'>
        {
          infos!==null && infos.title?
          <>
          <div className="company">
            <div className='img'>
              <img src={`${process.env.REACT_APP_SERVER_URI}Uploads/${infos.picture}`}></img>
            </div>
            <div className='compInf'>
              <div>
                <h3>{infos.companyName}</h3>
                <p>Posted : {infos.postDate}</p>
              </div>
              <div>
                {
                  userCon.userType==="employer"?
                  <>
                  <h3>{infos.numDemands}</h3>
                  <p>Applications</p></>:null
                }
              </div>
            </div>
          </div>
          <div className='offerDetail'>
            <h1>{infos.title}</h1>
            <div className='holder'>
              <div>
                <p><span>Field : </span>{infos.field}</p>
                <p><span>Presence : </span>{infos.presence}</p>
              </div>
              <div>
                <p><span>Position : </span>{infos.position}</p>
                <p><span>Full-time / Part-time : </span>{infos.field}</p>
              </div>
            </div>
          </div>
          <div className='description'>
              <h2>Job Description </h2>
              <p>{infos.description}</p>
          </div>
          <div className='foot'>
            <div>
              <p><span>Offer Ends on </span>{infos.expireDate}</p>
            </div>
            <div>
              {
                userCon.userType==="employer" && userCon.id===infos.idCom?
                <button onClick={handleDelete}>Delete</button>
                :<button onClick={handleApply}>Apply</button>
              }
            </div>
          </div>
          </>:(infos===null?<Waiting/>:infos.msg
          )
        }
      </div>
    </section>
  )
}

export default OneOffer