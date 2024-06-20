import React, { useEffect, useState } from 'react'
import Input from '../Components/Input'
import { industries } from '../Controllers/utils'
import { candidateForm } from '../Controllers/candidateControllers'
import Waiting from '../Components/Waiting'
import { basicGetNoId, emplForm } from '../Controllers/employerController'

const UpdateEmployer = () => {
  const [inputs,setInputs]=useState(null)
  const [err,setErr]=useState("")
  const handleSubmit=(e)=>{
    e.preventDefault()
    let flag=true
    Object.values(inputs).forEach((x)=>{
      if(x==="")
          flag=false
    })
    if(flag){
      const formData=new FormData()
      for(const [key,value] of Object.entries(inputs)){
        formData.append(key,value)
      }
      emplForm('updateProfile',formData,setErr)
    }
  }
  const handleChange=(e)=>{
    setInputs((i)=>{return {...i,[e.target.name]:e.target.files[0]}})
  }

  const handleRadio=()=>{
    if(document.getElementById("yesRadio").checked)
      setInputs((i)=>{return {...i,["emailReceive"]:true}})
    else
      setInputs((i)=>{return {...i,["emailReceive"]:false}})  
  }
  useEffect(()=>{
    basicGetNoId('getProfile',setInputs)
  },[])
  return (
    <section className='sec update'>
      {inputs!==null?
      <form onSubmit={handleSubmit}>
        <p className='err'>{err}</p>
        <h2>General :</h2>
        <div className='group'>
          <Input
            name="companyName"
            value={inputs.companyName}
            inputs={inputs}
            setInputs={setInputs}
            type="text"
            placeholder="Company Name"
          />
          <Input
            name="numEmployees"
            value={inputs.numEmployees}
            inputs={inputs}
            setInputs={setInputs}
            type="number"
            placeholder="Number of Employees"
          />
          <div className='selIn'>
            <label>Field Of Interest : </label>
            <select name='field' onChange={(e)=>{setInputs((i)=>{return {...i,[e.target.name]:e.target.value}})}}>
                <option value="">Select An Industry</option>
                {
                    industries.map((industrie)=>{
                        if(industrie===inputs.field){
                        return(
                            <option selected value={industrie}>{industrie}</option>
                        )}else{
                        return(
                          <option value={industrie}>{industrie}</option>
                        )}
                    })
                }
            </select>
          </div>
        </div>
        <h2>Contact :</h2>
        <div className='group'>
          <Input
            name="login"
            value={inputs.login}
            inputs={inputs}
            setInputs={setInputs}
            type="text"
            placeholder="Email"
          />
        </div>
        <h2>Attachements :</h2>
        <div className='group top'  style={{width:'50%', marginBottom:'0'}}>
          <label style={{padding:'10px'}}>
            <input type='file' name='picture' accept='images/*' onChange={handleChange}/>
            Pic (image)
          </label>
        </div>
        <h2>Do You Agree to Receive Emails from our part?</h2>
        <div className='group top' style={{width:'50%', marginBottom:'0'}}>
          <label style={{padding:'10px'}}>
            {
              inputs.emailReceive?
              <input 
                  type='radio'
                  name='emailReceive'
                  value="Yes"
                  onChange={handleRadio}
                  id="yesRadio"
                  checked
              />:
              <input 
                type='radio'
                name='emailReceive'
                value="Yes"
                onChange={handleRadio}
                id="yesRadio"
              />
            }
              Yes
          </label>
          <label  style={{padding:'10px'}}>
          {
          !inputs.emailReceive?
              <input 
                  type='radio'
                  name='emailReceive'
                  value="No"
                  onChange={handleRadio}
                  id="noRadio"
                  checked
              />:
              <input 
              type='radio'
              name='emailReceive'
              value="No"
              onChange={handleRadio}
              id="noRadio"
              />
            }
              No
          </label>
        </div>
        <button type='submit'>Update</button>
      </form>:<Waiting/>
      }
    </section>
  )
}

export default UpdateEmployer