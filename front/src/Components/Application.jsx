import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../Controllers/userContext'
import Input from './Input'
import { basicGet, basicTemplate } from '../Controllers/employerController'

const Application = ({idUser,IdOffer,idDemand,field,companyName,title,appDate,status,interviewDate,firstName,lastName}) => {
    const [style,setStyle]=useState({})
    const [date,setdate]=useState("")
    const [remove,setRemove]=useState(false)
    const useCon=useContext(userContext)
    const navigate=useNavigate()
    const handleDown=()=>{
        document.getElementById("slide"+idDemand).style.top='0px'
    }
    const handleUp=()=>{
        document.getElementById("slide"+idDemand).style.top='-100%'
    }
    const handleAccept=()=>{
        if(date.interviewDate && new Date(date.interviewDate) >= new Date()) 
            basicTemplate("acceptOffer",{interviewDate:date.interviewDate,idDemand:idDemand},setRemove)
    }
    const handleRefuse=()=>{
        basicGet("refuseOffer",idDemand,setRemove)
    }
    useEffect(()=>{
        if(status===1)
            setStyle({color:"green"})
        else if(status===0)
            setStyle({color:"red"})
        else if(status===2)
            setStyle({color:"gray"})
    })
    let tmp=new Date(appDate)
    appDate=`${tmp.getDate()}/${tmp.getMonth()+1}/${tmp.getFullYear()}`
     tmp=new Date(interviewDate)
    interviewDate=`${tmp.getDate()}/${tmp.getMonth()+1}/${tmp.getFullYear()}`
  return (
    <div className='oneApp' style={{display:remove?"none":"block"}}>
        <div className='infos' >
            <div>
                <p>{field}</p>
                <h2 onClick={()=>{navigate('/offers/'+IdOffer)}}>{title}</h2>
                {companyName?<h3><i class="fa-solid fa-building"></i> {companyName}</h3>:<h3><Link className='link' to={`/candidate?id=${idUser}`} style={{color:"gray"}}><i class="fa-solid fa-user"></i>{firstName} {lastName}</Link></h3>}
            </div>
            <div className='appDate'>
                {
                    status===1?<p style={style}>Interview on <br></br> {interviewDate}</p>:<p style={style}>Applied on<br></br> {appDate}</p>
                }
            </div>
        </div>
        {
            useCon.userType==="employer" && status===2?
            <>
            <div className='buttons'>
                <button style={{backgroundColor:'lightGreen'}} onClick={handleDown}>Set Interview</button>
                <button onClick={handleRefuse}>Refuse</button>
            </div>
            <div className='slideInterview' id={"slide"+idDemand}>
                <button onClick={handleUp} style={{backgroundColor:'rgb(80,80,80)'}}><i class="fa-solid fa-x"></i></button>
                <Input
                    name="interviewDate"
                    inputs={date}
                    setInputs={setdate}
                    type="date"
                    placeholder="Interview Date"
                />
                <button onClick={handleAccept} style={{backgroundColor:'#DC5F00'}}><i class="fa-solid fa-check"></i></button>
            </div>
            </>:null
        }
    </div>
  )
}

export default Application