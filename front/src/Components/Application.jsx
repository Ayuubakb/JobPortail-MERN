import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Application = ({IdOffer,field,companyName,title,appDate,status,interviewDate}) => {
    const [style,setStyle]=useState({})
    const navigate=useNavigate()
    useEffect(()=>{
        if(status===1)
            setStyle({color:"green"})
        else if(status===0)
            setStyle({color:"red"})
        else if(status===2)
            setStyle({color:"gray"})
    },[])
    let tmp=new Date(appDate)
    appDate=`${tmp.getDate()}/${tmp.getMonth()+1}/${tmp.getFullYear()}`
  return (
    <div className='oneApp' onClick={()=>{navigate('/offers/'+IdOffer)}}>
        <div className='infos'>
            <div>
                <p>{field}</p>
                <h2>{title}</h2>
                <h3>{companyName}</h3>
            </div>
            <div className='appDate'>
                {
                    status===1?<p style={style}>Interview on <br></br> {interviewDate}</p>:<p style={style}>Applied on<br></br> {appDate}</p>
                }
            </div>
        </div>
    </div>
  )
}

export default Application