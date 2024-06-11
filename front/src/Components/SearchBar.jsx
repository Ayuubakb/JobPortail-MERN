import React, { useEffect, useState } from 'react'
import { industries, position,time,presence } from '../Controllers/utils'
import { basicTemplate } from '../Controllers/candidateControllers'

const SearchBar = ({page,setFunction}) => {
    const [filters,setFilters]=useState({position:"",time:"",presence:"",industries:""})
    const handleChange=(e)=>{
        setFilters((f)=>{return {...f,[e.target.name]:e.target.value}})
    }
    const handleClick=()=>{
        basicTemplate(page,filters,setFunction)
    }
    useEffect(()=>{
        basicTemplate(page,filters,setFunction)
    },[])
  return (
    <div className='searchBar'>
        <div className='filter'>
            <i class="fa-solid fa-filter"></i>
        </div>
        <div>
            <select onChange={handleChange} name='industries'>
                <option value="">-- Select Industry --</option>
            {
                industries.map((variable)=>{
                    return(
                        <option value={variable}>{variable}</option>
                    )
                })
            }
            </select>
        </div>
        {
            page==="offers"?
            <>
            <div>
                <select onChange={handleChange} name='time'>
                    <option value="">-- Full or Part Time --</option>
                {
                    time.map((variable)=>{
                        return(
                            <option value={variable}>{variable}</option>
                        )
                    })
                }
                </select>
            </div>
            <div>
                <select onChange={handleChange} name='position'>
                    <option value="">-- Offer Type --</option>
                {
                    position.map((variable)=>{
                        return(
                            <option value={variable}>{variable}</option>
                        )
                    })
                }
                </select>
            </div>
            <div>
                <select onChange={handleChange} name='presence'>
                    <option value="">-- Presence --</option>
                {
                    presence.map((variable)=>{
                        return(
                            <option value={variable}>{variable}</option>
                        )
                    })
                }
                </select>
            </div>
            </>:null
        }
        <div className='btn'>
            <button onClick={handleClick}><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
    </div>
  )
}

export default SearchBar