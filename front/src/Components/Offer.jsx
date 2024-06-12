import React, { useContext } from 'react'
import userContext from '../Controllers/userContext'

const Offer = ({infos}) => {
    const userCon=useContext(userContext)
    const handleDelete=()=>{

    }
  return (
    <div className='offer'>
        <div className='infos'>
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