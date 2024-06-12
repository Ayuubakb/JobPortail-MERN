import React, { useContext, useEffect, useState } from 'react'
import userContext from '../Controllers/userContext'
import { useNavigate } from 'react-router-dom'
import { basicDelete } from '../Controllers/employerController'

const Offer = ({infos}) => {
    const navigate = useNavigate()
    const userCon=useContext(userContext)
    const [deleted,setDeleted]=useState(false)
    const handleDelete=()=>{
        basicDelete("deleteOffer",infos.id,setDeleted)
    }
    const handleClick=()=>{
        navigate("/offers/"+infos.id)
    }
    useEffect(()=>{
        if(deleted) 
            document.getElementById(`offer${infos.id}`).style.display="none"
    },[deleted])
  return (
    <div className='offer' id={`offer${infos.id}`}>
        <div className='infos' onClick={handleClick}>
            <p>{infos.field}</p>
            <h1>{infos.title}</h1>
            <div className='tags'>
                <p>{infos.presence}</p>
                <p style={{backgroundColor:'darkgray'}}>{infos.time}</p>
                <p style={{backgroundColor:'#686D76'}}>{infos.position}</p>
            </div>
        </div>
        <div className='numAndDate'>
            <div>
                <p>Posted : {infos.postDate}</p>
            </div>
            <div>
                {
                    userCon.userType==="employer"?
                    <p>Applications: {infos.num}</p>
                    :null
                }
            </div>
        </div>
        {
            userCon.userType==="employer"?
            <div className='del' onClick={handleDelete}>
                <i class="fa-solid fa-trash"></i>
            </div>:null
        }
    </div>
  )
}

export default Offer