import React , {useEffect, useState} from 'react'
import { basicTemplate } from '../Controllers/employerController'

const SideBar = ({demands,setDemands}) => {
  const [filter,setFilter]=useState({status:2,offer:''})
  const handleChange=(e)=>{
    setFilter((f)=>{return {...f,[e.target.name]:e.target.value}})
  }
  const handleSearch=()=>{
    basicTemplate("demands",filter,setDemands)
  }
  useEffect(()=>{
    basicTemplate("demands",filter,setDemands)
  },[])
  return (
    <div className="sideBar">
      <div>
        <label>Status : </label>
        <select onChange={handleChange} name="status">
          <option value={2}>Pending</option>
          <option value={1}>Accepted</option>
          <option value={0}>Refused</option>
        </select>
      </div>
      <div>
        <label>Offer : </label>
        <select onChange={handleChange} name="offer">
          <option value="">All</option>
          {
            demands.distanct.map((d)=>{
              return(
                <option value={d.id}>{d.title}</option>
              )
            })
          }
        </select>
      </div>
      <div>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  )
}

export default SideBar