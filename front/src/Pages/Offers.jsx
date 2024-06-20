import React, { useState,useEffect, useContext } from 'react'
import SearchBar from '../Components/SearchBar'
import Offer from '../Components/Offer'
import { industries, position, presence, time } from '../Controllers/utils'
import userContext from '../Controllers/userContext'
import Input from '../Components/Input'
import { basicTemplate } from '../Controllers/employerController'

const Offers = () => {
  const userCon=useContext(userContext)
  const [offers,setOffers]=useState({num:0,offers:[]});
  const [inputs,setInputs]=useState({title:"",description:"",expireDate:"",presence:"",time:"",position:"",field:""});
  const [isOpen,setIsOpen]=useState(false);
  const [err,setErr]=useState("")
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(inputs.title==="" || inputs.description==="" || inputs.expireDate==="" || inputs.presence==="" || inputs.time==="" || inputs.field==="" || inputs.position==="")
        setErr("Please Enter All Fields")
    else
      basicTemplate('addOffer',inputs,setErr)
  }
  const handleChange=(e)=>{
    setInputs((i)=>{
        return {...i,[e.target.name]:e.target.value}
    })
  }
  const handleSwitch=()=>{
    setIsOpen((o)=>{return !o})
  }
  useEffect(()=>{
    if(userCon.userType==="employer")
    if(!isOpen){
      document.getElementById("all").style.flex="0 0 calc(100% - 100px)"
      document.getElementById("addOff").querySelector(".formHolder").style.display='none';
      document.getElementById("addOff").style.flex="0 0 100px"
    }else{
      document.getElementById("all").style.flex="0 0 60%"
      document.getElementById("addOff").querySelector(".formHolder").style.display='block';
      document.getElementById("addOff").style.flex="0 0 40%"
    }
  },[isOpen])
  return (
    <section className='sec offers'>
      <div className='all' id="all">
        <SearchBar page="offers" setFunction={setOffers}/>
        <div className='resNum'>
          <p>{userCon.userType==="employer"?"Number Your Active Offers":"Results"} : {offers.num}</p>
        </div>
        <div className='offerContainer'>
          {
            offers.num!==0?
            offers.offers.map((offer)=>{
              let date=new Date(offer.postDate)
              let dateToShow=`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
              return(
                <Offer
                  infos={{
                    id:offer.id,
                    field:offer.field,
                    title:offer.title,
                    presence:offer.presence,
                    time:offer.time,
                    position:offer.position,
                    postDate:dateToShow,
                    num:offer.num
                  }}
                />
              )
            })
            :<h1 className='noData'>No Offers For The Moment</h1>
          }
        </div>
      </div>
      {
        userCon.userType==="employer"?
        <div className='add' id="addOff">
            <div className='head' onClick={handleSwitch}>
              {
                !isOpen?<i class="fa-solid fa-plus"></i>:<i style={{transform:"rotate(45deg)"}} class="fa-solid fa-plus"></i>
              }
            </div>
            <div className='formHolder'>
              <p className='err' style={{marginTop:'0'}}>{err}</p>
              <form onSubmit={handleSubmit}>
                <div className='part'>
                  <Input
                    name="title"
                    inputs={inputs}
                    setInputs={setInputs}
                    type="text"
                    placeholder="Title"
                  />
                  <div>
                    <label>Field : </label>
                    <select name="field" onChange={handleChange}>
                      <option value="">--Industry--</option>
                      {
                        industries.map((industry)=>{
                          return(
                            <option value={industry}>{industry}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div>
                    <label>Description : </label>
                    <textarea name='description' onChange={handleChange}></textarea>
                  </div>
                </div>
                <div className='selects part'>
                  <div>
                    <label>Position : </label>
                    <select name="position" onChange={handleChange}>
                      <option value="">--Position--</option>
                      {
                          position.map((industry)=>{
                          return(
                            <option value={industry}>{industry}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div>
                    <label>Time Partition : </label>
                    <select name="time" onChange={handleChange}>
                      <option value="">--Partition--</option>
                      {
                        time.map((industry)=>{
                          return(
                            <option value={industry}>{industry}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div>
                    <label>Presence : </label>
                    <select name="presence" onChange={handleChange}>
                      <option value="">--Presence--</option>
                      {
                        presence.map((industry)=>{
                          return(
                            <option value={industry}>{industry}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className='part'>
                  <div>
                    <Input
                      name="expireDate"
                      inputs={inputs}
                      setInputs={setInputs}
                      type="date"
                      placeholder="DeadLine"
                    />
                  </div>
                </div>
                <button type='submit'>Post Offer</button>
              </form>
            </div>
        </div>:null
      }
    </section>
  )
}

export default Offers